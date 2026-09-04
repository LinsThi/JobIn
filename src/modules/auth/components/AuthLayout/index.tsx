import Feather from "@expo/vector-icons/Feather";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { YStack } from "tamagui";

import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  onBack?: () => void;
};

export function AuthLayout({ title, subtitle, children, onBack }: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5FAFC" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <YStack flex={1} px={24} pt={16} gap={28}>
        {onBack ? (
          <IconButton onPress={onBack}>
            <Feather name="chevron-left" size={16} color="#023047" />
          </IconButton>
        ) : null}

        <YStack gap={8}>
          <Text variant="display">{title}</Text>
          <Text variant="subtitle">{subtitle}</Text>
        </YStack>

        {children}
      </YStack>
    </KeyboardAvoidingView>
  );
}
