import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

/** Single on-device key-value store backing every persisted zustand slice. */
export const mmkvStorage = createMMKV({ id: "jobin-storage" });

/** zustand `persist` storage adapter. MMKV is synchronous, `StateStorage` allows that. */
export const zustandMMKVStorage: StateStorage = {
  getItem: (name) => mmkvStorage.getString(name) ?? null,
  setItem: (name, value) => mmkvStorage.set(name, value),
  removeItem: (name) => {
    mmkvStorage.remove(name);
  },
};
