import { XStack, YStack } from "tamagui";

import { JOB_DETAIL_FACT_LABELS } from "../../job-detail.constants";

import { Text } from "~/src/shared/components/ui/Text";
import { Job } from "~/src/shared/domain/job";

type Props = {
  job: Job;
};

export function JobDetailFacts({ job }: Props) {
  const facts = [
    { label: JOB_DETAIL_FACT_LABELS.workModel, value: job.workModel },
    { label: JOB_DETAIL_FACT_LABELS.contractType, value: job.contractType },
    { label: JOB_DETAIL_FACT_LABELS.platform, value: job.platform },
    { label: JOB_DETAIL_FACT_LABELS.postedAt, value: job.postedAtLabel },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  if (facts.length === 0) return null;

  return (
    <XStack flexWrap="wrap" gap={10}>
      {facts.map((fact) => (
        <YStack
          key={fact.label}
          style={{ width: "47%", flexGrow: 1 }}
          bg="$ji-white"
          borderWidth={1}
          borderColor="$ji-border-1"
          rounded={18}
          p={14}
          gap={6}>
          <Text variant="eyebrow" style={{ textTransform: "uppercase" }}>
            {fact.label}
          </Text>
          <Text fontFamily="$semibold" fontSize={13} color="$ji-navy-900">
            {fact.value}
          </Text>
        </YStack>
      ))}
    </XStack>
  );
}
