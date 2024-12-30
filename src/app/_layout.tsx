import "react-native-gesture-handler";
import "react-native-reanimated";
import "../../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ModalVacantion } from "~/src/shared/components/ModalVacantion";
import useAppStatus from "~/src/shared/store/useAppStatus";
import useTheme from "~/src/shared/store/useTheme";

const { Screen } = Stack;

const queryClient = new QueryClient();

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();
  const {
    state: { alreadyOpenedApp },
  } = useAppStatus();

  const {
    state: { theme },
  } = useTheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme === "dark" ? "#181829" : "#FFFFFF"} translucent />

        <ModalVacantion />

        <Stack
          initialRouteName={alreadyOpenedApp ? "(tabs)" : "welcome"}
          screenOptions={{ headerShown: false }}>
          <Screen name="(tabs)" />
          <Screen name="welcome" />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
