import { Redirect } from "expo-router";

import { SplashVideo } from "~/src/shared/components/SplashVideo";
import useAuth from "~/src/shared/store/useAuth";
import { useBootSplash } from "~/src/shared/store/useBootSplash";

/**
 * Boot gate. Plays the splash video as its own page while fonts/auth are
 * still resolving in `_layout.tsx`, then redirects into the right stack once
 * BOTH that loading and the video itself have finished — the video never
 * ends up layered over an already-mounted login/tabs screen.
 */
export default function Index() {
  const status = useAuth((store) => store.state.status);
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

  if (status === "signedOut") return <Redirect href="/(auth)/sign-in" />;
  if (status === "needsProfile") return <Redirect href="/profile" />;
  if (status === "ready") return <Redirect href="/(tabs)" />;

  return null;
}
