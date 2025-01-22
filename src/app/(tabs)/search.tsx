import { useEffect, useRef, useState } from "react";
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

import FilterIcon from "~/src/assets/svg/icon/filter.svg";
import QuestionSVG from "~/src/assets/svg/images/list_question.svg";
import { BottomPlatformSearch } from "~/src/shared/components/BottomPlatformSearch";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import { ListEmptyComponent } from "~/src/shared/components/FlatList/ListEmptyComponent";
import { Loading } from "~/src/shared/components/Loading";
import { PlatformsFilter } from "~/src/shared/components/PlatformsFilter";
import SearchInput from "~/src/shared/components/SearchInput";
import { useQuerySearchVacantion } from "~/src/shared/queries/useQuerySearchVacantion";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { PlataformProps } from "~/src/shared/utils/platforms";

const QUANTITY_PER_PAGE = 10;

export default function SearchScreen() {
  const {
    state: { platformsFollowed },
  } = useUserDetails();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [searchValue, setSearchValue] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlataformProps[]>(platformsFollowed);
  const [displayedData, setDisplayedData] = useState<IVacationProps[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    data: vacantionData,
    refetch: handleSearchVacantions,
    isRefetching,
    isLoading,
  } = useQuerySearchVacantion(searchValue, selectedPlatforms);

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

    if (searchValue.length < 2) {
      return ToastAndroid.show("Digite uma oportunidade válida!", ToastAndroid.SHORT);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    await handleSearchVacantions();
  };

  useEffect(() => {
    if (vacantionData) {
      const newData = vacantionData.slice(0, page * QUANTITY_PER_PAGE);
      setDisplayedData(newData);
    }
  }, [vacantionData, page]);

  const loadMoreData = () => {
    if (!loadingMore && vacantionData?.length > displayedData.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingMore(false);
      }, 1000);
    }
  };

  const handleOpenBottomPlatform = () => {
    bottomSheetRef.current?.show();
  };

  const handleChangeFollowPlatform = (platform: PlataformProps) => {
    setSelectedPlatforms((prevState) => {
      if (verifyIfPlatformIsFollowed(platform)) {
        return prevState.filter((currentPlatform) => currentPlatform.name !== platform.name);
      }

      return [...prevState, platform];
    });
  };

  const verifyIfPlatformIsFollowed = (platform: PlataformProps) => {
    return selectedPlatforms.some((currentPlatform) => currentPlatform.name === platform.name);
  };

  return (
    <View className="flex flex-1 bg-background px-4 dark:bg-background-dark">
      <View className="flex flex-1 gap-4">
        <View className="gap-4">
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
                placeholder="Buscar..."
              />
            </View>

            <TouchableOpacity onPress={handleOpenBottomPlatform}>
              <FilterIcon height={40} width={40} />
            </TouchableOpacity>
          </View>

          <PlatformsFilter platformsToShow={selectedPlatforms} />
        </View>

        <View className="flex-1">
          {isLoading || isRefetching ? (
            <Loading />
          ) : (
            <FlatList
              className="mt-2"
              data={displayedData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <CardVacantion item={item} />}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ItemSeparatorComponent />}
              ListEmptyComponent={() => (
                <ListEmptyComponent
                  text="Qual oportunidade você deseja buscar hoje?"
                  Image={() => <QuestionSVG width={200} height={200} />}
                />
              )}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loadingMore ? <Loading /> : null}
            />
          )}
        </View>
      </View>

      <BottomPlatformSearch
        ref={bottomSheetRef}
        handleCloseBottomPlatform={() => bottomSheetRef.current?.close()}
        platformsSelected={selectedPlatforms}
        handleChangeFollowPlatform={handleChangeFollowPlatform}
        verifyIfPlatformIsFollowed={verifyIfPlatformIsFollowed}
      />
    </View>
  );
}
