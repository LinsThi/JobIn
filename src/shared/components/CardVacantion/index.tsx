import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { SkeletonCard } from "~/src/components/Home/components/SkeletonCard";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { LONG_LOGOS } from "~/src/shared/utils/platforms";
import { isValidUrl } from "~/src/shared/utils/url";

type Props = {
  cardIsLoading: boolean;
  item: IVacationProps;
};

export function CardVacantion({ cardIsLoading, item }: Props) {
  if (cardIsLoading) {
    return <SkeletonCard />;
  }

  return (
    <Link
      href={{
        pathname: "/[vacantion]",
        params: { vacantion: JSON.stringify(item) },
      }}
      asChild>
      <TouchableOpacity className="mb-4 flex h-60 flex-row gap-4 rounded-lg border border-foreground bg-foreground p-4 dark:border-foreground-dark dark:bg-foreground-dark">
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
              {item.vacantionDescription || "Não foi possível buscar a descrição da vaga!"}
            </Text>
          </View>
          <View className="flex flex-1 pt-1">
            <View className="flex-1 flex-row justify-end">
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                Hora integral •
              </Text>
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                {" " + item.vacantionType.split(",")[0]}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {LONG_LOGOS[`${item.platform}LongLogo` as keyof typeof LONG_LOGOS]}
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                Publicada há {item.createdAt}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
