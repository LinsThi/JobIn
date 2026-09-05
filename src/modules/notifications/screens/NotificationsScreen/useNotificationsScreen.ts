import { useRouter } from "expo-router";
import { useCallback } from "react";

import {
  useClearAllNotifications,
  useMarkNotificationRead,
  useNotifications,
  useSendTestNotification,
} from "~/src/shared/queries/useNotifications";
import { NotificationDTO } from "~/src/shared/queries/useNotifications/types";

export function useNotificationsScreen() {
  const router = useRouter();
  const { notifications, unreadCount, isLoading } = useNotifications();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: sendTest, isPending: sendingTest } = useSendTestNotification();
  const { mutate: clearAll, isPending: clearingAll } = useClearAllNotifications();

  const onPressNotification = useCallback(
    (notification: NotificationDTO) => {
      if (!notification.readAt) markRead(notification.id);
    },
    [markRead]
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    notifications,
    unreadCount,
    loading: isLoading,
    onPressNotification,
    onSendTest: sendTest,
    sendingTest,
    onClearAll: clearAll,
    clearingAll,
    goBack,
  };
}
