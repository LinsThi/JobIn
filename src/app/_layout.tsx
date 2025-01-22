// import "react-native-gesture-handler";
import "react-native-reanimated";
import "../../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { BottomPlatform } from "~/src/shared/components/BottomPlatform";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { ModalRemove } from "~/src/shared/components/ModalRemove";
import { ModalVacantion } from "~/src/shared/components/ModalVacantion";
import useAppStatus from "~/src/shared/store/useAppStatus";
import useTheme from "~/src/shared/store/useTheme";
import { toastConfig } from "~/src/shared/utils/toast";

const { Screen } = Stack;

const queryClient = new QueryClient();

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();
  const {
    state: { alreadyOpenedApp },
  } = useAppStatus();
  const {
    actions: { addBottomSheetRef },
  } = useBottomPlatform();

  const {
    state: { theme },
  } = useTheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (bottomSheetRef.current) {
      addBottomSheetRef(bottomSheetRef);
    }
  }, [bottomSheetRef]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 10 }}
        className="bg-background dark:bg-background-dark">
        <StatusBar backgroundColor={theme === "dark" ? "#181829" : "#FFFFFF"} translucent />

        <ModalVacantion />
        <ModalRemove />
        <BottomPlatform ref={bottomSheetRef} />

        <Stack
          initialRouteName={alreadyOpenedApp ? "(tabs)" : "welcome"}
          screenOptions={{ headerShown: false }}>
          <Screen name="(tabs)" />
          <Screen name="welcome" />
          <Screen name="splash" />
        </Stack>
      </SafeAreaView>

      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
