import { YStack } from "tamagui";

import { jobDetailCopy } from "../../job-detail.constants";
import { JobDetailFacts } from "../JobDetailFacts";

import { Text } from "~/src/shared/components/ui/Text";
import { Job } from "~/src/shared/domain/job";

type Props = {
  job: Job;
};

export function JobDetailAbout({ job }: Props) {
  return (
    <YStack gap={16}>
      <YStack gap={10}>
        <Text variant="section">{jobDetailCopy.aboutTitle}</Text>
        <Text fontFamily="$regular" fontSize={13} lineHeight={22} color="$ji-ink-3">
          {job.description || jobDetailCopy.emptyDescription}
        </Text>
      </YStack>

      <JobDetailFacts job={job} />
    </YStack>
  );
}
