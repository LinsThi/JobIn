/* eslint-disable import/order */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StoreProps, initialStateAppStatus } from "./@types";

const useAppStatus = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: initialStateAppStatus,
      actions: {
        handleChangeFirstOpenedApp: () => {
          set((state) => ({
            state: {
              ...state.state,
              alreadyOpenedApp: true,
            },
          }));
        },
        handleChangeShowUpdates: (status) => {
          set((state) => ({
            state: {
              ...state.state,
              showChangesUpdates: status,
            },
          }));
        },
      },
    }),
    {
      name: "@JobIn:appStatus",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const {
          state: { alreadyOpenedApp, showChangesUpdates },
        } = persistedState as StoreProps;

        return {
          state: {
            alreadyOpenedApp,
            showChangesUpdates: showChangesUpdates ?? false,
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useAppStatus;
