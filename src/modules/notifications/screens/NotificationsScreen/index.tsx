import Feather from "@expo/vector-icons/Feather";
import { ActivityIndicator } from "react-native";
import { XStack, YStack } from "tamagui";

import { useNotificationsScreen } from "./useNotificationsScreen";
import { NotificationItem } from "../../components/NotificationItem";
import { NotificationsEmpty } from "../../components/NotificationsEmpty";
import { notificationsCopy } from "../../notifications.copy";

import { Button } from "~/src/shared/components/ui/Button";
import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Screen } from "~/src/shared/components/ui/Screen";
import { Text } from "~/src/shared/components/ui/Text";

export function NotificationsScreen() {
  const {
    notifications,
    unreadCount,
    loading,
    onPressNotification,
    onSendTest,
    sendingTest,
    onClearAll,
    clearingAll,
    goBack,
  } = useNotificationsScreen();

  return (
    <Screen gap={22} withTabBarClearance={false} extraBottomSpace={24}>
      <IconButton tone="fill" onPress={goBack}>
        <Feather name="chevron-left" size={16} color="#023047" />
      </IconButton>

      <XStack items="center" justify="space-between">
        <YStack gap={4}>
          <Text variant="titleLg">{notificationsCopy.title}</Text>
          <Text variant="subtitle">{notificationsCopy.countLabel(unreadCount)}</Text>
        </YStack>

        {notifications.length > 0 ? (
          <IconButton onPress={onClearAll} disabled={clearingAll}>
            {clearingAll ? (
              <ActivityIndicator color="#023047" size="small" />
            ) : (
              <Feather name="trash-2" size={16} color="#023047" />
            )}
          </IconButton>
        ) : null}
      </XStack>

      {__DEV__ ? (
        <Button
          label={notificationsCopy.sendTestAction}
          variant="ghost"
          loading={sendingTest}
          onPress={onSendTest}
        />
      ) : null}

      {loading ? (
        <ActivityIndicator color="#219EBC" style={{ marginTop: 24 }} />
      ) : notifications.length === 0 ? (
        <NotificationsEmpty />
      ) : (
        <YStack gap={10}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={onPressNotification}
            />
          ))}
        </YStack>
      )}
    </Screen>
  );
}

export default NotificationsScreen;
