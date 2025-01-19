import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import noImage from "~/src/assets/images/no_image.jpg";
import { useModalRemove } from "~/src/shared/components/ModalRemove/store/useModalRemove";
import { SkeletonCard } from "~/src/shared/components/SkeletonCard";
import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { LONG_LOGOS } from "~/src/shared/utils/platforms";
import { isValidUrl } from "~/src/shared/utils/url";

type Props = {
  cardIsLoading?: boolean;
  item: IVacationProps;
  showIconToSave?: boolean;
};

export function CardVacantion({ cardIsLoading = false, item, showIconToSave = false }: Props) {
  const {
    state: { theme },
  } = useTheme();
  const {
    actions: { verifyIfVacantionIsSaved, handleSaveVacantion },
  } = useUserDetails();
  const {
    actions: { handleOpenModalVacantion },
  } = useModalRemove();

  if (cardIsLoading) {
    return <SkeletonCard />;
  }

  const imageVacantion = isValidUrl(item.companyImage) ? { uri: item.companyImage } : noImage;

  return (
    <Link
      href={{
        pathname: "/[vacantion]",
        params: { vacantion: JSON.stringify(item) },
      }}
      asChild>
      <TouchableOpacity className="flex flex-row gap-4 p-4 dark:bg-foreground-dark">
        <Image
          className="h-14 w-14 rounded-full"
          source={imageVacantion}
          resizeMode="stretch"
          alt="icon_plataform"
        />

        <View className="flex flex-1">
          <View className="flex flex-row gap-2">
            <View className="flex flex-1 ">
              <Text
                className="font-inter-semibold text-lg text-fontDefault dark:text-fontDefault-dark"
                numberOfLines={1}>
                {item.vacationTitle}
              </Text>

              <Text
                className="font-inter-regular text-base text-fontDefault dark:text-fontDefault-dark"
                numberOfLines={1}>
                {item.companyName || "Não informado"}
              </Text>
            </View>

            {showIconToSave ? (
              <TouchableOpacity
                onPress={
                  verifyIfVacantionIsSaved(item)
                    ? () => handleOpenModalVacantion(item)
                    : () => handleSaveVacantion(item)
                }>
                <FontAwesome
                  name={verifyIfVacantionIsSaved(item) ? "bookmark" : "bookmark-o"}
                  size={30}
                  color={theme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <View className="flex-1 flex-row">
            <Text className="font-inter-semi-bold text-fontQuartenary dark:text-fontQuartenary-dark text-base">
              Hora integral
            </Text>
            <Text className="font-inter-semi-bold text-fontQuartenary dark:text-fontQuartenary-dark text-base">
              {item.vacantionType ? " • " + item.vacantionType.split(",")[0] : ""}
            </Text>
          </View>

          <View className="flex-row items-center justify-between gap-2 pt-2">
            <Text className="font-inter-semi-bold text-base text-fontTertiary dark:text-fontTertiary-dark">
              Publicação: {item.createdAt}
            </Text>

            {LONG_LOGOS[`${item.platform}LongLogo` as keyof typeof LONG_LOGOS]}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
