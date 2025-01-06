import Feather from "@expo/vector-icons/Feather";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
        <Image
          className="h-12 w-12 rounded-full"
          source={{
            uri: "https://media.licdn.com/dms/image/v2/C4E03AQG1y-9alH9S7Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1655859794624?e=1738800000&v=beta&t=YxXkOHOHQZ22c55SW8T-AOcIMqzZ_iNDCbIeuBIWk9Y",
          }}
          alt="user_image"
        />

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
          Bem-Vindo,
        </Text>
        <Text className="font-roboto-semibold text-2xl text-fontSecondary dark:text-fontSecondary-dark">
          Thiago Lins
        </Text>
        {/* <Text className="font-roboto-semibold text-xl">Descubra novas vagas publicadas...</Text> */}
      </View>

      <View className="-mx-[1rem]">
        <FollowedByYou isLoading={isLoading} />
      </View>

      <RecentlyAdded />
    </View>
  );
}
