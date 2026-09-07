import { useCallback, useEffect, useMemo, useState } from "react";

import { ALL_PLATFORM_IDS, EMPTY_FILTERS, SearchFilters, SearchJob } from "../search.constants";

import { JobPlatformId, normalizePlatformId, normalizedJobToJob } from "~/src/shared/domain/job";
import { useSearchJobs } from "~/src/shared/queries/useSearchJobs";
import { NormalizedJobDTO, SearchProgress } from "~/src/shared/queries/useSearchJobs/types";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { showToast } from "~/src/shared/utils/toast";

export type SearchPhase = "idle" | "searching" | "done";

function toSearchJob(dto: NormalizedJobDTO): SearchJob {
  return {
    ...normalizedJobToJob(dto),
    state: (dto.location?.state ?? "").toUpperCase(),
  };
}

/** Platforms that have already answered, split by outcome. */
function splitProgress(progress: SearchProgress | undefined) {
  const done: JobPlatformId[] = [];
  const errored: JobPlatformId[] = [];

  for (const [platform, outcome] of Object.entries(progress?.platforms ?? {})) {
    (outcome === "error" ? errored : done).push(normalizePlatformId(platform));
  }

  return { done, errored };
}

// Backend-style value normalization: NFD, strip diacritics, lowercase, collapse
// whitespace. Mirrors `normalizeFilterValue` in the backend's `jobFilters.ts`.
const DIACRITICS = /[̀-ͯ]/g;
function norm(value: string | undefined): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Placeholder strings the scrapers emit when a field wasn't found — treated as
// "no data", so a job carrying one is never excluded by that filter.
const UNKNOWN_VALUES = new Set(["", "nao informado", "a combinar", "nao especificado"]);
function hasValue(raw: string | undefined): boolean {
  return !UNKNOWN_VALUES.has(norm(raw));
}

// The backend performs the keyword search and the location (`states`) filter —
// the latter over the full result set, before pagination. This applies the
// remaining structured filters (work model, contract, salary, platform) against
// the returned jobs.
//
// Chip labels ("CLT", "Remoto") are matched as diacritic-insensitive substrings,
// like the backend's `filterJobs`, so "CLT (Efetivo)" and "100% Remoto" still
// match. A job is only dropped when it *has* the field and it doesn't match —
// missing / "Não informado" data never excludes a job, so turning a filter on
// can't wipe the whole list.
function matchesJob(job: SearchJob, filters: SearchFilters): boolean {
  if (filters.workModels.length && hasValue(job.workModel)) {
    const model = norm(job.workModel);
    if (!filters.workModels.some((selected) => model.includes(norm(selected)))) return false;
  }

  if (filters.contracts.length && hasValue(job.contractType)) {
    const contract = norm(job.contractType);
    if (!filters.contracts.some((selected) => contract.includes(norm(selected)))) return false;
  }

  const platformsNarrowed =
    filters.platforms.length > 0 && filters.platforms.length < ALL_PLATFORM_IDS.length;
  if (platformsNarrowed && !filters.platforms.includes(job.platformId)) return false;

  if (filters.salaryMin > 0) {
    // Match the backend: judge by the top of the range, and keep jobs with no
    // parsed salary rather than dropping them.
    const ceiling = job.salaryMax ?? job.salaryMin;
    if (ceiling !== undefined && ceiling < filters.salaryMin) return false;
  }

  return true;
}

/**
 * Owns the search term and filters. Results come from the async job-search
 * endpoint (`useSearchJobs`): a cache hit resolves immediately, otherwise it
 * polls the worker and reports real per-platform progress. The platform filter
 * scopes which sources the backend scrapes and the location (`states`) filter
 * runs server-side over the full result set; the remaining filters (work model,
 * contract, salary) are applied client-side against the loaded pages.
 */
export function useJobSearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);

  const platformScope = useMemo(
    () => (filters.platforms.length ? filters.platforms : ALL_PLATFORM_IDS),
    [filters.platforms]
  );

  const skills = useUserDetails((store) => store.state.skills);

  const {
    jobs: rawJobs,
    total,
    pending,
    failed,
    progress,
    hasMore,
    loadingMore,
    loadMore,
  } = useSearchJobs(submitted, platformScope, skills, filters.states);

  const { done: completedPlatforms, errored: erroredPlatforms } = useMemo(
    () => splitProgress(progress),
    [progress]
  );

  useEffect(() => {
    if (failed) showToast({ type: "error", text: "Não foi possível buscar vagas agora" });
  }, [failed]);

  const runSearch = useCallback((term: string) => {
    setSubmitted(term.trim());
  }, []);

  const jobs = useMemo(() => rawJobs.map(toSearchJob), [rawJobs]);

  const results = useMemo(() => jobs.filter((job) => matchesJob(job, filters)), [jobs, filters]);

  // `states` is applied server-side and already reflected in `total`; the rest
  // are client-side, so once any of them is on we can only count what's loaded.
  const hasClientFilters =
    filters.workModels.length > 0 ||
    filters.contracts.length > 0 ||
    filters.salaryMin > 0 ||
    (filters.platforms.length > 0 && filters.platforms.length < ALL_PLATFORM_IDS.length);

  const phase: SearchPhase = !submitted ? "idle" : pending ? "searching" : "done";

  return {
    query,
    setQuery,
    submitted,
    filters,
    setFilters,
    phase,
    completedPlatforms,
    erroredPlatforms,
    results,
    // Total matches for the search; while client-side filters narrow the list we
    // can only report what is visible.
    resultCount: hasClientFilters ? results.length : total || results.length,
    hasMore,
    loadingMore,
    loadMore,
    runSearch,
  };
}
