import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  EnqueuedSearchDTO,
  NormalizedJobDTO,
  SearchPageDTO,
  SearchProgress,
  SearchStatusDTO,
} from "./types";

import { apiServe } from "~/src/shared/services/api";

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 2000;

interface SearchPage {
  jobs: NormalizedJobDTO[];
  page: number;
  total: number;
  hasMore: boolean;
}

function searchParams(term: string, platforms: string[], skills: string[]) {
  return {
    query: term,
    pageSize: PAGE_SIZE,
    ...(platforms.length ? { platforms: platforms.join(",") } : {}),
    // Sent so a search for a tracked category shares its result cache with the
    // Home feed (which always scores by skills).
    ...(skills.length ? { skills: skills.join(",") } : {}),
  };
}

/**
 * Hits `GET /jobs/search?page=1`. A cache hit (`200`) means the search is ready;
 * a miss (`202`) hands back a `jobId` to poll.
 */
async function startSearch(
  term: string,
  platforms: string[],
  skills: string[],
  signal?: AbortSignal
): Promise<{ ready: boolean; jobId?: string }> {
  const response = await apiServe.get<SearchPageDTO | EnqueuedSearchDTO>("/jobs/search", {
    signal,
    params: { ...searchParams(term, platforms, skills), page: 1 },
  });

  if (response.status === 202) {
    return { ready: false, jobId: (response.data as EnqueuedSearchDTO).jobId };
  }
  return { ready: true };
}

async function fetchSearchPage(
  term: string,
  platforms: string[],
  skills: string[],
  page: number,
  signal?: AbortSignal
): Promise<SearchPage> {
  const { data } = await apiServe.get<SearchPageDTO>("/jobs/search", {
    signal,
    params: { ...searchParams(term, platforms, skills), page },
  });

  const total = data.meta?.total ?? data.data.length;
  return { jobs: data.data ?? [], page, total, hasMore: page * PAGE_SIZE < total };
}

async function getSearchStatus(jobId: string, signal?: AbortSignal): Promise<SearchStatusDTO> {
  const { data } = await apiServe.get<SearchStatusDTO>(`/jobs/search/status/${jobId}`, { signal });
  return data;
}

export interface UseSearchJobs {
  jobs: NormalizedJobDTO[];
  total: number;
  /** The initial search (scrape + first page) is still running. */
  pending: boolean;
  failed: boolean;
  /** Live per-platform progress while the worker scrapes. */
  progress?: SearchProgress;
  hasMore: boolean;
  loadingMore: boolean;
  loadMore: () => void;
}

/**
 * Async job search with infinite pagination and live progress.
 *
 * 1. `startSearch` fires the search — ready now (cache hit) or a `jobId` to poll.
 * 2. While queued, `statusQuery` polls `/jobs/search/status/:id` on an interval,
 *    surfacing `progress` (which platforms have answered) on every tick.
 * 3. Once the job completes, the results are paged in via `pagesQuery`.
 */
export function useSearchJobs(
  term: string,
  platforms: string[] = [],
  skills: string[] = []
): UseSearchJobs {
  const query = term.trim();
  const enabled = query.length > 0;
  const platformKey = [...platforms].sort().join(",");
  const skillKey = [...skills]
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join(",");
  const queryClient = useQueryClient();

  const startKey = ["searchJobs", "start", query, platformKey, skillKey];

  const startQuery = useQuery({
    queryKey: startKey,
    queryFn: ({ signal }) => startSearch(query, platforms, skills, signal),
    enabled,
    retry: 1,
    staleTime: 60_000,
    gcTime: 0,
  });

  const jobId = startQuery.data?.jobId;
  const ready = startQuery.data?.ready === true;

  const statusQuery = useQuery({
    queryKey: ["searchJobs", "status", jobId],
    queryFn: ({ signal }) => getSearchStatus(jobId as string, signal),
    enabled: !!jobId && !ready,
    gcTime: 0,
    refetchInterval: (q) => {
      const status = q.state.data?.status;
      return status === "completed" || status === "failed" ? false : POLL_INTERVAL_MS;
    },
  });

  const jobStatus = statusQuery.data?.status;

  // Once the worker finishes, re-run `startSearch` so it now gets the cached 200.
  useEffect(() => {
    if (jobStatus === "completed") {
      queryClient.invalidateQueries({ queryKey: startKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatus, query, platformKey, skillKey]);

  const pagesQuery = useInfiniteQuery({
    queryKey: ["searchJobs", "pages", query, platformKey, skillKey],
    queryFn: ({ pageParam, signal }) =>
      fetchSearchPage(query, platforms, skills, pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    enabled: enabled && ready,
    staleTime: 60_000,
    gcTime: 0,
  });

  const pages = pagesQuery.data?.pages ?? [];
  const failed = startQuery.isError || statusQuery.isError || jobStatus === "failed";

  return {
    jobs: pages.flatMap((page) => page.jobs),
    total: pages[0]?.total ?? 0,
    pending: enabled && !failed && !ready,
    failed,
    progress: statusQuery.data?.progress,
    hasMore: !!pagesQuery.hasNextPage,
    loadingMore: pagesQuery.isFetchingNextPage,
    loadMore: () => {
      if (pagesQuery.hasNextPage && !pagesQuery.isFetchingNextPage) {
        pagesQuery.fetchNextPage();
      }
    },
  };
}
