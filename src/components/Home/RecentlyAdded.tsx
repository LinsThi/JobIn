import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const RECENTLY_ADDED = [
  {
    id: 0,
    name: "Desenvolvedor Front-End",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real e você terá a oportunidade de trabalhar com uma equipe de desenvolvedores experientes.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    id: 1,
    name: "Desenvolvedor Front-End",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real e você terá a oportunidade de trabalhar com uma equipe de desenvolvedores experientes.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    id: 2,
    name: "Desenvolvedor Front-End",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real e você terá a oportunidade de trabalhar com uma equipe de desenvolvedores experientes.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    id: 3,
    name: "Desenvolvedor Front-End",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real e você terá a oportunidade de trabalhar com uma equipe de desenvolvedores experientes.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    id: 4,
    name: "Desenvolvedor Front-End",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real e você terá a oportunidade de trabalhar com uma equipe de desenvolvedores experientes.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    id: 5,
    name: "Desenvolvedor Front-End",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
  {
    id: 6,
    name: "Desenvolvedor Front-End - Ultimo",
    company: "Google",
    location: "São Paulo",
    job_location: "Remoto",
    job_hour: "Hora integral",
    job_description:
      "Necessário utilizar React Native, suas habilidades serão testadas em um projeto real e você terá a oportunidade de trabalhar com uma equipe de desenvolvedores experientes.",
    icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
  },
];

export function RecentlyAdded() {
  return (
    <View className="mt-4 flex flex-1 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
          Adicionados recentemente
        </Text>

        <TouchableOpacity>
          <Text className="font-roboto-medium text-lg text-fontLink dark:text-fontLink-dark">
            Ver todos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={RECENTLY_ADDED}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Link href="/alou" asChild>
            <TouchableOpacity className="mb-4 flex h-56 flex-row gap-4 rounded-lg border border-foreground bg-foreground p-4 dark:border-foreground-dark dark:bg-foreground-dark">
              <Image
                className="h-12 w-12"
                source={{ uri: item.icon_plataform }}
                alt="icon_plataform"
              />

              <View className="flex flex-1 justify-between">
                <View className="flex gap-2">
                  <View>
                    <Text className="font-roboto-semibold dark: text-xl text-fontDefault dark:text-fontDefault-dark">
                      {item.name}
                    </Text>
                    <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
                      {item.company}
                    </Text>
                  </View>

                  <Text
                    className="font-roboto-regular text-base text-fontDefault dark:text-fontDefault-dark"
                    numberOfLines={3}>
                    {item.job_description}
                  </Text>
                </View>

                <View className="flex flex-1 flex-row items-end justify-end ">
                  <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                    {item.job_hour} •
                  </Text>
                  <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                    {" " + item.job_location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
