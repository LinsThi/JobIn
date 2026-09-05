import Feather from "@expo/vector-icons/Feather";
import { XStack, YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";
import { NotificationDTO } from "~/src/shared/queries/useNotifications/types";

type Props = {
  notification: NotificationDTO;
  onPress: (notification: NotificationDTO) => void;
};

/** ISO date -> short pt-BR relative label, e.g. "há 3 h", "há 2 d". */
function relativeLabel(iso: string): string {
  const published = Date.parse(iso);
  if (Number.isNaN(published)) return "";

  const minutes = Math.max(0, Math.round((Date.now() - published) / 60000));

  if (minutes < 60) return "agora há pouco";
  if (minutes < 60 * 24) return `há ${Math.floor(minutes / 60)} h`;
  return `há ${Math.floor(minutes / (60 * 24))} d`;
}

export function NotificationItem({ notification, onPress }: Props) {
  const unread = !notification.readAt;

  return (
    <XStack
      items="flex-start"
      gap={12}
      p={14}
      rounded={18}
      bg={unread ? "$ji-white" : "transparent"}
      borderWidth={1}
      borderColor={unread ? "$ji-border-2" : "transparent"}
      pressStyle={{ opacity: 0.7 }}
      onPress={() => onPress(notification)}>
      <YStack
        width={38}
        height={38}
        rounded={12}
        items="center"
        justify="center"
        bg={unread ? "$ji-teal-500" : "$ji-fill-1"}>
        <Feather name="bell" size={16} color={unread ? "#FFFFFF" : "#4A7C90"} />
      </YStack>

      <YStack flex={1} gap={3}>
        <XStack items="center" justify="space-between" gap={8}>
          <Text fontFamily={unread ? "$semibold" : "$medium"} fontSize={13} flex={1}>
            {notification.title}
          </Text>
          {unread ? <YStack width={7} height={7} rounded={999} bg="$ji-orange-500" mt={4} /> : null}
        </XStack>

        <Text variant="subtitle" fontSize={12}>
          {notification.body}
        </Text>

        <Text variant="eyebrow" mt={4}>
          {relativeLabel(notification.createdAt)}
        </Text>
      </YStack>
    </XStack>
  );
}
