import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { profileCopy } from "../../profile.copy";

import { useProfile, useSaveProfile } from "~/src/shared/queries/useProfile";
import { MAX_TRACKED_CATEGORIES } from "~/src/shared/queries/useProfile/types";
import { supabase } from "~/src/shared/services/supabase";
import useAuth from "~/src/shared/store/useAuth";
import { showCustomToast } from "~/src/shared/utils/toast";

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item, index) => item === b[index]);

export function useProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const status = useAuth((store) => store.state.status);
  const email = useAuth((store) => store.state.session?.user.email ?? "");

  const { profile, isLoading } = useProfile();
  const saveProfile = useSaveProfile();

  const isSetup = status === "needsProfile";

  const [skills, setSkills] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const leaveSetupOnReady = useRef(false);

  useEffect(() => {
    if (!hydrated && !isLoading) {
      setSkills(profile.skills);
      setCategories(profile.trackedCategories);
      setHydrated(true);
    }
  }, [hydrated, isLoading, profile]);

  // After the setup save, the profile query flips auth status to "ready"; wait
  // for that so the (tabs) guard exists before navigating there.
  useEffect(() => {
    if (leaveSetupOnReady.current && status === "ready") {
      leaveSetupOnReady.current = false;
      router.replace("/(tabs)");
    }
  }, [status, router]);

  const dirty = useMemo(
    () => !sameSet(skills, profile.skills) || !sameSet(categories, profile.trackedCategories),
    [skills, categories, profile]
  );

  const meetsMinimum = skills.length > 0 && categories.length > 0;
  const canSave =
    !saveProfile.isPending &&
    (isSetup ? meetsMinimum : dirty) &&
    categories.length <= MAX_TRACKED_CATEGORIES;

  const onSave = () => {
    if (!canSave) return;
    saveProfile.mutate(
      { skills, trackedCategories: categories },
      {
        onSuccess: () => {
          if (isSetup) {
            leaveSetupOnReady.current = true;
          } else {
            showCustomToast(profileCopy.saved);
          }
        },
        onError: () => showCustomToast(profileCopy.saveError),
      }
    );
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
  };

  return {
    isSetup,
    email,
    loadingProfile: isLoading || !hydrated,
    skills,
    setSkills,
    categories,
    setCategories,
    canSave,
    saving: saveProfile.isPending,
    onSave,
    onSignOut,
    goBack: () => router.back(),
  };
}
