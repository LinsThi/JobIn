/* eslint-disable import/order */
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Job } from "~/src/shared/domain/job";
import { zustandMMKVStorage } from "~/src/shared/services/mmkvStorage";
import { PlataformProps } from "~/src/shared/utils/platforms";
import { showToast } from "~/src/shared/utils/toast";
import {
  MAX_TRACKED_CATEGORIES,
  MIN_SKILLS,
  MIN_TRACKED_CATEGORIES,
  StoreProps,
  initialStateUserDetails,
} from "./@types";

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

          showToast({ type: "success", text: "Plataformas atualizadas" });
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

          showToast({ type: "success", text: "Plataformas atualizadas" });
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

          showToast({
            type: "success",
            text: alreadySaved ? "Vaga removida das salvas" : "Vaga salva com sucesso",
          });
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
        saveProfile: (skills: string[], trackedCategories: string[]) => {
          if (skills.length < MIN_SKILLS) {
            throw new Error(`Adicione ao menos ${MIN_SKILLS} habilidades`);
          }

          if (trackedCategories.length < MIN_TRACKED_CATEGORIES) {
            throw new Error(`Adicione ao menos ${MIN_TRACKED_CATEGORIES} área para acompanhar`);
          }

          if (trackedCategories.length > MAX_TRACKED_CATEGORIES) {
            throw new Error(`No máximo ${MAX_TRACKED_CATEGORIES} áreas para acompanhar`);
          }

          set((prevState) => ({
            state: {
              ...prevState.state,
              skills,
              trackedCategories,
            },
          }));
        },
      },
    }),
    {
      name: "@JobIn:userDetails",
      storage: createJSONStorage(() => zustandMMKVStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState as Partial<StoreProps> | undefined) ?? {};
        const state = persisted.state ?? initialStateUserDetails;

        return {
          state: {
            vacantionRequired: state.vacantionRequired ?? "",
            platformsFollowed: state.platformsFollowed ?? [],
            savedJobs: state.savedJobs ?? [],
            skills: state.skills ?? [],
            trackedCategories: state.trackedCategories ?? [],
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useUserDetails;

/**
 * Whether the persisted state has finished loading from MMKV. Navigation
 * guards wait on this before reading `skills`/`trackedCategories` so a cold
 * app open doesn't briefly think the profile is incomplete.
 */
export function useUserDetailsHydrated() {
  const [hydrated, setHydrated] = useState(() => useUserDetails.persist.hasHydrated());

  useEffect(() => {
    const unsub = useUserDetails.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useUserDetails.persist.hasHydrated());
    return unsub;
  }, []);

  return hydrated;
}
