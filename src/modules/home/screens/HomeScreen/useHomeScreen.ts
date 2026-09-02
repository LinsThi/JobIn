import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { ScrollView } from "react-native";

import { DEFAULT_USER_NAME, NEW_JOBS_PREVIEW_COUNT } from "../../home.constants";
import { useRecommendedJobs } from "../../hooks/useRecommendedJobs";

import { Job, toJob } from "~/src/shared/domain/job";
import { jobDetailHref } from "~/src/shared/navigation/jobRoute";
import { useQueryGetVacantionsAddRecently } from "~/src/shared/queries/useQueryGetVacantionsAddRecently";
import useRecentSearches from "~/src/shared/store/useRecentSearches";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function useHomeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const vacantionRequired = useUserDetails((store) => store.state.vacantionRequired);
  const changeVacantion = useUserDetails((store) => store.actions.handleChangeVacantion);

  const recentSearches = useRecentSearches((store) => store.state.searches);
  const addSearch = useRecentSearches((store) => store.actions.addSearch);
  const clearSearches = useRecentSearches((store) => store.actions.clearSearches);

  const { jobs: recommendedJobs } = useRecommendedJobs();

  const { data: newJobsResponse, isLoading: newJobsLoading } =
    useQueryGetVacantionsAddRecently(vacantionRequired);

  const newJobs = useMemo(
    () => (newJobsResponse?.data ?? []).slice(0, NEW_JOBS_PREVIEW_COUNT).map(toJob),
    [newJobsResponse]
  );

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
  };
}
