import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { YStack } from "tamagui";

import { AuthWave } from "../AuthWave";

import colors from "~/src/shared/theme/colors";

type Props = {
  children: ReactNode;
};

/**
 * Shell for the sign-in hero: white background, the full-bleed wave backdrop,
 * and a padded, keyboard-avoiding scroll area for the rest of the screen.
 * The `(auth)` counterpart to the shared `Screen` used by tab screens.
 */
export function SignInLayout({ children }: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors["ji-white"] }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        {/* Full-bleed backdrop — lives outside the padded content below so it spans edge to edge. */}
        <AuthWave />

        <YStack flex={1} style={{ paddingHorizontal: 26 }}>
          {children}
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
