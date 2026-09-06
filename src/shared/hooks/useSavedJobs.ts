import { Job } from "~/src/shared/domain/job";
import useUserDetails from "~/src/shared/store/useUserDetails";

/**
 * Facade over `useUserDetails` for the saved-jobs concern only.
 * Screens/components talk to this instead of reaching into the whole store.
 */
export function useSavedJobs() {
  const savedJobs = useUserDetails((store) => store.state.savedJobs);
  const toggle = useUserDetails((store) => store.actions.toggleSavedJob);

  const isSaved = (jobId: string) => savedJobs.some((job) => job.id === jobId);

  const toggleSave = (job: Job) => toggle(job);

  return { savedJobs, isSaved, toggleSave };
}
