import { mmkvStorage } from "./mmkvStorage";

const DEVICE_ID_KEY = "jobin:deviceId";

function generateId(): string {
  const random = () => Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}${random()}${random()}`;
}

let cachedId: string | null = null;

/**
 * Opaque per-install id sent to the backend to tag notifications/searches.
 * Not a security credential — the backend already treats it as an
 * unauthenticated plain string, so it doesn't need to be cryptographically
 * random, just stable across app opens.
 */
export function getDeviceId(): string {
  if (cachedId) return cachedId;

  const existing = mmkvStorage.getString(DEVICE_ID_KEY);
  cachedId = existing ?? generateId();
  if (!existing) mmkvStorage.set(DEVICE_ID_KEY, cachedId);

  return cachedId;
}
