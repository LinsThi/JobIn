import { create } from "zustand";

import { initialStateModalVacantion, StorePropsModalVacantion } from "./types";

export const useModalRemove = create<StorePropsModalVacantion>((set) => ({
  state: initialStateModalVacantion,
  actions: {
    handleOpenModalVacantion: (vacantion) =>
      set((state) => ({ state: { ...state.state, isOpened: true, vacantion } })),
    handleCloseModalVacantion: () =>
      set((state) => ({ state: { ...state.state, isOpened: false } })),
  },
}));
