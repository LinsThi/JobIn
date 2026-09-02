import Feather from "@expo/vector-icons/Feather";
import { XStack, YStack } from "tamagui";

import { homeCopy } from "../../home.copy";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  onPress: () => void;
};

export function SearchJobsButton({ onPress }: Props) {
  return (
    <XStack
      items="center"
      justify="space-between"
      px={18}
      py={16}
      rounded={20}
      bg="$ji-navy-900"
      pressStyle={{ scale: 0.97 }}
      onPress={onPress}>
      <XStack items="center" gap={11}>
        <Feather name="search" size={18} color="#FFFFFF" />
        <Text variant="button">{homeCopy.searchCta}</Text>
      </XStack>

      <YStack
        width={30}
        height={30}
        rounded={999}
        items="center"
        justify="center"
        bg="$ji-teal-500">
        <Feather name="arrow-right" size={14} color="#FFFFFF" />
      </YStack>
    </XStack>
  );
}
