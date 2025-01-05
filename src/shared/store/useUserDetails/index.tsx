/* eslint-disable import/order */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PlataformProps } from "~/src/shared/utils/platforms";
import { StoreProps, initialStateUserDetails } from "./@types";

const useUserDetails = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: initialStateUserDetails,
      actions: {
        handleChangeVacantion: (vacantion: string) => {
          set((prevState) => ({
            state: {
              ...prevState.state,
              vacantionRequired: vacantion,
            },
          }));
        },
        handleFollowPlatform: (platform: PlataformProps) => {
          const followedPlatforms = get().state.platformsFollowed;

          if (
            !followedPlatforms.find((followedPlatform) => followedPlatform.name === platform.name)
          ) {
            set((prevState) => ({
              state: {
                ...prevState.state,
                platformsFollowed: [...followedPlatforms, platform],
              },
            }));
          }
        },
        handleUnfollowPlatform: (platform: PlataformProps) => {
          const followedPlatforms = get().state.platformsFollowed;

          set((prevState) => ({
            state: {
              ...prevState.state,
              platformsFollowed: followedPlatforms.filter(
                (followedPlatform) => followedPlatform.name !== platform.name
              ),
            },
          }));
        },
        verifyIfPlatformIsFollowed: (platform: PlataformProps) => {
          const followedPlatforms = get().state.platformsFollowed;

          return !!followedPlatforms.find(
            (followedPlatform) => followedPlatform.name === platform.name
          );
        },
      },
    }),
    {
      name: "@JobIn:userDetails",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => {
        const { state } = persistedState as StoreProps;

        return {
          state,
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useUserDetails;
