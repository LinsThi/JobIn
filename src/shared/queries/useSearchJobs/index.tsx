import { useInfiniteQuery } from "@tanstack/react-query";

import { EnqueuedSearchDTO, NormalizedJobDTO, SearchPageDTO, SearchStatusDTO } from "./types";

import { apiServe } from "~/src/shared/services/api";

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 2500;
/** Give up polling a job that never finishes and surface it as a failure. */
const MAX_WAIT_MS = 90_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SearchPage {
  jobs: NormalizedJobDTO[];
  page: number;
  total: number;
  hasMore: boolean;
}

interface FetchArgs {
  term: string;
  platforms: string[];
  page: number;
}

async function getSearchStatus(jobId: string, signal?: AbortSignal): Promise<SearchStatusDTO> {
  const { data } = await apiServe.get<SearchStatusDTO>(`/jobs/search/status/${jobId}`, { signal });
  return data;
}

/** Polls a queued job until the worker finishes scraping (or it fails / times out). */
async function waitForJob(jobId: string, signal?: AbortSignal): Promise<void> {
  const deadline = Date.now() + MAX_WAIT_MS;

  while (Date.now() < deadline) {
    if (signal?.aborted) throw new Error("aborted");

    const status = await getSearchStatus(jobId, signal);
    if (status.status === "completed") return;
    if (status.status === "failed") throw new Error(status.error ?? "A busca falhou");

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error("A busca demorou mais do que o esperado");
}

/**
 * Fetches one page of a search. On a cache miss the first call returns `202`, so
 * we wait for the worker and retry the same page (now a cache hit).
 */
async function fetchSearchPage(
  { term, platforms, page }: FetchArgs,
  signal?: AbortSignal
): Promise<SearchPage> {
  const response = await apiServe.get<SearchPageDTO | EnqueuedSearchDTO>("/jobs/search", {
    signal,
    params: {
      query: term,
      page,
      pageSize: PAGE_SIZE,
      ...(platforms.length ? { platforms: platforms.join(",") } : {}),
    },
  });

  if (response.status === 202) {
    await waitForJob((response.data as EnqueuedSearchDTO).jobId, signal);
    return fetchSearchPage({ term, platforms, page }, signal);
  }

  const body = response.data as SearchPageDTO;
  const total = body.meta?.total ?? body.data.length;

  return {
    jobs: body.data ?? [],
    page,
    total,
    hasMore: page * PAGE_SIZE < total,
  };
}

export interface UseSearchJobs {
  jobs: NormalizedJobDTO[];
  total: number;
  /** The initial search (scrape + first page) is running. */
  pending: boolean;
  failed: boolean;
  hasMore: boolean;
  loadingMore: boolean;
  loadMore: () => void;
}

/**
 * Async job search with infinite pagination. `GET /jobs/search?page=N` returns a
 * page immediately on a cache hit; on a miss it returns a `jobId` that we poll on
 * `GET /jobs/search/status/:jobId` before retrying. `platforms` scopes which
 * sources are scraped; changing the term or platforms starts a fresh search.
 */
export function useSearchJobs(term: string, platforms: string[] = []): UseSearchJobs {
  const query = term.trim();
  const enabled = query.length > 0;
  const platformKey = [...platforms].sort().join(",");

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["searchJobs", query, platformKey],
    queryFn: ({ pageParam, signal }) =>
      fetchSearchPage({ term: query, platforms, page: pageParam }, signal),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    enabled,
    retry: (count, error) => count < 1 && error.message !== "aborted",
    staleTime: 60_000,
    gcTime: 0,
  });

  const pages = infiniteQuery.data?.pages ?? [];

  return {
    jobs: pages.flatMap((page) => page.jobs),
    total: pages[0]?.total ?? 0,
    pending: enabled && infiniteQuery.isPending,
    failed: infiniteQuery.isError,
    hasMore: !!infiniteQuery.hasNextPage,
    loadingMore: infiniteQuery.isFetchingNextPage,
    loadMore: () => {
      if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
        infiniteQuery.fetchNextPage();
      }
    },
  };
}
