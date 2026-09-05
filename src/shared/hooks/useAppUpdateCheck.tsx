import Constants from "expo-constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import SpInAppUpdates, { IAUUpdateKind } from "sp-react-native-in-app-updates";

import { APP_UPDATE_CHANGELOG } from "~/src/shared/components/AppUpdateModal/changelog";
import { WhatsNewSection } from "~/src/shared/components/AppUpdateModal/WhatsNewSection";

/**
 * Checks Google Play (via the native In-App Update API — real Play Store
 * data, not a guess) for a newer published version than the one installed,
 * and resolves that version's entry in APP_UPDATE_CHANGELOG. Android only;
 * a no-op elsewhere. Runs once per app open.
 */
export function useAppUpdateCheck() {
  // TEMP preview: force a known changelog key. Revert both to real values
  // (false / undefined) once you're done previewing.
  const [visible, setVisible] = useState(false);
  const [storeVersion, setStoreVersion] = useState<string | undefined>(undefined);
  const inAppUpdates = useRef<SpInAppUpdates | undefined>(undefined);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    inAppUpdates.current = new SpInAppUpdates(__DEV__);
    const currentVersion = Constants.expoConfig?.version;

    inAppUpdates.current
      .checkNeedsUpdate(currentVersion ? { curVersion: currentVersion } : undefined)
      .then((result) => {
        if (result.shouldUpdate) {
          setStoreVersion(result.storeVersion);
          setVisible(true);
        }
      })
      // Play Store unreachable, app not installed via Play (e.g. a dev build),
      // etc. — fail silently, this is a soft nudge, never worth blocking on.
      .catch(() => undefined);
  }, []);

  const dismiss = useCallback(() => setVisible(false), []);

  const confirmUpdate = useCallback(() => {
    inAppUpdates.current
      ?.startUpdate({ updateType: IAUUpdateKind.FLEXIBLE })
      .catch(() => undefined);
    setVisible(false);
  }, []);

  const updateInfo = storeVersion ? APP_UPDATE_CHANGELOG[storeVersion] : undefined;
  // Optional (dismissible) unless a version explicitly opts out — matches the
  // pre-existing behavior for any version with no entry at all.
  const isOptionalToUpdate = updateInfo?.isOptionalToUpdate ?? true;

  return {
    visible,
    isOptionalToUpdate,
    whatsNew: <WhatsNewSection notes={updateInfo?.notes} storeVersion={storeVersion} />,
    dismiss,
    confirmUpdate,
  };
}
