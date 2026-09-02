import { PlataformProps } from "../../../utils/platforms";

import { Job } from "~/src/shared/domain/job";

export type StateProps = {
  vacantionRequired: string;
  savedJobs: Job[];
  platformsFollowed: PlataformProps[];
};

export type ActionProps = {
  handleChangeVacantion: (vacantion: string) => void;
  handleFollowPlatform: (platform: PlataformProps) => void;
  handleUnfollowPlatform: (platform: PlataformProps) => void;
  toggleSavedJob: (job: Job) => void;
  isJobSaved: (jobId: string) => boolean;
  verifyIfPlatformIsFollowed: (platform: PlataformProps) => boolean;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateUserDetails: StateProps = {
  vacantionRequired: "",
  platformsFollowed: [],
  savedJobs: [],
};
