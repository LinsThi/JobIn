import Feather from "@expo/vector-icons/Feather";
import { YStack } from "tamagui";

import { notificationsCopy } from "../../notifications.copy";

import { Text } from "~/src/shared/components/ui/Text";

export function NotificationsEmpty() {
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
        <Feather name="bell" size={30} color="#B0D3E1" />
      </YStack>

      <Text variant="section" style={{ textAlign: "center" }}>
        {notificationsCopy.emptyTitle}
      </Text>
      <Text variant="subtitle" style={{ textAlign: "center" }}>
        {notificationsCopy.emptyBody}
      </Text>
    </YStack>
  );
}
