import { YStack } from "tamagui";

import { NEW_JOBS_PREVIEW_COUNT } from "../../home.constants";
import { homeCopy } from "../../home.copy";

import { JobCard } from "~/src/shared/components/JobCard";
import { JobCardSkeleton } from "~/src/shared/components/JobCard/JobCardSkeleton";
import { SectionHeader } from "~/src/shared/components/ui/SectionHeader";
import { Text } from "~/src/shared/components/ui/Text";
import { Job } from "~/src/shared/domain/job";

type Props = {
  jobs: Job[];
  loading: boolean;
  onPressJob: (job: Job) => void;
  onSeeMore: () => void;
};

export function NewJobsFound({ jobs, loading, onPressJob, onSeeMore }: Props) {
  return (
    <YStack>
      <SectionHeader
        title={homeCopy.newJobsTitle}
        actionLabel={homeCopy.newJobsAction}
        onAction={onSeeMore}
      />

      <YStack gap={11}>
        {loading ? (
          Array.from({ length: NEW_JOBS_PREVIEW_COUNT }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} onPress={onPressJob} />)
        ) : (
          <Text variant="subtitle">Nenhuma vaga nova encontrada por enquanto.</Text>
        )}
      </YStack>
    </YStack>
  );
}
