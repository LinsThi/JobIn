import { ActivityIndicator, View } from "react-native";

type Props = {
  color?: string;
  size?: "small" | "large";
};

export function Loading({ color = "#0000ff", size = "large" }: Props) {
  return (
    <View className="flex flex-1 items-center justify-center gap-2">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
