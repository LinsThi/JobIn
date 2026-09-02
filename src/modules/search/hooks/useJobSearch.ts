import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MOCK_SEARCH_JOBS, SearchJob } from "../data/search.mock";
import {
  EMPTY_FILTERS,
  SEARCH_PLATFORMS,
  SEARCH_STEP_MS,
  SearchFilters,
} from "../search.constants";

import { JobPlatformId } from "~/src/shared/domain/job";

export type SearchPhase = "searching" | "done";

function matchesJob(job: SearchJob, query: string, filters: SearchFilters): boolean {
  const term = query.trim().toLowerCase();

  if (term && !`${job.title} ${job.company}`.toLowerCase().includes(term)) return false;
  if (filters.workModels.length && !filters.workModels.includes(job.workModel ?? "")) {
    return false;
  }
  if (filters.contracts.length && !filters.contracts.includes(job.contractType ?? "")) {
    return false;
  }
  if (filters.platforms.length && !filters.platforms.includes(job.platformId)) return false;
  if (filters.states.length && !filters.states.includes(job.state)) return false;
  if (filters.salaryMin > 0 && (job.salaryMin ?? 0) < filters.salaryMin) return false;

  return true;
}

/**
 * Owns the search term, filters and the simulated "consulting platforms" phase.
 * Results are filtered client-side against the mock dataset.
 */
export function useJobSearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);
  const [phase, setPhase] = useState<SearchPhase>("done");
  const [completedPlatforms, setCompletedPlatforms] = useState<JobPlatformId[]>([]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const runSearch = useCallback(
    (term: string) => {
      clearTimers();
      setSubmitted(term.trim());
      setCompletedPlatforms([]);
      setPhase("searching");

      SEARCH_PLATFORMS.forEach((platform, index) => {
        const weight = platform.speed === "slow" ? 3 : platform.speed === "mid" ? 2 : 1;

        timers.current.push(
          setTimeout(
            () => setCompletedPlatforms((prev) => [...prev, platform.id]),
            SEARCH_STEP_MS * (index + weight)
          )
        );
      });

      timers.current.push(
        setTimeout(() => setPhase("done"), SEARCH_STEP_MS * (SEARCH_PLATFORMS.length + 3))
      );
    },
    [clearTimers]
  );

  const results = useMemo(
    () => MOCK_SEARCH_JOBS.filter((job) => matchesJob(job, submitted, filters)),
    [submitted, filters]
  );

  return {
    query,
    setQuery,
    submitted,
    filters,
    setFilters,
    phase,
    completedPlatforms,
    results,
    runSearch,
  };
}
