// import "react-native-gesture-handler";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { BottomPlatform } from "~/src/shared/components/BottomPlatform";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import TamaguiProvider from "~/src/shared/components/TamaguiProvider";
import { toastConfig } from "~/src/shared/utils/toast";

const { Screen } = Stack;

const queryClient = new QueryClient();

export default function RootLayout() {
  const {
    actions: { addBottomSheetRef },
  } = useBottomPlatform();


  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (bottomSheetRef.current) {
      addBottomSheetRef(bottomSheetRef);
    }
  }, [addBottomSheetRef]);

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider defaultTheme="light">
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: "#FFFFFF" }}>
          <StatusBar backgroundColor="#FFFFFF" translucent />

          <BottomPlatform ref={bottomSheetRef} />

          <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
            <Screen name="(tabs)" />
          </Stack>
        </SafeAreaView>

        <Toast config={toastConfig} />
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
