import { Stack } from "expo-router";
import { View } from "react-native";

const { Screen } = Stack;

export default function HomeLayout() {
  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Screen name="index" />
        <Screen name="[opportunity]" />
      </Stack>
    </View>
  );
}
