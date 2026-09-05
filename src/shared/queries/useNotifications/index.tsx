import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Toast from "react-native-toast-message";

import { NotificationsResponse } from "./types";

import { apiServe } from "~/src/shared/services/api";
import { presentLocalNotification } from "~/src/shared/services/localNotifications";
import useAuth from "~/src/shared/store/useAuth";
import { showCustomToast } from "~/src/shared/utils/toast";

/** How often to re-poll while the tab/screen is mounted (30s — not urgent). */
const NOTIFICATIONS_POLL_MS = 30_000;

const notificationsKey = (userId: string | null) => ["notifications", userId] as const;

async function fetchNotifications(userId: string): Promise<NotificationsResponse> {
  const { data } = await apiServe.get<NotificationsResponse>("/notifications", {
    params: { userId },
  });
  return data;
}

/**
 * Shared polling query behind `useNotifications` and `useNotificationsWatcher` —
 * same queryKey in both, so this is one network subscription either way, but
 * keeping the fetch options in one place avoids the two hooks drifting apart.
 */
function useNotificationsQuery() {
  const userId = useAuth((store) => store.state.userId);

  return useQuery({
    queryKey: notificationsKey(userId),
    queryFn: () => fetchNotifications(userId as string),
    enabled: !!userId,
    staleTime: 10_000,
    refetchInterval: NOTIFICATIONS_POLL_MS,
  });
}

/**
 * Polls the backend-triggered notifications list (e.g. an async search that
 * found new matches — see `SearchCompletionNotifier` on the backend). `userId`
 * is sent unauthenticated, same pattern as `skills`/`categories` on the home
 * feed — see docs/SUPABASE_AUTH.md for why this backend has no auth yet.
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
  const userId = useAuth((store) => store.state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!userId) throw new Error("Not signed in");
      await apiServe.patch(`/notifications/${id}/read`, {}, { params: { userId } });
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<NotificationsResponse | undefined>(
        notificationsKey(userId),
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

/** Deletes every notification for the signed-in user and clears the cached list/count. */
export function useClearAllNotifications() {
  const userId = useAuth((store) => store.state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not signed in");
      await apiServe.delete("/notifications", { params: { userId } });
    },
    onSuccess: () => {
      queryClient.setQueryData<NotificationsResponse>(notificationsKey(userId), {
        data: [],
        unreadCount: 0,
      });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Não foi possível limpar as notificações" });
      console.log("Failed to clear notifications", error);
    },
  });
}

/** Fires `/notifications/test` for the signed-in user — dev-only test trigger. */
export function useSendTestNotification() {
  const userId = useAuth((store) => store.state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not signed in");
      await apiServe.post("/notifications/test", {}, { params: { userId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKey(userId) });
      showCustomToast("Notificação de teste enviada");
    },
    // A failed request here previously failed silently — the button's loading
    // spinner would just stop with no feedback at all.
    onError: (error) => {
      Toast.show({ type: "error", text1: "Não foi possível enviar a notificação" });
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
