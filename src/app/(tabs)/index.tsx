import { Text, View } from "react-native";

import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { FollowedByYou } from "~/src/shared/components/FollowedByYou";
import { RecentlyAdded } from "~/src/shared/components/RecentlyAdded";

export default function Home() {
  const {
    state: { haveALoading: isLoading },
  } = useBottomPlatform();

  return (
    <View className="flex flex-1 bg-background px-4 dark:bg-background-dark">
      <View className="flex">
        <Text className="font-inter-semi-bold text-xl text-fontDefault dark:text-fontDefault-dark">
          Boas vindas!
        </Text>
        <Text className="font-inter-regular text-xl text-fontDefault dark:text-fontDefault-dark">
          Descubra novas oportunidades
        </Text>
      </View>

      <View className="-mx-[1rem]">
        <FollowedByYou isLoading={isLoading} />
      </View>

      <RecentlyAdded />
    </View>
  );
}
