/* eslint-disable import/order */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandMMKVStorage } from "~/src/shared/services/mmkvStorage";
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
      },
    }),
    {
      name: "@JobIn:appStatus",
      storage: createJSONStorage(() => zustandMMKVStorage),
      merge: (persistedState, currentState) => {
        const {
          state: { alreadyOpenedApp },
        } = persistedState as StoreProps;

        return {
          state: {
            alreadyOpenedApp,
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useAppStatus;
