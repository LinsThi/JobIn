import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import ListEmptySVG from "~/src/assets/svg/images/list_empty.svg";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { ListEmptyComponent } from "~/src/shared/components/FlatList/ListEmptyComponent";
import { Loading } from "~/src/shared/components/Loading";
import { useQueryGetVacantionsAddRecently } from "~/src/shared/queries/useQueryGetVacantionsAddRecently";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";

const QUANTITY_PER_PAGE = 5;

export function RecentlyAdded() {
  const {
    state: { vacantionRequired, platformsFollowed },
  } = useUserDetails();
  const {
    actions: { handleChangeHaveALoading },
  } = useBottomPlatform();

  const { push } = useRouter();

  const {
    isLoading,
    data: vacantionData,
    isError,
    isRefetching,
  } = useQueryGetVacantionsAddRecently(vacantionRequired);

  const [displayedData, setDisplayedData] = useState<IVacationProps[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    handleChangeHaveALoading(isLoading || isRefetching);
  }, [isLoading, isRefetching]);

  useEffect(() => {
    if (vacantionData && vacantionData) {
      const newData = vacantionData.data.slice(0, page * QUANTITY_PER_PAGE);
      setDisplayedData(newData);
    }
  }, [vacantionData, page]);

  const loadMoreData = () => {
    if (!loadingMore && (vacantionData?.data.length ?? 0) > displayedData.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingMore(false);
      }, 1000);
    }
  };

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-center text-2xl text-fontDefault dark:text-fontDefault-dark">
            Não foi possível buscar as vagas!
          </Text>
          <Text className="text-lg text-fontDefault dark:text-fontDefault-dark">
            Por favor, tente novamente mais tarde.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={displayedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CardVacantion item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmptyComponent
            text={
              platformsFollowed.length === 0
                ? "Sem resultados para as plataformas selecionadas"
                : `Não foi encontrada nenhuma vaga para ${vacantionRequired}!`
            }
            Image={() => <ListEmptySVG width={200} height={200} />}
          />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <Loading /> : null}
      />
    );
  }, [
    isLoading,
    isError,
    vacantionData,
    platformsFollowed,
    vacantionRequired,
    displayedData,
    loadingMore,
  ]);

  return (
    <View className="mt-4 flex flex-1 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="font-inter-semi-bold text-lg text-fontDefault dark:text-fontDefault-dark">
          Adicionados recentemente
        </Text>

        <TouchableOpacity
          disabled={vacantionData?.data.length === 0 || isLoading}
          onPress={() =>
            push({
              pathname: "/skills",
              params: {
                skills: JSON.stringify(vacantionData?.rankedSkills),
              },
            })
          }>
          <Text
            className={`font-inter-semi-bold text-lg ${vacantionData?.data.length === 0 || isLoading ? "text-slate-200 opacity-50" : "text-fontLink dark:text-fontLink-dark"}`}>
            Ver resumo
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent}
    </View>
  );
}
