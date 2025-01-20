import { useEffect, useMemo } from "react";
import { FlatList, Text, View } from "react-native";

import ListEmptySVG from "~/src/assets/svg/images/list_empty.svg";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import { ListEmptyComponent } from "~/src/shared/components/FlatList/ListEmptyComponent";
import { Loading } from "~/src/shared/components/Loading";
import { useQueryGetVacantionsAddRecently } from "~/src/shared/queries/useQueryGetVacantionsAddRecently";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function RecentlyAdded() {
  const {
    state: { vacantionRequired, platformsFollowed },
  } = useUserDetails();
  const {
    actions: { handleChangeHaveALoading },
  } = useBottomPlatform();

  const {
    isLoading,
    data: vacantionData,
    isError,
    isRefetching,
  } = useQueryGetVacantionsAddRecently(vacantionRequired);

  useEffect(() => {
    handleChangeHaveALoading(isLoading || isRefetching);
  }, [isLoading, isRefetching]);

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
        data={vacantionData}
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
        ItemSeparatorComponent={() => <ItemSeparatorComponent />}
      />
    );
  }, [isLoading, isError, vacantionData, platformsFollowed, vacantionRequired]);

  return (
    <View className="mt-4 flex flex-1 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="font-inter-semi-bold text-lg text-fontDefault dark:text-fontDefault-dark">
          Adicionados recentemente
        </Text>
      </View>

      {renderContent}
    </View>
  );
}
