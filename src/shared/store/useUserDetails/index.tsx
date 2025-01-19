/* eslint-disable import/order */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PlataformProps } from "~/src/shared/utils/platforms";
import { showCustomToast } from "~/src/shared/utils/toast";
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

          showCustomToast("Plataformas atualizadas");
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

          showCustomToast("Plataformas atualizadas");
        },
        handleSaveVacantion: (vacantion) => {
          const vacantionSaved = get().state.vacantionSaved;

          if (
            !vacantionSaved.find(
              (currentVacantion) =>
                currentVacantion.vacationTitle === vacantion.vacationTitle &&
                currentVacantion.companyName === vacantion.companyName
            )
          ) {
            set((prevState) => ({
              state: {
                ...prevState.state,
                vacantionSaved: [...vacantionSaved, vacantion],
              },
            }));

            showCustomToast("Oportunidade salva");
          }
        },
        handleUnsaveVacantion: (vacantion) => {
          const vacantionSaved = get().state.vacantionSaved;

          set((prevState) => ({
            state: {
              ...prevState.state,
              vacantionSaved: vacantionSaved.filter(
                (vacantionSaved) =>
                  vacantionSaved.vacationTitle !== vacantion.vacationTitle &&
                  vacantionSaved.companyName !== vacantion.companyName
              ),
            },
          }));

          showCustomToast("Oportunidade removida dos salvos");
        },
        verifyIfPlatformIsFollowed: (platform: PlataformProps) => {
          const followedPlatforms = get().state.platformsFollowed;

          return !!followedPlatforms.find(
            (followedPlatform) => followedPlatform.name === platform.name
          );
        },
        verifyIfVacantionIsSaved: (vacantion) => {
          const vacantionSaved = get().state.vacantionSaved;

          return !!vacantionSaved.find(
            (vacantionSaved) =>
              vacantionSaved.vacationTitle === vacantion.vacationTitle &&
              vacantionSaved.companyName === vacantion.companyName
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
