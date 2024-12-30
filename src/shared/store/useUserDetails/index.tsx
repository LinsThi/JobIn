/* eslint-disable import/order */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StoreProps, initialStateUserDetails } from "./@types";

const useUserDetails = create<StoreProps>()(
  persist(
    (set) => ({
      state: initialStateUserDetails,
      actions: {
        handleChangeVacantion: (vacantion) => {
          set(() => ({
            state: {
              vacantionRequired: vacantion,
            },
          }));
        },
      },
    }),
    {
      name: "@JobIn:userDetails",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const {
          state: { vacantionRequired },
        } = persistedState as StoreProps;

        return {
          state: {
            vacantionRequired,
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useUserDetails;
