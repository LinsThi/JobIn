import axios from "axios";
import Constants from "expo-constants";

const PROD_API_URL = "https://jobin-app.onrender.com";
const DEV_API_PORT = 3333;

/**
 * In development the backend runs on the same machine as the Metro bundler, so
 * we reuse the host the device is already connected to:
 * - LAN Wi-Fi:  `192.168.x.x` (from `hostUri`)
 * - simulator:  `localhost`
 * - USB device: `localhost`, via `npm run start:usb`
 *   (`adb reverse tcp:3333 tcp:3333` + `REACT_NATIVE_PACKAGER_HOSTNAME=localhost`)
 *
 * Android emulator can't reach the host loopback directly — start it with
 * `EXPO_PUBLIC_API_URL=http://10.0.2.2:3333`.
 */
function devApiUrl(): string | null {
  const hostUri = Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost;
  const host = hostUri?.split("@").pop()?.split(":")[0];

  return host ? `http://${host}:${DEV_API_PORT}` : null;
}

/**
 * Base URL for the JobIn backend. Precedence:
 * 1. `EXPO_PUBLIC_API_URL` (explicit override)
 * 2. the Metro bundler host on port 3333 (development)
 * 3. the production API
 */
const baseURL = process.env.EXPO_PUBLIC_API_URL ?? (__DEV__ ? devApiUrl() : null) ?? PROD_API_URL;

export const apiServe = axios.create({
  baseURL,
});
