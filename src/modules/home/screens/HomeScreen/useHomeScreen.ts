import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { ScrollView } from "react-native";

import { DEFAULT_USER_NAME } from "../../home.constants";
import { useHomeJobFeed } from "../../hooks/useHomeJobFeed";

import { Job } from "~/src/shared/domain/job";
import { jobDetailHref } from "~/src/shared/navigation/jobRoute";
import { useProfile } from "~/src/shared/queries/useProfile";
import useRecentSearches from "~/src/shared/store/useRecentSearches";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function useHomeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const changeVacantion = useUserDetails((store) => store.actions.handleChangeVacantion);

  const recentSearches = useRecentSearches((store) => store.state.searches);
  const addSearch = useRecentSearches((store) => store.actions.addSearch);
  const clearSearches = useRecentSearches((store) => store.actions.clearSearches);

  const { profile, isLoading: profileLoading } = useProfile();

  const {
    recommended: recommendedJobs,
    newest: newJobs,
    loading: feedLoading,
  } = useHomeJobFeed(profile.trackedCategories, profile.skills);
  const newJobsLoading = profileLoading || feedLoading;

  const goToSearch = useCallback(() => {
    router.push("/search");
  }, [router]);

  const onSelectRecent = useCallback(
    (term: string) => {
      addSearch(term);
      changeVacantion(term);
      router.push({ pathname: "/search", params: { q: term } });
    },
    [addSearch, changeVacantion, router]
  );

  const openJob = useCallback(
    (job: Job) => {
      router.push(jobDetailHref(job));
    },
    [router]
  );

  const onPressBell = useCallback(() => {
    // TODO: open the notifications screen once it exists.
  }, []);

  const onPressProfile = useCallback(() => {
    router.push("/profile");
  }, [router]);

  return {
    scrollRef,
    userName: DEFAULT_USER_NAME,
    hasNotifications: true,
    recentSearches,
    recommendedJobs,
    newJobs,
    newJobsLoading,
    goToSearch,
    onSelectRecent,
    clearRecent: clearSearches,
    openJob,
    onPressBell,
    onPressProfile,
  };
}
