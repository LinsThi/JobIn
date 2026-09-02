import { useRouter } from "expo-router";
import { useCallback } from "react";

import { Job } from "~/src/shared/domain/job";
import { useSavedJobs } from "~/src/shared/hooks/useSavedJobs";
import { jobDetailHref } from "~/src/shared/navigation/jobRoute";

export function useSavedJobsScreen() {
  const router = useRouter();
  const { savedJobs } = useSavedJobs();

  const openJob = useCallback(
    (job: Job) => {
      router.push(jobDetailHref(job));
    },
    [router]
  );

  const goToSearch = useCallback(() => {
    router.push("/search");
  }, [router]);

  return {
    savedJobs,
    count: savedJobs.length,
    openJob,
    goToSearch,
  };
}
