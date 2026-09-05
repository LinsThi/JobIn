import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { ScrollView } from "react-native";

import { DEFAULT_USER_NAME } from "../../home.constants";
import { useHomeJobFeed } from "../../hooks/useHomeJobFeed";

import { Job } from "~/src/shared/domain/job";
import { jobDetailHref } from "~/src/shared/navigation/jobRoute";
import { useNotifications } from "~/src/shared/queries/useNotifications";
import { ensureNotificationPermission } from "~/src/shared/services/localNotifications";
import useRecentSearches from "~/src/shared/store/useRecentSearches";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function useHomeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const changeVacantion = useUserDetails((store) => store.actions.handleChangeVacantion);

  const recentSearches = useRecentSearches((store) => store.state.searches);
  const addSearch = useRecentSearches((store) => store.actions.addSearch);
  const clearSearches = useRecentSearches((store) => store.actions.clearSearches);

  const skills = useUserDetails((store) => store.state.skills);
  const trackedCategories = useUserDetails((store) => store.state.trackedCategories);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    ensureNotificationPermission().catch(() => undefined);
  }, []);

  const {
    recommended: recommendedJobs,
    newest: newJobs,
    loading: newJobsLoading,
  } = useHomeJobFeed(trackedCategories, skills);

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
    router.push("/notifications");
  }, [router]);

  const onPressProfile = useCallback(() => {
    router.push("/profile");
  }, [router]);

  return {
    scrollRef,
    userName: DEFAULT_USER_NAME,
    hasNotifications: unreadCount > 0,
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
