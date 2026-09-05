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

import { AuthGate } from "~/src/shared/auth/AuthGate";
import { BottomPlatform } from "~/src/shared/components/BottomPlatform";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import TamaguiProvider from "~/src/shared/components/TamaguiProvider";
import { useProfile } from "~/src/shared/queries/useProfile";
import useAuth from "~/src/shared/store/useAuth";
import { useBootSplash } from "~/src/shared/store/useBootSplash";
import { useSafeAreaBackground } from "~/src/shared/store/useSafeAreaBackground";
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
 * Auth-aware navigator. `useProfile` runs here (inside the query provider) so its
 * effect can report profile completeness to `useAuth`, which drives these guards.
 * The navigator stays mounted at all times (expo-router requirement); the
 * `loading` state is covered by an overlay in `RootLayout`.
 */
function RootNavigator() {
  const status = useAuth((store) => store.state.status);
  useProfile();

  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Protected guard={status === "signedOut"}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={status === "needsProfile" || status === "ready"}>
        <Stack.Screen name="profile" options={{ animation: "slide_from_right" }} />
      </Stack.Protected>

      <Stack.Protected guard={status === "ready"}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="job/[id]" options={{ animation: "slide_from_right" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const {
    actions: { addBottomSheetRef },
  } = useBottomPlatform();

  const authStatus = useAuth((store) => store.state.status);
  const { isDisabled, backgroundColor } = useSafeAreaBackground((store) => store.state);
  const bottomSheetRef = useRef(null);
  const { done: videoDone } = useBootSplash((store) => store.state);

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,

    unset: Poppins_400Regular,
  });

  useEffect(() => {
    if ((fontsLoaded || fontError) && videoDone) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, videoDone]);

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
          <AuthGate />

          <SafeAreaView
            style={{ flex: 1, backgroundColor, overflow: "hidden" }}
            edges={isDisabled ? [] : ["top"]}>
            <BottomPlatform ref={bottomSheetRef} />

            <RootNavigator />

            {authStatus === "loading" && videoDone ? <LoadingOverlay /> : null}
          </SafeAreaView>

          <Toast config={toastConfig} />
        </TamaguiProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
