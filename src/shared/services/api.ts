import axios from "axios";
import Constants from "expo-constants";

const PROD_API_URL = "https://job-in-back-end.vercel.app";
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

console.log(`[api] base URL: ${baseURL}`);

// Full request/response tracing in the Metro console. Enabled in dev, or in any
// build via `EXPO_PUBLIC_API_DEBUG=true` — useful to confirm on a device/APK
// whether calls are even reaching the backend and what it answers.
const DEBUG = __DEV__ || process.env.EXPO_PUBLIC_API_DEBUG === "true";

function shortBody(data: unknown): unknown {
  if (Array.isArray(data)) return `Array(${data.length})`;
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.data)) {
      return { ...record, data: `Array(${record.data.length})` };
    }
  }
  return data;
}

if (DEBUG) {
  apiServe.interceptors.request.use((config) => {
    (config as { metadata?: { start: number } }).metadata = { start: Date.now() };
    // `getUri` serialises `params` the same way axios will on the wire, so the
    // logged line is the exact URL the backend receives (query string included).
    const url = apiServe.getUri(config);
    console.log(`[api] → ${config.method?.toUpperCase()} ${url}`);
    return config;
  });
}

// Surface why a request failed in the Metro console — otherwise a network error
// on a physical device (wrong LAN host, firewall blocking :3333) only shows up
// as a generic "Não foi possível..." toast with no trace.
apiServe.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      const { config, status, data } = response;
      const start = (config as { metadata?: { start: number } }).metadata?.start;
      const ms = start ? `${Date.now() - start}ms` : "";
      const url = apiServe.getUri(config);
      console.log(
        `[api] ← ${config.method?.toUpperCase()} ${url} ${status} ${ms}`.trimEnd(),
        shortBody(data)
      );
    }
    return response;
  },
  (error) => {
    const { config, response, message, code } = error ?? {};
    const url = config ? apiServe.getUri(config) : (config?.url ?? "");
    const start = (config as { metadata?: { start: number } })?.metadata?.start;
    const ms = start ? ` (${Date.now() - start}ms)` : "";

    if (response) {
      console.warn(
        `[api] ✗ ${config?.method?.toUpperCase()} ${url} -> ${response.status}${ms}`,
        response.data
      );
    } else {
      console.warn(
        `[api] ✗ ${config?.method?.toUpperCase()} ${url} failed${ms}: ${code ?? ""} ${message ?? ""}`.trim()
      );
    }

    return Promise.reject(error);
  }
);
