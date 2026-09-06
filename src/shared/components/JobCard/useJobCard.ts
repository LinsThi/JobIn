import { GestureResponderEvent } from "react-native";

import { Job } from "~/src/shared/domain/job";
import { useSavedJobs } from "~/src/shared/hooks/useSavedJobs";

export function useJobCard(job: Job) {
  const { isSaved, toggleSave } = useSavedJobs();

  const saved = isSaved(job.id);

  const onToggleSave = (event?: GestureResponderEvent) => {
    event?.stopPropagation?.();
    toggleSave(job);
  };

  return { saved, onToggleSave };
}
