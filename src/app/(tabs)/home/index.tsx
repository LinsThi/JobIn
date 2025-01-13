import Feather from "@expo/vector-icons/Feather";
import { Image, Text, TouchableOpacity, View } from "react-native";

import iconImg from "~/src/assets/icon.png";
import { FollowedByYou } from "~/src/components/Home/FollowedByYou";
import { RecentlyAdded } from "~/src/components/Home/RecentlyAdded";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import useTheme from "~/src/shared/store/useTheme";

export default function Home() {
  const {
    state: { theme },
    actions: { handleToggleTheme },
  } = useTheme();
  const {
    state: { haveALoading: isLoading },
  } = useBottomPlatform();

  return (
    <View className="flex flex-1 bg-background px-4 dark:bg-background-dark">
      <View className="flex flex-row items-center justify-between pb-8 pt-4">
        <Image className="h-14 w-14 rounded-full" source={iconImg} alt="app_image" />

        <TouchableOpacity onPress={handleToggleTheme}>
          <Feather
            name={theme === "dark" ? "moon" : "sun"}
            size={32}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <View className="flex">
        <Text className="font-roboto-medium text-2xl text-fontWelcome dark:text-fontWelcome-dark">
          Bem-Vindo(a),
        </Text>
        <Text className="font-roboto-semibold text-2xl text-fontSecondary dark:text-fontSecondary-dark">
          Descubra novas vagas
        </Text>
      </View>

      <View className="-mx-[1rem]">
        <FollowedByYou isLoading={isLoading} />
      </View>

      <RecentlyAdded />
    </View>
  );
}
