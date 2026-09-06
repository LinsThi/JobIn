import "react-native-reanimated";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { YStack } from "tamagui";

import { AppUpdateModal } from "~/src/shared/components/AppUpdateModal";
import { BottomPlatform } from "~/src/shared/components/BottomPlatform";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import TamaguiProvider from "~/src/shared/components/TamaguiProvider";
import { useNotificationsWatcher } from "~/src/shared/queries/useNotifications";
import { useBootSplash } from "~/src/shared/store/useBootSplash";
import { useSafeAreaBackground } from "~/src/shared/store/useSafeAreaBackground";
import useUserDetails, { useUserDetailsHydrated } from "~/src/shared/store/useUserDetails";
import { isProfileComplete } from "~/src/shared/store/useUserDetails/@types";
import theme from "~/src/shared/theme";
import { toastConfig } from "~/src/shared/utils/toast";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function LoadingOverlay() {
  return (
    <YStack
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      items="center"
      justify="center"
      bg="$background">
      <ActivityIndicator color={theme.colors.primary} />
    </YStack>
  );
}

/**
 * There is no login — everything is local. The navigator stays mounted at
 * all times (expo-router requirement); the brief window before MMKV finishes
 * hydrating `useUserDetails` is covered by an overlay in `RootLayout`.
 */
function RootNavigator() {
  const skills = useUserDetails((store) => store.state.skills);
  const trackedCategories = useUserDetails((store) => store.state.trackedCategories);
  const profileComplete = isProfileComplete({ skills, trackedCategories });
  useNotificationsWatcher();

  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Screen name="profile" options={{ animation: "slide_from_right" }} />

      <Stack.Protected guard={profileComplete}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="job/[id]" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="notifications" options={{ animation: "slide_from_right" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const {
    actions: { addBottomSheetRef },
  } = useBottomPlatform();

  const hydrated = useUserDetailsHydrated();
  const { isDisabled, backgroundColor } = useSafeAreaBackground((store) => store.state);
  const bottomSheetRef = useRef(null);
  const { ready: videoReady, done: videoDone } = useBootSplash((store) => store.state);

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,

    unset: Poppins_400Regular,
  });

  // Hand off from the native (icon) splash to the video as soon as the video has
  // a frame ready — NOT when it finishes, otherwise the native splash covers the
  // whole video and it's never seen (most visible in a release build, where the
  // native splash stays rock-solid until `hideAsync`).
  useEffect(() => {
    if ((fontsLoaded || fontError) && videoReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, videoReady]);

  useEffect(() => {
    if (bottomSheetRef.current) {
      addBottomSheetRef(bottomSheetRef);
    }
  }, [addBottomSheetRef]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider defaultTheme="light">
          <SafeAreaView
            style={{ flex: 1, backgroundColor, overflow: "hidden" }}
            edges={isDisabled ? [] : ["top"]}>
            <BottomPlatform ref={bottomSheetRef} />

            <RootNavigator />

            {!hydrated && videoDone ? <LoadingOverlay /> : null}
          </SafeAreaView>

          <Toast config={toastConfig} />
          <AppUpdateModal />
        </TamaguiProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
