import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { profileCopy } from "../../profile.copy";

import useUserDetails, { useUserDetailsHydrated } from "~/src/shared/store/useUserDetails";
import {
  isProfileComplete,
  MAX_TRACKED_CATEGORIES,
} from "~/src/shared/store/useUserDetails/@types";
import { showToast } from "~/src/shared/utils/toast";

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item, index) => item === b[index]);

export function useProfileScreen() {
  const router = useRouter();

  const savedSkills = useUserDetails((store) => store.state.skills);
  const savedCategories = useUserDetails((store) => store.state.trackedCategories);
  const saveProfileAction = useUserDetails((store) => store.actions.saveProfile);
  const hydrated = useUserDetailsHydrated();

  const [skills, setSkills] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [seeded, setSeeded] = useState(false);
  const isSetup = useRef(false);

  useEffect(() => {
    if (!seeded && hydrated) {
      setSkills(savedSkills);
      setCategories(savedCategories);
      isSetup.current = !isProfileComplete({
        skills: savedSkills,
        trackedCategories: savedCategories,
      });
      setSeeded(true);
    }
  }, [seeded, hydrated, savedSkills, savedCategories]);

  const dirty = useMemo(
    () => !sameSet(skills, savedSkills) || !sameSet(categories, savedCategories),
    [skills, categories, savedSkills, savedCategories]
  );

  const meetsMinimum = skills.length > 0 && categories.length > 0;
  const canSave =
    (isSetup.current ? meetsMinimum : dirty) && categories.length <= MAX_TRACKED_CATEGORIES;

  const onSave = () => {
    if (!canSave) return;

    try {
      saveProfileAction(skills, categories);
      if (isSetup.current) {
        router.replace("/(tabs)");
      } else {
        showToast({ type: "success", text: profileCopy.saved });
      }
    } catch {
      showToast({ type: "error", text: profileCopy.saveError });
    }
  };

  return {
    isSetup: isSetup.current,
    loadingProfile: !seeded,
    skills,
    setSkills,
    categories,
    setCategories,
    canSave,
    onSave,
    goBack: () => router.back(),
  };
}
