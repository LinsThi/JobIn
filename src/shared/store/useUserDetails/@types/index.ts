import { PlataformProps } from "../../../utils/platforms";

export type StateProps = {
  vacantionRequired: string;
  platformsFollowed: PlataformProps[];
};

export type ActionProps = {
  handleChangeVacantion: (vacantion: string) => void;
  handleFollowPlatform: (platform: PlataformProps) => void;
  handleUnfollowPlatform: (platform: PlataformProps) => void;
  verifyIfPlatformIsFollowed: (platform: PlataformProps) => boolean;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateUserDetails: StateProps = {
  vacantionRequired: "",
  platformsFollowed: [],
};
