import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  HOME_FEED_GC_MS,
  HOME_FEED_MATCH_FLOOR,
  HOME_FEED_STALE_MS,
  NEW_JOBS_PREVIEW_COUNT,
  RECOMMENDED_PREVIEW_COUNT,
} from "../home.constants";

import { Job, normalizedJobToJob } from "~/src/shared/domain/job";
import {
  EnqueuedSearchDTO,
  NormalizedJobDTO,
  SearchPageDTO,
  SearchStatusDTO,
} from "~/src/shared/queries/useSearchJobs/types";
import { apiServe } from "~/src/shared/services/api";

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 3000;
const EMPTY: NormalizedJobDTO[] = [];

function skillsKeyOf(skills: string[]) {
  return [...skills]
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join(",");
}

function searchParams(term: string, skills: string[]) {
  return {
    query: term,
    page: 1,
    pageSize: PAGE_SIZE,
    ...(skills.length ? { skills: skills.join(",") } : {}),
  };
}

async function fetchStatus(jobId: string, signal?: AbortSignal): Promise<SearchStatusDTO> {
  const { data } = await apiServe.get<SearchStatusDTO>(`/jobs/search/status/${jobId}`, { signal });
  return data;
}

type CategoryFeedResult =
  | { status: "pending" }
  | { status: "failed" }
  | { status: "ready"; jobs: NormalizedJobDTO[] };

/**
 * One round of the async search for a category:
 * - `GET /jobs/search` returns 200 (result cached) → ready with the jobs
 * - or 202 with a jobId → check status; `completed` re-reads the page, otherwise
 *   report `pending` so the query polls again.
 *
 * Stateless on purpose — re-running it (poll or remount) always converges.
 */
async function loadCategoryFeed(
  term: string,
  skills: string[],
  signal?: AbortSignal
): Promise<CategoryFeedResult> {
  const params = searchParams(term, skills);

  const started = await apiServe.get<SearchPageDTO | EnqueuedSearchDTO>("/jobs/search", {
    signal,
    params,
  });

  if (started.status !== 202) {
    return { status: "ready", jobs: (started.data as SearchPageDTO).data ?? [] };
  }

  const jobId = (started.data as EnqueuedSearchDTO).jobId;
  const progress = await fetchStatus(jobId, signal);

  if (progress.status === "failed") return { status: "failed" };
  if (progress.status !== "completed") return { status: "pending" };

  const { data } = await apiServe.get<SearchPageDTO>("/jobs/search", { signal, params });
  return { status: "ready", jobs: data.data ?? [] };
}

interface CategoryFeed {
  jobs: NormalizedJobDTO[] | undefined;
  loading: boolean;
}

function useCategoryFeed(
  rawTerm: string | undefined,
  skills: string[],
  skillsKey: string
): CategoryFeed {
  const term = (rawTerm ?? "").trim();
  const enabled = term.length > 0;

  const query = useQuery({
    queryKey: ["homeFeed", term, skillsKey],
    queryFn: ({ signal }) => loadCategoryFeed(term, skills, signal),
    enabled,
    retry: 1,
    staleTime: HOME_FEED_STALE_MS,
    gcTime: HOME_FEED_GC_MS,
    refetchOnWindowFocus: false,
    refetchInterval: (q) => (q.state.data?.status === "pending" ? POLL_INTERVAL_MS : false),
  });

  const result = query.data;

  return {
    jobs: result?.status === "ready" ? result.jobs : undefined,
    loading: enabled && !query.isError && (query.isLoading || result?.status === "pending"),
  };
}

export interface UseHomeJobFeed {
  /** Best skill-fit jobs (highest match score), excluding whatever `newest` shows. */
  recommended: Job[];
  /** Most recently posted jobs (skill matches first, then backfilled by date). */
  newest: Job[];
  loading: boolean;
}

/**
 * On Home open, searches every platform for each of the user's tracked categories
 * (up to 3), factoring their skills into a per-job match score. The merged result
 * feeds two sections: "Novos empregos" (most recent) and "Recomendados" (best
 * skill fit) — the two lists never repeat a job.
 */
export function useHomeJobFeed(categories: string[], skills: string[]): UseHomeJobFeed {
  const skillsKey = useMemo(() => skillsKeyOf(skills), [skills]);

  const feedA = useCategoryFeed(categories[0], skills, skillsKey);
  const feedB = useCategoryFeed(categories[1], skills, skillsKey);
  const feedC = useCategoryFeed(categories[2], skills, skillsKey);

  const loading = feedA.loading || feedB.loading || feedC.loading;

  const { recommended, newest } = useMemo(() => {
    const byId = new Map<string, NormalizedJobDTO>();
    for (const list of [feedA.jobs ?? EMPTY, feedB.jobs ?? EMPTY, feedC.jobs ?? EMPTY]) {
      for (const job of list) if (!byId.has(job.id)) byId.set(job.id, job);
    }
    const all = [...byId.values()];

    const recency = (job: NormalizedJobDTO) =>
      job.publishedAt ? Date.parse(job.publishedAt) || 0 : 0;
    const score = (job: NormalizedJobDTO) => job.match?.score ?? 0;
    const byRecent = (a: NormalizedJobDTO, b: NormalizedJobDTO) => recency(b) - recency(a);
    const byScore = (a: NormalizedJobDTO, b: NormalizedJobDTO) =>
      score(b) - score(a) || recency(b) - recency(a);
    const isMatch = (job: NormalizedJobDTO) => score(job) > HOME_FEED_MATCH_FLOOR;

    const newestPool = [
      ...all.filter(isMatch).sort(byRecent),
      ...all.filter((job) => !isMatch(job)).sort(byRecent),
    ];
    const newestJobs = newestPool.slice(0, NEW_JOBS_PREVIEW_COUNT);
    const newestIds = new Set(newestJobs.map((job) => job.id));

    const recommendedJobs = all
      .filter((job) => !newestIds.has(job.id))
      .sort(byScore)
      .slice(0, RECOMMENDED_PREVIEW_COUNT);

    return {
      recommended: recommendedJobs.map(normalizedJobToJob),
      newest: newestJobs.map(normalizedJobToJob),
    };
  }, [feedA.jobs, feedB.jobs, feedC.jobs]);

  return { recommended, newest, loading };
}
