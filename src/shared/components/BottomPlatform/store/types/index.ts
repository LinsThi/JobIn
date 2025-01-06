import { RefObject } from "react";
import BottomSheet from "react-native-gesture-bottom-sheet";

export type StateProps = {
  bottomSheetRef: RefObject<BottomSheet> | null;
  haveALoading: boolean;
};

export type ActionProps = {
  addBottomSheetRef: (ref: RefObject<BottomSheet>) => void;
  handleOpenBottomPlatform: () => void;
  handleChangeHaveALoading: () => void;
};

export type StorePropsBottomPlatform = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateBottomPlatform: StateProps = {
  bottomSheetRef: null,
  haveALoading: false,
};
