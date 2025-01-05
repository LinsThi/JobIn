import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function FollowedByYou() {
  const {
    state: { platformsFollowed },
  } = useUserDetails();
  const {
    actions: { handleOpenBottomPlatform },
  } = useBottomPlatform();

  return (
    <View className="mt-4 flex gap-2">
      <View className="flex flex-row justify-between px-4">
        <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
          Seguidos por você
        </Text>

        <TouchableOpacity onPress={handleOpenBottomPlatform}>
          <Text className="font-roboto-medium text-lg text-fontLink dark:text-fontLink-dark">
            Ver todos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={platformsFollowed}
        keyExtractor={(_, index) => index.toString()}
        className="bg-followedBackground dark:bg-followedBackground-dark"
        renderItem={({ item }) => (
          <View className="m-3 flex w-52 gap-4 rounded-lg bg-cardFollowed p-4 dark:bg-cardFollowed-dark">
            <View className="flex flex-row items-center justify-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                source={{ uri: item.shortLogo }}
                alt="company_icon"
              />

              <Text className="font-roboto-medium text-2xl text-fontDefault dark:text-fontDefault-dark">
                {item.name}
              </Text>
            </View>

            <Text className="text-center font-roboto-regular text-base text-fontTertiary dark:text-fontTertiary-dark">
              {item.description}
            </Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex h-16 pt-4">
            <Text className="px-[1rem] text-lg text-white">
              Você não segue nenhuma plataforma no momento.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
