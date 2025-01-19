import { useMemo, useState } from "react";
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import { PlatformsFilter } from "./components/PlatformsFilter";

import FilterIcon from "~/src/assets/svg/icon/filter.svg";
import QuestionSVG from "~/src/assets/svg/question.svg";
import SearchInput from "~/src/components/SearchInput";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import { ListEmptyComponent } from "~/src/shared/components/FlatList/ListEmptyComponent";
import { useQuerySearchVacantion } from "~/src/shared/queries/useQuerySearchVacantion";
import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";

export default function SearchScreen() {
  const {
    state: { theme },
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
      <View className="flex gap-y-4">
        <Text className="font-inter-semibold text-lg text-fontSecondary dark:text-fontSecondary-dark">
          Descubra novas oportunidades
        </Text>

        <View className="flex w-full flex-row items-center gap-3">
          <View className="w-[85%]">
            <SearchInput
              value={searchValue}
              onChangeText={handleChangeSearch}
              functionToClear={handleClearSearch}
              functionToSearch={handleSearch}
            />
          </View>

          <TouchableOpacity onPress={handleOpenBottomPlatform}>
            <FilterIcon height={40} width={40} />
          </TouchableOpacity>
        </View>

        <PlatformsFilter />

        <FlatList
          data={dataToRender}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <CardVacantion cardIsLoading={isRefetching} item={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparatorComponent />}
          ListEmptyComponent={() => (
            <ListEmptyComponent
              text="Qual oportunidade você deseja buscar hoje?"
              Image={() => <QuestionSVG width={200} height={200} />}
            />
          )}
        />
      </View>
    </View>
  );
}
