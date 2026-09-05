import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import {
  HOME_FEED_GC_MS,
  HOME_FEED_MATCH_FLOOR,
  HOME_FEED_POLL_MS,
  HOME_FEED_SNAPSHOT_MAX_AGE_MS,
  HOME_FEED_STALE_MS,
  NEW_JOBS_PREVIEW_COUNT,
  RECOMMENDED_PREVIEW_COUNT,
} from "../home.constants";
import useHomeFeedCache, { useHomeFeedCacheHydrated } from "./useHomeFeedCache";

import { Job, normalizedJobToJob } from "~/src/shared/domain/job";
import { NormalizedJobDTO } from "~/src/shared/queries/useSearchJobs/types";
import { apiServe } from "~/src/shared/services/api";
import { getDeviceId } from "~/src/shared/services/deviceId";

const MAX_CATEGORIES = 3;
const EMPTY: NormalizedJobDTO[] = [];

function listKey(values: string[]) {
  return [...values]
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join(",");
}

interface HomeFeedResponse {
  status: "ready" | "pending";
  data?: NormalizedJobDTO[];
}

interface HomeFeedResult {
  status: "ready" | "pending";
  jobs: NormalizedJobDTO[];
}

/**
 * One round of the aggregated Home feed. The backend fans out one search per
 * tracked category and answers `200` once every category is ready or `202`
 * (still 2xx, so axios resolves) with whatever categories are already cached.
 * Stateless — re-calling it converges as the scrapes finish.
 */
async function fetchHomeFeed(
  categories: string[],
  skills: string[],
  userId: string,
  signal?: AbortSignal
): Promise<HomeFeedResult> {
  const { data } = await apiServe.get<HomeFeedResponse>("/home/feed", {
    signal,
    params: {
      categories: categories.join(","),
      ...(skills.length ? { skills: skills.join(",") } : {}),
      userId,
    },
  });

  return { status: data.status, jobs: data.data ?? [] };
}

export interface UseHomeJobFeed {
  /** Best skill-fit jobs (highest match score), excluding whatever `newest` shows. */
  recommended: Job[];
  /** Most recently posted jobs (skill matches first, then backfilled by date). */
  newest: Job[];
  loading: boolean;
}

/**
 * On Home open, asks the backend for one merged feed covering the user's tracked
 * categories (up to 3), skill-scored. A single request replaces the previous
 * three parallel searches; results are seeded from the last persisted snapshot
 * so a cold open paints immediately and revalidates in the background.
 */
export function useHomeJobFeed(categories: string[], skills: string[]): UseHomeJobFeed {
  const trackedCategories = useMemo(
    () =>
      categories
        .map((c) => c.trim())
        .filter(Boolean)
        .slice(0, MAX_CATEGORIES),
    [categories]
  );
  const categoriesKey = useMemo(() => listKey(trackedCategories), [trackedCategories]);
  const skillsKey = useMemo(() => listKey(skills), [skills]);
  const feedKey = `${categoriesKey}|${skillsKey}`;
  const userId = getDeviceId();

  const hydrated = useHomeFeedCacheHydrated();
  const snapshot = useHomeFeedCache((store) => store.snapshot);
  const saveSnapshot = useHomeFeedCache((store) => store.save);

  const seed =
    snapshot &&
    snapshot.key === feedKey &&
    Date.now() - snapshot.updatedAt < HOME_FEED_SNAPSHOT_MAX_AGE_MS
      ? snapshot
      : undefined;

  const enabled = trackedCategories.length > 0 && hydrated;

  const query = useQuery({
    queryKey: ["homeFeed", categoriesKey, skillsKey],
    queryFn: ({ signal }) => fetchHomeFeed(trackedCategories, skills, userId, signal),
    enabled,
    retry: 1,
    staleTime: HOME_FEED_STALE_MS,
    gcTime: HOME_FEED_GC_MS,
    refetchOnWindowFocus: false,
    refetchInterval: (q) => (q.state.data?.status === "pending" ? HOME_FEED_POLL_MS : false),
    initialData: seed ? { status: "ready" as const, jobs: seed.jobs } : undefined,
    initialDataUpdatedAt: seed?.updatedAt,
  });

  const result = query.data;

  useEffect(() => {
    if (result?.status === "ready" && result.jobs.length > 0) {
      saveSnapshot({ key: feedKey, jobs: result.jobs, updatedAt: Date.now() });
    }
  }, [result, feedKey, saveSnapshot]);

  const jobs = result?.jobs ?? EMPTY;

  // Skeletons only while we have nothing to show yet; once partial results
  // arrive they render and the query keeps polling in the pending sections.
  const loading = enabled && !query.isError && jobs.length === 0 && result?.status !== "ready";

  const { recommended, newest } = useMemo(() => {
    const byId = new Map<string, NormalizedJobDTO>();
    for (const job of jobs) if (!byId.has(job.id)) byId.set(job.id, job);
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
  }, [jobs]);

  return { recommended, newest, loading };
}
