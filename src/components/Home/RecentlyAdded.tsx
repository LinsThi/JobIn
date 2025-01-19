import { useEffect, useMemo } from "react";
import { FlatList, Text, View } from "react-native";

import ListEmptySVG from "~/src/assets/svg/list_empty.svg";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import { ListEmptyComponent } from "~/src/shared/components/FlatList/ListEmptyComponent";
import { useQueryGetVacantionsAddRecently } from "~/src/shared/queries/useQueryGetVacantionsAddRecently";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";

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
    refetch: handleRefetchVacantion,
    isRefetching,
  } = useQueryGetVacantionsAddRecently(vacantionRequired);

  const dataToRender = useMemo(
    () => vacantionData || Array.from({ length: 5 }, () => ({}) as IVacationProps),
    [vacantionData]
  );

  useEffect(() => {
    if (isLoading) {
      return handleChangeHaveALoading(true);
    }

    if (isRefetching) {
      return handleChangeHaveALoading(true);
    }

    handleChangeHaveALoading(false);
  }, [isLoading, isRefetching]);

  useEffect(() => {
    handleRefetchVacantion();
  }, [platformsFollowed]);

  return (
    <View className="mt-4 flex flex-1 gap-2">
      <View className="flex flex-row justify-between">
        <Text className="font-inter-semi-bold text-lg text-fontDefault dark:text-fontDefault-dark">
          Adicionados recentemente
        </Text>
      </View>

      {isError ? (
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-center text-2xl text-fontDefault dark:text-fontDefault-dark">
            Não foi possível buscar as vagas!
          </Text>

          <Text className="text-lg text-fontDefault dark:text-fontDefault-dark">
            Por favor, tente novamente mais tarde.
          </Text>
        </View>
      ) : (
        <FlatList
          data={dataToRender}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CardVacantion cardIsLoading={isLoading || isRefetching} item={item} showIconToSave />
          )}
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
      )}
    </View>
  );
}
