import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

/** Single on-device key-value store backing every persisted zustand slice and Supabase auth. */
export const mmkvStorage = createMMKV({ id: "jobin-storage" });

/** zustand `persist` storage adapter. MMKV is synchronous, `StateStorage` allows that. */
export const zustandMMKVStorage: StateStorage = {
  getItem: (name) => mmkvStorage.getString(name) ?? null,
  setItem: (name, value) => mmkvStorage.set(name, value),
  removeItem: (name) => {
    mmkvStorage.remove(name);
  },
};

/**
 * Supabase `SupportedStorage` adapter. Its methods are typed to allow a sync
 * or async return, so MMKV's sync methods satisfy it as-is.
 */
export const supabaseMMKVStorage = {
  getItem: (key: string) => mmkvStorage.getString(key) ?? null,
  setItem: (key: string, value: string) => mmkvStorage.set(key, value),
  removeItem: (key: string) => {
    mmkvStorage.remove(key);
  },
};
