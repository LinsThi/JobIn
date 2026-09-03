import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ALL_PLATFORM_IDS,
  EMPTY_FILTERS,
  SearchFilters,
  SearchJob,
  countActiveFilters,
} from "../search.constants";

import { JobPlatformId, normalizePlatformId, normalizedJobToJob } from "~/src/shared/domain/job";
import { useProfile } from "~/src/shared/queries/useProfile";
import { useSearchJobs } from "~/src/shared/queries/useSearchJobs";
import { NormalizedJobDTO, SearchProgress } from "~/src/shared/queries/useSearchJobs/types";
import { showCustomToast } from "~/src/shared/utils/toast";

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

// The backend already performed the keyword search; this only applies the
// structured filters from the filter sheet against the returned jobs.
function matchesJob(job: SearchJob, filters: SearchFilters): boolean {
  if (filters.workModels.length && !filters.workModels.includes(job.workModel ?? "")) {
    return false;
  }
  if (filters.contracts.length && !filters.contracts.includes(job.contractType ?? "")) {
    return false;
  }
  const platformsNarrowed =
    filters.platforms.length > 0 && filters.platforms.length < ALL_PLATFORM_IDS.length;
  if (platformsNarrowed && !filters.platforms.includes(job.platformId)) return false;
  if (filters.states.length && !filters.states.includes(job.state)) return false;
  if (filters.salaryMin > 0 && (job.salaryMin ?? 0) < filters.salaryMin) return false;

  return true;
}

/**
 * Owns the search term and filters. Results come from the async job-search
 * endpoint (`useSearchJobs`): a cache hit resolves immediately, otherwise it
 * polls the worker and reports real per-platform progress. The platform filter
 * scopes which sources the backend scrapes; the remaining filters are applied
 * client-side against the results.
 */
export function useJobSearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);

  const platformScope = useMemo(
    () => (filters.platforms.length ? filters.platforms : ALL_PLATFORM_IDS),
    [filters.platforms]
  );

  const { profile } = useProfile();

  const {
    jobs: rawJobs,
    total,
    pending,
    failed,
    progress,
    hasMore,
    loadingMore,
    loadMore,
  } = useSearchJobs(submitted, platformScope, profile.skills);

  const { done: completedPlatforms, errored: erroredPlatforms } = useMemo(
    () => splitProgress(progress),
    [progress]
  );

  useEffect(() => {
    if (failed) showCustomToast("Não foi possível buscar vagas agora");
  }, [failed]);

  const runSearch = useCallback((term: string) => {
    setSubmitted(term.trim());
  }, []);

  const jobs = useMemo(() => rawJobs.map(toSearchJob), [rawJobs]);

  const results = useMemo(() => jobs.filter((job) => matchesJob(job, filters)), [jobs, filters]);

  const hasActiveFilters = countActiveFilters(filters) > 0;

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
    resultCount: hasActiveFilters ? results.length : total || results.length,
    hasMore,
    loadingMore,
    loadMore,
    runSearch,
  };
}
