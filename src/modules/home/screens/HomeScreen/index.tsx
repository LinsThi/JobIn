import { useHomeScreen } from "./useHomeScreen";
import { HomeGreeting } from "../../components/HomeGreeting";
import { HomeHeader } from "../../components/HomeHeader";
import { NewJobsFound } from "../../components/NewJobsFound";
import { RecentSearches } from "../../components/RecentSearches";
import { RecommendedJobs } from "../../components/RecommendedJobs";
import { SearchJobsButton } from "../../components/SearchJobsButton";

import { Screen } from "~/src/shared/components/ui/Screen";

export function HomeScreen() {
  const home = useHomeScreen();

  return (
    <Screen scrollRef={home.scrollRef}>
      <HomeHeader onPressBell={home.onPressBell} hasNotifications={home.hasNotifications} />

      <HomeGreeting />

      <SearchJobsButton onPress={home.goToSearch} />

      <RecentSearches
        items={home.recentSearches}
        onSelect={home.onSelectRecent}
        onClear={home.clearRecent}
      />

      <RecommendedJobs
        jobs={home.recommendedJobs}
        onPressJob={home.openJob}
        onSeeAll={home.goToSearch}
      />

      <NewJobsFound
        jobs={home.newJobs}
        loading={home.newJobsLoading}
        onPressJob={home.openJob}
        onSeeMore={home.goToSearch}
      />
    </Screen>
  );
}

export default HomeScreen;
