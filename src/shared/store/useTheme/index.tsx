/* eslint-disable import/order */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ActionProps, StateProps } from "./@types";

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const THEME_TYPES = {
  THEME_DARK: "dark",
  THEME_LIGHT: "light",
};

const initialState: StateProps = {
  theme: "dark",
};

const useTheme = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: initialState,
      actions: {
        handleToggleTheme: () => {
          const newTheme = get().state.theme === "dark" ? "light" : "dark";

          set((prev) => ({
            ...prev,
            state: {
              theme: newTheme,
            },
          }));
        },
      },
    }),
    {
      name: "@JobIn:theme",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const {
          state: { theme },
        } = persistedState as StoreProps;

        return {
          state: {
            theme,
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useTheme;
