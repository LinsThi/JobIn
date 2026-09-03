import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  EMPTY_PROFILE,
  MAX_TRACKED_CATEGORIES,
  Profile,
  ProfileRow,
  isProfileComplete,
} from "./types";

import { supabase } from "~/src/shared/services/supabase";
import useAuth from "~/src/shared/store/useAuth";

function rowToProfile(row: ProfileRow | null): Profile {
  return {
    skills: row?.skills ?? [],
    trackedCategories: row?.tracked_categories ?? [],
  };
}

async function fetchProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("skills, tracked_categories")
    .eq("id", userId)
    .maybeSingle<ProfileRow>();

  if (error) throw error;
  return rowToProfile(data);
}

const profileKey = (userId: string | null) => ["profile", userId] as const;

/**
 * The single `profiles` row for the signed-in user. Also reports profile
 * completeness back to `useAuth` so the root guard can route to the profile
 * setup screen vs. the app.
 */
export function useProfile() {
  const userId = useAuth((store) => store.state.userId);
  const setProfileComplete = useAuth((store) => store.actions.setProfileComplete);

  const query = useQuery({
    queryKey: profileKey(userId),
    queryFn: () => fetchProfile(userId as string),
    enabled: !!userId,
    staleTime: 60_000,
  });

  const { data, isSuccess } = query;

  useEffect(() => {
    if (isSuccess && data) {
      setProfileComplete(isProfileComplete(data));
    }
  }, [isSuccess, data, setProfileComplete]);

  return { ...query, profile: data ?? EMPTY_PROFILE };
}

/** Writes `skills` + `tracked_categories` to the user's row. */
export function useSaveProfile() {
  const userId = useAuth((store) => store.state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (next: Profile) => {
      if (!userId) throw new Error("Not signed in");
      if (next.trackedCategories.length > MAX_TRACKED_CATEGORIES) {
        throw new Error(`No máximo ${MAX_TRACKED_CATEGORIES} áreas para acompanhar`);
      }

      // Upsert (not update) so it still works if the signup trigger hasn't
      // provisioned the row yet. RLS `with check (auth.uid() = id)` covers insert.
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        skills: next.skills,
        tracked_categories: next.trackedCategories,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      return next;
    },
    onSuccess: (next) => {
      queryClient.setQueryData(profileKey(userId), next);
      queryClient.invalidateQueries({ queryKey: profileKey(userId) });
    },
  });
}
