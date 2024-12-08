import "../../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import useTheme from "../shared/store/useTheme";

const { Screen } = Stack;

// export const unstable_settings = {
//   initialRouteName: "welcome",
// };

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

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
        //  initialRouteName="welcome"
        screenOptions={{ headerShown: false }}>
        <Screen name="(tabs)" />
        <Screen name="welcome" />
      </Stack>
    </SafeAreaView>
  );
}
