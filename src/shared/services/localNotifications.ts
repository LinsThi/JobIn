import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Local (on-device) notifications only — no push server, no device tokens.
 * Fired by the app itself when it notices a new backend-triggered notification
 * while running (see `useNotificationsWatcher`). Won't fire once the app is
 * fully killed; that needs real push (Expo push service + tokens), which this
 * app doesn't have yet.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let channelReady: Promise<void> | undefined;

async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;
  if (!channelReady) {
    channelReady = Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    }).then(() => undefined);
  }
  await channelReady;
}

let deniedThisSession = false;

/**
 * Asks for OS notification permission if not already granted/denied. Called
 * eagerly on Home open (see `useHomeScreen`) so the system prompt shows up
 * right when the user is looking at the app, rather than silently failing
 * later when a notification tries to fire while the app is backgrounded.
 */
export async function ensureNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (deniedThisSession) return false;

  const requested = await Notifications.requestPermissionsAsync();
  if (!requested.granted) deniedThisSession = true;
  return requested.granted;
}

export async function presentLocalNotification(title: string, body: string): Promise<void> {
  const granted = await ensureNotificationPermission();
  if (!granted) return;

  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
