import { PlataformProps } from "../../../utils/platforms";

import { Job } from "~/src/shared/domain/job";

export type StateProps = {
  vacantionRequired: string;
  savedJobs: Job[];
  platformsFollowed: PlataformProps[];
  skills: string[];
  trackedCategories: string[];
};

export type ActionProps = {
  handleChangeVacantion: (vacantion: string) => void;
  handleFollowPlatform: (platform: PlataformProps) => void;
  handleUnfollowPlatform: (platform: PlataformProps) => void;
  toggleSavedJob: (job: Job) => void;
  isJobSaved: (jobId: string) => boolean;
  verifyIfPlatformIsFollowed: (platform: PlataformProps) => boolean;
  saveProfile: (skills: string[], trackedCategories: string[]) => void;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateUserDetails: StateProps = {
  vacantionRequired: "",
  platformsFollowed: [],
  savedJobs: [],
  skills: [],
  trackedCategories: [],
};

/** On-device profile — replaces the old Supabase `profiles` table row. */
export type Profile = {
  skills: string[];
  trackedCategories: string[];
};

export const MAX_TRACKED_CATEGORIES = 3;

/** Minimums the setup flow requires before a profile can be saved. */
export const MIN_SKILLS = 3;
export const MIN_TRACKED_CATEGORIES = 1;

export function isProfileComplete(profile: Profile): boolean {
  return (
    profile.skills.length >= MIN_SKILLS &&
    profile.trackedCategories.length >= MIN_TRACKED_CATEGORIES
  );
}
