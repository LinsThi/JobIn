import Feather from "@expo/vector-icons/Feather";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";

import colors from "~/src/shared/theme/colors";

type ToastProps = { text1?: string };

function ToastPill({ tone, icon, text1 }: { tone: string; icon: ReactNode; text1?: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        maxWidth: "88%",
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors["ji-border-2"],
        backgroundColor: colors["ji-white"],
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: colors["ji-navy-900"],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 20,
        elevation: 8,
      }}>
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tone,
        }}>
        {icon}
      </View>
      <Text
        style={{
          flexShrink: 1,
          fontFamily: "Poppins_500Medium",
          fontSize: 13,
          lineHeight: 18,
          color: colors["ji-navy-900"],
        }}>
        {text1 ?? ""}
      </Text>
    </View>
  );
}

export const toastConfig = {
  customToast: ({ text1 }: ToastProps) => (
    <ToastPill
      tone={colors["ji-teal-500"]}
      icon={<Feather name="check" size={14} color={colors["ji-white"]} />}
      text1={text1}
    />
  ),
  error: ({ text1 }: ToastProps) => (
    <ToastPill
      tone={colors["ji-orange-500"]}
      icon={<Feather name="alert-circle" size={14} color={colors["ji-white"]} />}
      text1={text1}
    />
  ),
} satisfies ToastConfig;

export const showCustomToast = (text: string) => {
  Toast.show({
    type: "customToast",
    text1: text,
  });
};
