import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const FOLLOWED_BY_YOU = [
  {
    id: 0,
    name: "Linkedin",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
    description: "Plataforma oficial do Linkedin, feita para buscar novas vagas.",
  },
  {
    id: 1,
    name: "Linkedin",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
    description: "Plataforma oficial do Linkedin, feita para buscar novas vagas.",
  },
  {
    id: 2,
    name: "Linkedin",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
    description: "Plataforma oficial do Linkedin, feita para buscar novas vagas.",
  },
  {
    id: 3,
    name: "Linkedin",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
    description: "Plataforma oficial do Linkedin, feita para buscar novas vagas.",
  },
];

export function FollowedByYou() {
  return (
    <View className="mt-4 flex gap-2">
      <View className="flex flex-row justify-between px-4">
        <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
          Seguidos por você
        </Text>

        <TouchableOpacity>
          <Text className="font-roboto-medium text-lg text-fontLink dark:text-fontLink-dark">
            Ver todos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={FOLLOWED_BY_YOU}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="m-3 flex w-52 gap-4 rounded-lg bg-cardFollowed p-4 dark:bg-cardFollowed-dark">
            <View className="flex flex-row items-center justify-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                source={{ uri: item.icon }}
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
        className="bg-followedBackground dark:bg-followedBackground-dark"
      />
    </View>
  );
}
