import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import SearchInput from "~/src/components/SearchInput";
import useTheme from "~/src/shared/store/useTheme";

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

export default function SearchScreen() {
  const {
    state: { theme },
    actions: { handleToggleTheme },
  } = useTheme();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearch = () => {
    setSearchResults(RECENTLY_ADDED);
  };

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

      <View className="flex gap-y-4">
        <Text className="font-roboto-semibold text-2xl text-fontSecondary dark:text-fontSecondary-dark">
          Vamos buscar novas vagas.
        </Text>

        <View className="flex w-full flex-row items-center gap-4">
          <View className="w-[85%]">
            <SearchInput
              value={searchValue}
              onChangeText={handleChangeSearch}
              functionToClear={handleClearSearch}
              functionToSearch={handleSearch}
            />
          </View>

          <TouchableOpacity>
            <Ionicons name="filter-sharp" size={32} color={theme === "dark" ? "white" : "black"} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-white">aqui vai ficar os filtros</Text>
        </View>

        <FlatList
          data={searchResults}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Link push href="/job" asChild>
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
    </View>
  );
}
