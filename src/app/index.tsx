import { Redirect } from "expo-router";

import { SplashVideo } from "~/src/shared/components/SplashVideo";
import { useBootSplash } from "~/src/shared/store/useBootSplash";
import useUserDetails, { useUserDetailsHydrated } from "~/src/shared/store/useUserDetails";
import { isProfileComplete } from "~/src/shared/store/useUserDetails/@types";

/**
 * Boot gate. Plays the splash video as its own page while fonts/local storage
 * are still resolving in `_layout.tsx`, then redirects into the right stack
 * once BOTH that loading and the video itself have finished — the video never
 * ends up layered over an already-mounted profile/tabs screen.
 */
export default function Index() {
  const skills = useUserDetails((store) => store.state.skills);
  const trackedCategories = useUserDetails((store) => store.state.trackedCategories);
  const hydrated = useUserDetailsHydrated();
  const {
    state: { done: videoDone },
    actions: { setReady, setDone },
  } = useBootSplash((store) => store);

  if (!videoDone) {
    return (
      <SplashVideo
        onReady={setReady}
        onFinish={() => {
          setDone();
        }}
      />
    );
  }

  if (!hydrated) return null;

  if (!isProfileComplete({ skills, trackedCategories })) return <Redirect href="/profile" />;
  return <Redirect href="/(tabs)" />;
}
