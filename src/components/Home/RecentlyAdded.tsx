import { useEffect, useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import ListEmptySVG from "~/src/assets/svg/list_empty.svg";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { CardVacantion } from "~/src/shared/components/CardVacantion";
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
        <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
          Adicionados recentemente
        </Text>

        <TouchableOpacity>
          <Text
            className={`font-roboto-medium text-lg ${isLoading ? "text-slate-200 opacity-50" : "text-fontLink dark:text-fontLink-dark"}`}>
            Ver todos
          </Text>
        </TouchableOpacity>
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
            <CardVacantion cardIsLoading={isLoading || isRefetching} item={item} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center">
              <ListEmptySVG width={200} height={200} />
              <Text className="text-center text-xl text-fontDefault dark:text-fontDefault-dark">
                {platformsFollowed.length === 0
                  ? "A lista de adicionados está vazia, pois nenhuma plataforma foi seguida."
                  : `Não foi encontrada nenhuma vaga para ${vacantionRequired}!`}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
