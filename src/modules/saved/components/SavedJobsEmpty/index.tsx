import Ionicons from "@expo/vector-icons/Ionicons";
import { XStack, YStack } from "tamagui";

import { savedCopy } from "../../saved.copy";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  onSearch: () => void;
};

export function SavedJobsEmpty({ onSearch }: Props) {
  return (
    <YStack items="center" pt={64} px={24} gap={8}>
      <YStack
        width={84}
        height={84}
        rounded={28}
        items="center"
        justify="center"
        bg="$ji-white"
        borderWidth={1}
        borderColor="$ji-border-2"
        mb={14}>
        <Ionicons name="bookmark-outline" size={30} color="#B0D3E1" />
      </YStack>

      <Text variant="section" style={{ textAlign: "center" }}>
        {savedCopy.emptyTitle}
      </Text>
      <Text variant="subtitle" style={{ textAlign: "center" }}>
        {savedCopy.emptyBody}
      </Text>

      <XStack
        mt={14}
        px={22}
        py={13}
        rounded={999}
        bg="$ji-teal-500"
        pressStyle={{ scale: 0.97 }}
        onPress={onSearch}>
        <Text variant="tag" fontSize={13} color="$ji-white">
          {savedCopy.emptyAction}
        </Text>
      </XStack>
    </YStack>
  );
}
