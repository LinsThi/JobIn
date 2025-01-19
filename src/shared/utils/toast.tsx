import { Text, View } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";

import CheckSVG from "~/src/assets/svg/icon/check.svg";

export const toastConfig = {
  customToast: ({ text1 }: { text1?: string }) => (
    <View className="flex flex-row items-center justify-center gap-2 rounded-full bg-white p-4">
      <CheckSVG />
      <Text className="font-regular text-base">{text1 ?? ""}</Text>
    </View>
  ),
} satisfies ToastConfig;

export const showCustomToast = (text: string) => {
  Toast.show({
    type: "customToast",
    text1: text,
  });
};
