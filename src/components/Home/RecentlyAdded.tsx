import { Link } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { SkeletonCard } from "~/src/components/Home/components/SkeletonCard";
import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import { useQueryGetVacantions } from "~/src/shared/queries/useQueryGetVacations";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { isValidUrl } from "~/src/shared/utils/url";

export function RecentlyAdded() {
  const {
    state: { vacantionRequired },
  } = useUserDetails();
  const {
    actions: { handleChangeHaveALoading },
  } = useBottomPlatform();

  const { isLoading, data: vacantionData, isError } = useQueryGetVacantions(vacantionRequired);

  useEffect(() => {
    handleChangeHaveALoading();
  }, [isLoading]);

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
          data={vacantionData || Array.from({ length: 5 }, () => ({}) as IVacationProps)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) =>
            isLoading ? (
              <SkeletonCard />
            ) : (
              <Link
                href={{
                  pathname: "/[vacantion]",
                  params: { vacantion: JSON.stringify(item) },
                }}
                asChild>
                <TouchableOpacity className="mb-4 flex h-56 flex-row gap-4 rounded-lg border border-foreground bg-foreground p-4 dark:border-foreground-dark dark:bg-foreground-dark">
                  <Image
                    className="h-12 w-12"
                    source={{
                      uri: isValidUrl(item.companyImage)
                        ? (item.companyImage as string)
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s",
                    }}
                    resizeMode="stretch"
                    alt="icon_plataform"
                  />

                  <View className="flex flex-1 justify-between">
                    <View className="flex gap-2">
                      <View>
                        <Text
                          className="font-roboto-semibold text-fontDefault dark:text-xl dark:text-fontDefault-dark"
                          numberOfLines={1}>
                          {item.vacationTitle}
                        </Text>

                        <Text
                          className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark"
                          numberOfLines={1}>
                          {item.companyName || "Não informado"}
                        </Text>
                      </View>

                      <Text
                        className="font-roboto-regular text-base text-fontDefault dark:text-fontDefault-dark"
                        numberOfLines={3}>
                        {item.vacantionDescription}
                      </Text>
                    </View>

                    <View className="flex flex-1 flex-row items-end justify-end">
                      <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                        Hora integral •
                      </Text>
                      <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                        {" " + item.vacantionType}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
