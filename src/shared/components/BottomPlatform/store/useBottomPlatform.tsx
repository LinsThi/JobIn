import { create } from "zustand";

import { initialStateBottomPlatform, StorePropsBottomPlatform } from "./types";

export const useBottomPlatform = create<StorePropsBottomPlatform>((set, get) => ({
  state: initialStateBottomPlatform,
  actions: {
    addBottomSheetRef: (ref) => {
      set((prevState) => ({
        state: {
          ...prevState.state,
          bottomSheetRef: ref,
        },
      }));
    },
    handleOpenBottomPlatform: () => {
      const bottomSheet = get().state.bottomSheetRef;
      bottomSheet?.current.show();
    },
    handleChangeHaveALoading: (isLoading) => {
      set((prevState) => ({
        state: {
          ...prevState.state,
          haveALoading: isLoading,
        },
      }));
    },
  },
}));
