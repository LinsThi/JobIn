import { PlataformProps } from "../../../utils/platforms";

import { IVacationProps } from "~/src/shared/types/vacantion";

export type StateProps = {
  vacantionRequired: string;
  vacantionSaved: IVacationProps[];
  platformsFollowed: PlataformProps[];
};

export type ActionProps = {
  handleChangeVacantion: (vacantion: string) => void;
  handleFollowPlatform: (platform: PlataformProps) => void;
  handleUnfollowPlatform: (platform: PlataformProps) => void;
  handleSaveVacantion: (vacantion: IVacationProps) => void;
  handleUnsaveVacantion: (vacantion: IVacationProps) => void;
  verifyIfPlatformIsFollowed: (platform: PlataformProps) => boolean;
  verifyIfVacantionIsSaved: (vacantion: IVacationProps) => boolean;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateUserDetails: StateProps = {
  vacantionRequired: "",
  platformsFollowed: [],
  vacantionSaved: [],
};
