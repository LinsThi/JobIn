import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ALL_PLATFORM_IDS,
  EMPTY_FILTERS,
  SEARCH_PLATFORMS,
  SEARCH_STEP_MS,
  SearchFilters,
  SearchJob,
  countActiveFilters,
} from "../search.constants";

import { JobPlatformId, normalizedJobToJob } from "~/src/shared/domain/job";
import { useSearchJobs } from "~/src/shared/queries/useSearchJobs";
import { NormalizedJobDTO } from "~/src/shared/queries/useSearchJobs/types";
import { showCustomToast } from "~/src/shared/utils/toast";

export type SearchPhase = "idle" | "searching" | "done";

function toSearchJob(dto: NormalizedJobDTO): SearchJob {
  return {
    ...normalizedJobToJob(dto),
    state: (dto.location?.state ?? "").toUpperCase(),
  };
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
 * endpoint (`useSearchJobs`): a cache hit resolves immediately, otherwise the
 * hook polls the worker. The platform filter scopes which sources the backend
 * scrapes; the remaining filters are applied client-side against the results.
 */
export function useJobSearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);
  const [completedPlatforms, setCompletedPlatforms] = useState<JobPlatformId[]>([]);

  const platformScope = useMemo(
    () => (filters.platforms.length ? filters.platforms : ALL_PLATFORM_IDS),
    [filters.platforms]
  );

  const {
    jobs: rawJobs,
    total,
    pending,
    failed,
    hasMore,
    loadingMore,
    loadMore,
  } = useSearchJobs(submitted, platformScope);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Cosmetic "consulting platforms" progress while a search is in flight. The
  // backend only reports per-platform status in the final result, so the ticks
  // are staggered locally; the real transition to "done" is driven by `pending`.
  useEffect(() => {
    clearTimers();
    if (!pending) return;

    setCompletedPlatforms([]);
    SEARCH_PLATFORMS.forEach((platform, index) => {
      const weight = platform.speed === "slow" ? 3 : platform.speed === "mid" ? 2 : 1;

      timers.current.push(
        setTimeout(
          () =>
            setCompletedPlatforms((prev) =>
              prev.includes(platform.id) ? prev : [...prev, platform.id]
            ),
          SEARCH_STEP_MS * (index + weight)
        )
      );
    });

    return clearTimers;
  }, [pending, clearTimers]);

  useEffect(() => {
    if (failed) showCustomToast("Não foi possível buscar vagas agora");
  }, [failed]);

  const runSearch = useCallback((term: string) => {
    setSubmitted(term.trim());
  }, []);

  const jobs = useMemo(() => rawJobs.map(toSearchJob), [rawJobs]);

  const results = useMemo(() => jobs.filter((job) => matchesJob(job, filters)), [jobs, filters]);

  const hasActiveFilters = countActiveFilters(filters) > 0;

  useEffect(() => {
    if (__DEV__ && jobs.length) {
      console.log(
        `[search] "${submitted}" -> ${jobs.length}/${total} loaded, ${results.length} after filters`
      );
    }
  }, [submitted, total, jobs.length, results.length]);

  const phase: SearchPhase = !submitted ? "idle" : pending ? "searching" : "done";

  return {
    query,
    setQuery,
    submitted,
    filters,
    setFilters,
    phase,
    completedPlatforms,
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
