import { Text, View } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";

import CheckSVG from "~/src/assets/svg/icon/check.svg";

export const toastConfig = {
  customToast: ({ text1 }: { text1?: string }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: 999,
        borderWidth: 0.1,
        borderColor: "#000000",
        backgroundColor: "#FFFFFF",
        padding: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 8,
      }}>
      <CheckSVG />
      <Text style={{ fontSize: 16 }}>{text1 ?? ""}</Text>
    </View>
  ),
} satisfies ToastConfig;

export const showCustomToast = (text: string) => {
  Toast.show({
    type: "customToast",
    text1: text,
  });
};
