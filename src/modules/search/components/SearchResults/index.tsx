import { YStack } from "tamagui";

import { searchCopy } from "../../search.copy";

import { JobCard } from "~/src/shared/components/JobCard";
import { Text } from "~/src/shared/components/ui/Text";
import { Job } from "~/src/shared/domain/job";

type Props = {
  results: Job[];
  onPressJob: (job: Job) => void;
};

export function SearchResults({ results, onPressJob }: Props) {
  if (results.length === 0) {
    return (
      <YStack items="center" py={44} px={20} gap={6}>
        <Text variant="section" style={{ textAlign: "center" }}>
          {searchCopy.emptyTitle}
        </Text>
        <Text variant="subtitle" style={{ textAlign: "center" }}>
          {searchCopy.emptyBody}
        </Text>
      </YStack>
    );
  }

  return (
    <YStack gap={11}>
      {results.map((job) => (
        <JobCard key={job.id} job={job} onPress={onPressJob} />
      ))}
    </YStack>
  );
}
