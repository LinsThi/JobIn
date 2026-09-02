import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useMemo, useState } from "react";

import { JobDetailTab } from "../../job-detail.constants";

import { useSavedJobs } from "~/src/shared/hooks/useSavedJobs";
import { parseJobParam } from "~/src/shared/navigation/jobRoute";

type JobDetailParams = {
  id?: string;
  job?: string;
};

export function useJobDetailScreen() {
  const router = useRouter();
  const { id, job: jobParam } = useLocalSearchParams<JobDetailParams>();
  const { savedJobs, isSaved, toggleSave } = useSavedJobs();

  const job = useMemo(() => {
    return parseJobParam(jobParam) ?? savedJobs.find((saved) => saved.id === id) ?? null;
  }, [jobParam, savedJobs, id]);

  const [tab, setTab] = useState<JobDetailTab>("about");

  const saved = job ? isSaved(job.id) : false;

  const onToggleSave = useCallback(() => {
    if (job) toggleSave(job);
  }, [job, toggleSave]);

  const onApply = useCallback(async () => {
    if (!job?.url) return;
    await WebBrowser.openBrowserAsync(job.url);
  }, [job]);

  const goBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/");
  }, [router]);

  return { job, tab, setTab, saved, onToggleSave, onApply, goBack };
}
