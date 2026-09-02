import { XStack, YStack } from "tamagui";

import { jobDetailCopy } from "../../job-detail.constants";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  items: string[];
};

export function JobBenefitList({ items }: Props) {
  return (
    <YStack gap={14}>
      <Text variant="section">{jobDetailCopy.benefitsTitle}</Text>

      {items.length === 0 ? (
        <Text variant="subtitle">{jobDetailCopy.emptyBenefits}</Text>
      ) : (
        <YStack gap={10}>
          {items.map((item, index) => (
            <XStack
              key={`${index}-${item}`}
              items="center"
              gap={12}
              bg="$ji-white"
              borderWidth={1}
              borderColor="$ji-border-1"
              rounded={16}
              px={15}
              py={13}>
              <YStack width={8} height={8} rounded={999} bg="$ji-teal-500" />
              <Text flex={1} fontFamily="$medium" fontSize={12.5} color="$ji-navy-600">
                {item}
              </Text>
            </XStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
}
