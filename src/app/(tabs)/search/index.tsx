import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { FlatList, Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import { PlatformsFilter } from "./components/PlatformsFilter";

import QuestionSVG from "~/src/assets/svg/question.svg";
import SearchInput from "~/src/components/SearchInput";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { useQuerySearchVacantion } from "~/src/shared/queries/useQuerySearchVacantion";
import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";

export default function SearchScreen() {
  const {
    state: { theme },
    actions: { handleToggleTheme },
  } = useTheme();
  const {
    actions: { handleOpenBottomPlatform },
  } = useBottomPlatform();
  const {
    state: { platformsFollowed },
  } = useUserDetails();

  const [searchValue, setSearchValue] = useState("");

  const {
    data: vacantionData,
    refetch: handleSearchVacantions,
    isRefetching,
    isSuccess,
    isError,
  } = useQuerySearchVacantion(searchValue);

  const dataToRender = useMemo(() => vacantionData || [], [vacantionData]);
  const textoToShow = useMemo(() => {
    if (isError) {
      return "Não foi possível realizar a busca, tente novamente mais tarde.";
    }

    if (isSuccess) {
      return "Nenhuma vaga encontrada";
    }

    return "Qual vaga você deseja buscar?";
  }, [isError, isSuccess]);

  const handleChangeSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearch = async () => {
    if (platformsFollowed.length === 0) {
      return ToastAndroid.show(
        "Escolha uma plataforma antes de buscar uma vaga!",
        ToastAndroid.SHORT
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    await handleSearchVacantions();
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

          <TouchableOpacity onPress={handleOpenBottomPlatform}>
            <Ionicons name="filter-sharp" size={32} color={theme === "dark" ? "white" : "black"} />
          </TouchableOpacity>
        </View>

        <View>
          <PlatformsFilter />
        </View>

        <FlatList
          data={dataToRender}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <CardVacantion cardIsLoading={isRefetching} item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center">
              <QuestionSVG width={200} height={200} />

              <Text className="text-center text-xl text-fontDefault dark:text-fontDefault-dark">
                {textoToShow}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
