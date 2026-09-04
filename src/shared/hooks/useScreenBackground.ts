import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { useSafeAreaBackground } from "~/src/shared/store/useSafeAreaBackground";

/**
 * Paints the root SafeAreaView's top inset `color` while this screen is
 * focused, restoring the app default when focus moves away.
 *
 * Uses focus rather than mount/unmount: stacked screens stay mounted
 * underneath the one pushed on top of them, so an unmount-cleanup would fire
 * at the wrong time (e.g. resetting the color for a screen still visible
 * beneath the one just popped).
 */
export function useScreenBackground(color: string) {
  const setBackgroundColor = useSafeAreaBackground((store) => store.actions.setBackgroundColor);
  const resetBackgroundColor = useSafeAreaBackground((store) => store.actions.resetBackgroundColor);

  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(color);
      return () => resetBackgroundColor();
    }, [color, setBackgroundColor, resetBackgroundColor])
  );
}
