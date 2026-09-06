import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { NotificationsResponse } from "./types";

import { apiServe } from "~/src/shared/services/api";
import { getDeviceId } from "~/src/shared/services/deviceId";
import { presentLocalNotification } from "~/src/shared/services/localNotifications";
import { showToast } from "~/src/shared/utils/toast";

/** How often to re-poll while the tab/screen is mounted (30s — not urgent). */
const NOTIFICATIONS_POLL_MS = 30_000;

const notificationsKey = (deviceId: string) => ["notifications", deviceId] as const;

async function fetchNotifications(deviceId: string): Promise<NotificationsResponse> {
  const { data } = await apiServe.get<NotificationsResponse>("/notifications", {
    params: { userId: deviceId },
  });
  return data;
}

/**
 * Shared polling query behind `useNotifications` and `useNotificationsWatcher` —
 * same queryKey in both, so this is one network subscription either way, but
 * keeping the fetch options in one place avoids the two hooks drifting apart.
 */
function useNotificationsQuery() {
  const deviceId = getDeviceId();

  return useQuery({
    queryKey: notificationsKey(deviceId),
    queryFn: () => fetchNotifications(deviceId),
    staleTime: 10_000,
    refetchInterval: NOTIFICATIONS_POLL_MS,
  });
}

/**
 * Polls the backend-triggered notifications list (e.g. an async search that
 * found new matches — see `SearchCompletionNotifier` on the backend). The
 * device id is sent unauthenticated, same pattern as `skills`/`categories`
 * on the home feed — there is no account/login in this app.
 */
export function useNotifications() {
  const query = useNotificationsQuery();

  return {
    ...query,
    notifications: query.data?.data ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
  };
}

/** Marks one notification read and optimistically drops the unread count. */
export function useMarkNotificationRead() {
  const deviceId = getDeviceId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiServe.patch(`/notifications/${id}/read`, {}, { params: { userId: deviceId } });
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<NotificationsResponse | undefined>(
        notificationsKey(deviceId),
        (prev) => {
          if (!prev) return prev;
          const notification = prev.data.find((n) => n.id === id);
          if (!notification || notification.readAt) return prev;
          return {
            data: prev.data.map((n) =>
              n.id === id ? { ...n, readAt: new Date().toISOString() } : n
            ),
            unreadCount: Math.max(0, prev.unreadCount - 1),
          };
        }
      );
    },
  });
}

/** Deletes every notification for this device and clears the cached list/count. */
export function useClearAllNotifications() {
  const deviceId = getDeviceId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiServe.delete("/notifications", { params: { userId: deviceId } });
    },
    onSuccess: () => {
      queryClient.setQueryData<NotificationsResponse>(notificationsKey(deviceId), {
        data: [],
        unreadCount: 0,
      });
    },
    onError: (error) => {
      showToast({ type: "error", text: "Não foi possível limpar as notificações" });
      console.log("Failed to clear notifications", error);
    },
  });
}

/** Fires `/notifications/test` for this device — dev-only test trigger. */
export function useSendTestNotification() {
  const deviceId = getDeviceId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiServe.post("/notifications/test", {}, { params: { userId: deviceId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKey(deviceId) });
      showToast({ type: "success", text: "Notificação de teste enviada" });
    },
    // A failed request here previously failed silently — the button's loading
    // spinner would just stop with no feedback at all.
    onError: (error) => {
      showToast({ type: "error", text: "Não foi possível enviar a notificação" });
      console.log("Failed to send test notification", error);
    },
  });
}

/**
 * Mount once at the root (not per-screen — several screens read `useNotifications`
 * and would each fire duplicates). Shares the same query/cache key as
 * `useNotifications`, so this adds zero extra network calls; it only watches
 * for ids that weren't there on the previous poll and turns each into a local
 * (on-device) notification. The first successful fetch is a baseline, not a
 * batch of "new" notifications — otherwise every historical notification would
 * fire on cold start.
 */
export function useNotificationsWatcher() {
  const seenIds = useRef<Set<string> | null>(null);

  const query = useNotificationsQuery();

  const notifications = query.data?.data;

  useEffect(() => {
    if (!notifications) return;

    const ids = new Set(notifications.map((n) => n.id));
    const previouslySeen = seenIds.current;
    seenIds.current = ids;
    if (!previouslySeen) return;

    for (const notification of notifications) {
      if (!previouslySeen.has(notification.id)) {
        presentLocalNotification(notification.title, notification.body).catch(() => undefined);
      }
    }
  }, [notifications]);
}
