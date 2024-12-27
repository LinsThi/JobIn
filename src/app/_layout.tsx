import "../../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppStatus from "~/src/shared/store/useAppStatus";
import useTheme from "~/src/shared/store/useTheme";

const { Screen } = Stack;

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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme === "dark" ? "#181829" : "#FFFFFF"} translucent />

      <Stack
        initialRouteName={alreadyOpenedApp ? "(tabs)" : "welcome"}
        screenOptions={{ headerShown: false }}>
        <Screen name="(tabs)" />
        <Screen name="welcome" />
      </Stack>
    </SafeAreaView>
  );
}
