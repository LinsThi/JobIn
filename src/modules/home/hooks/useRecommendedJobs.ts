import { RECOMMENDED_JOBS } from "../data/home.mock";
import { RECOMMENDED_PREVIEW_COUNT } from "../home.constants";

import { Job } from "~/src/shared/domain/job";

type UseRecommendedJobsResult = {
  jobs: Job[];
  isLoading: boolean;
};

/**
 * Single swap point: when a recommendations endpoint exists, replace the mock
 * with a react-query call here — callers don't change.
 */
export function useRecommendedJobs(): UseRecommendedJobsResult {
  return {
    jobs: RECOMMENDED_JOBS.slice(0, RECOMMENDED_PREVIEW_COUNT),
    isLoading: false,
  };
}
