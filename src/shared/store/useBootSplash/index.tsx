import { create } from "zustand";

import { StorePropsBootSplash, initialStateBootSplash } from "./types";

/**
 * Bridges the splash video (rendered inside the `index` route, see
 * `src/app/index.tsx`) with `_layout.tsx`, which mounts it as a sibling
 * screen rather than a direct child. `_layout.tsx` waits for `ready` before
 * dismissing the native splash (so the icon never drops away before the
 * video has a frame to replace it with), and waits for `done` before
 * showing the auth-loading spinner over the app (so it never appears on
 * top of the splash video itself).
 */
export const useBootSplash = create<StorePropsBootSplash>((set) => ({
  state: initialStateBootSplash,
  actions: {
    setReady: () => {
      set((prev) => ({ state: { ...prev.state, ready: true } }));
    },
    setDone: () => {
      set((prev) => ({ state: { ...prev.state, done: true } }));
    },
  },
}));
