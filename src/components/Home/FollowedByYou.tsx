import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { SHORT_LOGOS } from "~/src/shared/utils/platforms";

type Props = {
  isLoading: boolean;
};

export function FollowedByYou({ isLoading }: Props) {
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
          Plataformas seguidas
        </Text>

        <TouchableOpacity onPress={handleOpenBottomPlatform} disabled={isLoading}>
          <Text
            className={`font-roboto-medium text-lg ${isLoading ? "text-slate-200 opacity-50" : "text-fontLink dark:text-fontLink-dark"}`}>
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
              {SHORT_LOGOS[`${item.shortLogo}` as keyof typeof SHORT_LOGOS]}

              <Text
                className="flex-1 font-roboto-medium text-2xl text-fontDefault dark:text-fontDefault-dark"
                numberOfLines={1}>
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
          <View className="flex h-28 items-center justify-center pt-4">
            <Text className="px-[2.7rem] text-center text-lg text-fontDefault dark:text-fontDefault-dark">
              Você ainda não segue nenhuma plataforma.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
