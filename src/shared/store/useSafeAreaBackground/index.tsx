import { create } from "zustand";

import {
  DEFAULT_SAFE_AREA_BACKGROUND,
  initialStateSafeAreaBackground,
  StorePropsSafeAreaBackground,
} from "./types";

/**
 * Color the root `SafeAreaView` (top inset only, see `_layout.tsx`) paints
 * behind the status bar. Most screens sit on the app's default background, but
 * a few — the sign-in hero, for one — use their own; those set this instead
 * of leaving a mismatched strip above the notch. Prefer the `useScreenBackground`
 * hook over calling this store directly.
 */
export const useSafeAreaBackground = create<StorePropsSafeAreaBackground>((set) => ({
  state: initialStateSafeAreaBackground,
  actions: {
    setBackgroundColor: (color) => {
      set((prevState) => ({
        state: {
          ...prevState.state,
          backgroundColor: color,
        },
      }));
    },
    resetBackgroundColor: () => {
      set((prevState) => ({
        state: {
          ...prevState.state,
          backgroundColor: DEFAULT_SAFE_AREA_BACKGROUND,
        },
      }));
    },
    activeSafeArea: () => {
      set((prevState) => ({
        state: {
          ...prevState.state,
          isDisabled: false,
        },
      }));
    },
    desactiveSafeArea: () => {
      set((prevState) => ({
        state: {
          ...prevState.state,
          isDisabled: true,
        },
      }));
    },
  },
}));
