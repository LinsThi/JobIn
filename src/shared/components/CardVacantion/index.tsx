import Fontisto from "@expo/vector-icons/Fontisto";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import noImage from "~/src/assets/images/no_image.jpg";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import { useModalRemove } from "~/src/shared/components/ModalRemove/store/useModalRemove";
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

export function CardVacantion({ item, showIconToSave = false }: Props) {
  const {
    state: { theme },
  } = useTheme();
  const {
    actions: { verifyIfVacantionIsSaved, handleSaveVacantion },
  } = useUserDetails();
  const {
    actions: { handleOpenModalVacantion },
  } = useModalRemove();

  const imageVacantion = isValidUrl(item.companyImage) ? { uri: item.companyImage } : noImage;

  return (
    <Link
      href={{
        pathname: "/[vacantion]",
        params: { vacantion: JSON.stringify(item) },
      }}
      asChild>
      <TouchableOpacity>
        <ItemSeparatorComponent />

        <View className="flex flex-row gap-4 p-4 dark:bg-foreground-dark">
          <Image
            className="h-14 w-14 rounded-full border-[2px] border-borderForeground dark:border-foreground-dark"
            source={imageVacantion}
            resizeMode="stretch"
            alt="icon_plataform"
          />

          <View className="flex flex-1">
            <View className="flex flex-row gap-2">
              <View className="flex flex-1 ">
                <Text
                  className="font-inter-bold text-lg text-fontDefault dark:text-fontDefault-dark"
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
                  <Fontisto
                    name="bookmark-alt"
                    size={30}
                    color={theme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <View className="flex-1 flex-row">
              <Text
                className="font-inter-semi-bold text-base text-fontQuartenary dark:text-fontQuartenary-dark"
                numberOfLines={1}>
                Hora integral
              </Text>

              <Text
                className="flex-1 overflow-hidden text-ellipsis font-inter-semi-bold text-base text-fontQuartenary dark:text-fontQuartenary-dark"
                numberOfLines={1}>
                {" "}
                {item.vacantionType ? " • " + item.vacantionType.split(",")[0] : ""}
              </Text>
            </View>

            <View className="flex-col pt-2">
              <Text className="font-inter-semi-bold text-base text-fontTertiary dark:text-fontTertiary-dark">
                Publicação: {item.createdAt}
              </Text>

              {LONG_LOGOS[`${item.platform}LongLogo` as keyof typeof LONG_LOGOS]}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
