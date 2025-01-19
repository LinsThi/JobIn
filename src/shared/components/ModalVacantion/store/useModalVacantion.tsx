import { create } from "zustand";

import {
  initialStateModalVacantion,
  StorePropsModalVacantion,
} from "~/src/shared/components/ModalVacantion/store/types";

export const useModalVacation = create<StorePropsModalVacantion>((set) => ({
  state: initialStateModalVacantion,
  actions: {
    handleOpenModalVacantion: (type) =>
      set((state) => ({ state: { ...state.state, isOpened: true, type } })),
    handleCloseModalVacantion: () =>
      set((state) => ({ state: { ...state.state, isOpened: false } })),
  },
}));
