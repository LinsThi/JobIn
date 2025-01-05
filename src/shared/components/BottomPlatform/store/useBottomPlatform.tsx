import { create } from "zustand";

import { initialStateBottomPlatform, StorePropsBottomPlatform } from "./types";

export const useBottomPlatform = create<StorePropsBottomPlatform>((set) => ({
  state: initialStateBottomPlatform,
  actions: {
    handleOpenBottomPlatform: () => set((state) => ({ state: { ...state.state, isOpened: true } })),
    handleCloseBottomPlatform: () =>
      set((state) => ({ state: { ...state.state, isOpened: false } })),
  },
}));
