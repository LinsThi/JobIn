import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex flex-1 items-center justify-center gap-2">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
