import Feather from "@expo/vector-icons/Feather";
import { XStack, YStack } from "tamagui";

import { jobDetailCopy } from "../../job-detail.constants";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  items: string[];
};

export function JobRequirementList({ items }: Props) {
  return (
    <YStack gap={14}>
      <Text variant="section">{jobDetailCopy.requirementsTitle}</Text>

      {items.length === 0 ? (
        <Text variant="subtitle">{jobDetailCopy.emptyRequirements}</Text>
      ) : (
        <YStack gap={12}>
          {items.map((item, index) => (
            <XStack key={`${index}-${item}`} gap={11} items="flex-start">
              <YStack
                width={20}
                height={20}
                rounded={7}
                items="center"
                justify="center"
                bg="$ji-fill-accent"
                mt={1}>
                <Feather name="check" size={11} color="#219EBC" />
              </YStack>
              <Text flex={1} fontFamily="$regular" fontSize={13} lineHeight={21} color="$ji-ink-3">
                {item}
              </Text>
            </XStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
}
