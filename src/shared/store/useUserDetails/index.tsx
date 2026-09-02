/* eslint-disable import/order */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Job } from "~/src/shared/domain/job";
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
        toggleSavedJob: (job: Job) => {
          const savedJobs = get().state.savedJobs;
          const alreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id);

          set((prevState) => ({
            state: {
              ...prevState.state,
              savedJobs: alreadySaved
                ? savedJobs.filter((savedJob) => savedJob.id !== job.id)
                : [job, ...savedJobs],
            },
          }));

          showCustomToast(alreadySaved ? "Vaga removida das salvas" : "Vaga salva em Vagas salvas");
        },
        isJobSaved: (jobId: string) => {
          return get().state.savedJobs.some((savedJob) => savedJob.id === jobId);
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
        const persisted = (persistedState as Partial<StoreProps> | undefined) ?? {};
        const state = persisted.state ?? initialStateUserDetails;

        return {
          state: {
            vacantionRequired: state.vacantionRequired ?? "",
            platformsFollowed: state.platformsFollowed ?? [],
            savedJobs: state.savedJobs ?? [],
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useUserDetails;
