import Feather from "@expo/vector-icons/Feather";
import { ComponentProps, ReactNode } from "react";
import { Text, View } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";

import colors from "~/src/shared/theme/colors";

type ToastProps = { text1?: string };
type FeatherName = ComponentProps<typeof Feather>["name"];

export type ToastTone = "success" | "error" | "warning" | "info";

const TONES: Record<ToastTone, { color: string; icon: FeatherName }> = {
  success: { color: colors["ji-teal-500"], icon: "check" },
  error: { color: colors["ji-orange-500"], icon: "alert-circle" },
  warning: { color: colors["ji-amber-500"], icon: "alert-triangle" },
  info: { color: colors["ji-blue-800"], icon: "info" },
};

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

function toneRenderer(tone: ToastTone) {
  const { color, icon } = TONES[tone];
  return ({ text1 }: ToastProps) => (
    <ToastPill
      tone={color}
      icon={<Feather name={icon} size={14} color={colors["ji-white"]} />}
      text1={text1}
    />
  );
}

export const toastConfig = {
  success: toneRenderer("success"),
  error: toneRenderer("error"),
  warning: toneRenderer("warning"),
  info: toneRenderer("info"),
} satisfies ToastConfig;

type ShowToastArgs = {
  text: string;
  /** Circle color + icon. Defaults to `"success"`. */
  type?: ToastTone;
};

/** Single entry point for every toast: `showToast({ type: "error", text: "..." })`. */
export const showToast = ({ text, type = "success" }: ShowToastArgs) => {
  Toast.show({ type, text1: text });
};
