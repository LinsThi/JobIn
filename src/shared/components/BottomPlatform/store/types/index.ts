import { RefObject } from "react";

export type StateProps = {
  bottomSheetRef: RefObject<any> | null;
  haveALoading: boolean;
};

export type ActionProps = {
  addBottomSheetRef: (ref: RefObject<any>) => void;
  handleOpenBottomPlatform: () => void;
  handleCloseBottomPlatform: () => void;
  handleChangeHaveALoading: (isLoading: boolean) => void;
};

export type StorePropsBottomPlatform = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateBottomPlatform: StateProps = {
  bottomSheetRef: null,
  haveALoading: false,
};
