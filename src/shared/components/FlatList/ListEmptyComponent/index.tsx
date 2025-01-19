import { ElementType } from "react";
import { Text, View } from "react-native";

type Props = {
  text: string;
  Image: ElementType;
  customClass?: string;
};

export function ListEmptyComponent({ text, Image, customClass }: Props) {
  return (
    <View className={`flex-1 items-center justify-center px-16 pt-8 ${customClass}`}>
      <Image />

      <Text className="font-inter-regular text-center text-xl text-fontDefault dark:text-fontDefault-dark">
        {text}
      </Text>
    </View>
  );
}
