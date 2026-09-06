import { ScrollView } from "react-native";
import { YStack } from "tamagui";

import { RecommendedJobCard } from "./RecommendedJobCard";
import { RecommendedJobCardSkeleton } from "./RecommendedJobCardSkeleton";
import { RECOMMENDED_PREVIEW_COUNT } from "../../home.constants";
import { homeCopy } from "../../home.copy";

import { SectionHeader } from "~/src/shared/components/ui/SectionHeader";
import { Job } from "~/src/shared/domain/job";

type Props = {
  jobs: Job[];
  loading: boolean;
  onPressJob: (job: Job) => void;
};

export function RecommendedJobs({ jobs, loading, onPressJob }: Props) {
  if (!loading && jobs.length === 0) return null;

  return (
    <YStack>
      <SectionHeader title={homeCopy.recommendedTitle} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -20 }}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
        {loading
          ? Array.from({ length: RECOMMENDED_PREVIEW_COUNT }).map((_, index) => (
              <RecommendedJobCardSkeleton key={index} />
            ))
          : jobs.map((job) => <RecommendedJobCard key={job.id} job={job} onPress={onPressJob} />)}
      </ScrollView>
    </YStack>
  );
}
