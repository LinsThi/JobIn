import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import { YStack } from "tamagui";

import splashSource from "~/src/assets/animations/JobIn Splash.mp4";
import { useSafeAreaBackground } from "~/src/shared/store/useSafeAreaBackground";

type Props = {
  /** Called once, either when the video finishes or if it fails/stalls. */
  onFinish: () => void;
  /**
   * Called once the player has actually buffered a frame and is about to
   * render it. `_layout.tsx` waits for this before hiding the native splash,
   * so the (icon) native splash never drops away before the video has
   * anything on screen to replace it with.
   */
  onReady?: () => void;
};

/** Safety net in case playback never fires `playToEnd` (bad file, stalled decode, ...). */
const FALLBACK_TIMEOUT_MS = 8000;
/** Safety net in case the player never reaches `readyToPlay` (bad file, slow device, ...). */
const READY_FALLBACK_MS = 3000;

/**
 * Brand splash video. Rendered by the `index` route (see `src/app/index.tsx`)
 * as its own page — not layered over the app — while fonts/auth are still
 * loading; the route only redirects into `(auth)`/`profile`/`(tabs)` once
 * both that loading and this video have finished. Muted so autoplay is never
 * blocked (web) and so a silent logo animation never surprises anyone with audio.
 */
export function SplashVideo({ onFinish, onReady }: Props) {
  const finishedRef = useRef(false);
  const readyRef = useRef(false);
  const { activeSafeArea, desactiveSafeArea } = useSafeAreaBackground((store) => store.actions);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
    activeSafeArea();
  };

  const ready = () => {
    if (readyRef.current) return;
    readyRef.current = true;
    onReady?.();
  };

  const player = useVideoPlayer(splashSource, (instance) => {
    instance.muted = true;
    instance.loop = false;
    instance.play();
  });

  useEventListener(player, "playToEnd", finish);
  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "readyToPlay") ready();
    if (status === "error") {
      ready();
      finish();
    }
  });

  useEffect(() => {
    desactiveSafeArea();
    const readyTimer = setTimeout(ready, READY_FALLBACK_MS);
    const finishTimer = setTimeout(finish, FALLBACK_TIMEOUT_MS);
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <YStack flex={1}>
      <StatusBar hidden />
      <VideoView
        player={player}
        style={{ flex: 1, height: "auto" }}
        contentFit="cover"
        nativeControls={false}
      />
    </YStack>
  );
}
