import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useMemo } from "react";
import { Image, Linking, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";

import noImage from "~/src/assets/images/no_image.jpg";
import { ItemSeparatorComponent } from "~/src/shared/components/FlatList/ItemSeparatorComponent";
import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { LONG_LOGOS } from "~/src/shared/utils/platforms";
import { isValidUrl } from "~/src/shared/utils/url";

const ICON_SIZE = 28;

type LocalParams = {
  vacantion: string;
};

export default function Opportunity() {
  const {
    state: { theme },
    actions: { handleToggleTheme },
  } = useTheme();
  const {
    actions: { verifyIfVacantionIsSaved, handleSaveVacantion, handleUnsaveVacantion },
  } = useUserDetails();

  const { goBack } = useNavigation();
  const { vacantion } = useLocalSearchParams<LocalParams>();
  const vacantionData = JSON.parse(vacantion) as IVacationProps;

  const vacationInformations = useMemo(() => {
    return {
      location: vacantionData.vacantionLocation.split(",")[0],
      type:
        vacantionData.vacantionLocation.split(",")[0] === vacantionData.vacantionType.split(",")[0]
          ? null
          : vacantionData.vacantionType.split(",")[0],
      fullTime: "Hora integral",
      isSaved: verifyIfVacantionIsSaved(vacantionData),
      imageVacantion: isValidUrl(vacantionData.companyImage)
        ? { uri: vacantionData.companyImage }
        : noImage,
    };
  }, [vacantionData]);

  const sharingVacantion = async () => {
    await Share.share({
      message: `Se liga nessa vaga que eu encontrei no JobIn 🤭 \n\nLink: ${vacantionData.vacantionLink}`,
    });
  };

  return (
    <View className="flex flex-1 bg-background px-4 pt-8 dark:bg-background-dark">
      <View className="flex flex-col gap-6">
        <View className="flex-row justify-between px-4">
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons
              name="arrow-back-ios"
              size={ICON_SIZE}
              color={theme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>

          <View className="flex-row gap-6">
            <TouchableOpacity onPress={async () => sharingVacantion()}>
              <AntDesign
                name="sharealt"
                size={ICON_SIZE}
                color={theme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={
                vacationInformations.isSaved
                  ? () => handleUnsaveVacantion(vacantionData)
                  : () => handleSaveVacantion(vacantionData)
              }>
              <FontAwesome
                name={vacationInformations.isSaved ? "bookmark" : "bookmark-o"}
                size={ICON_SIZE}
                color={theme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleToggleTheme}>
              <Feather
                name={theme === "dark" ? "moon" : "sun"}
                size={32}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ItemSeparatorComponent />
      </View>

      <View className="flex-row items-center gap-6 px-4 pb-4 pt-8">
        <Image
          className="h-20 w-20 rounded-full"
          source={vacationInformations.imageVacantion}
          resizeMode="stretch"
          alt="company_image"
        />

        <View className="flex-1">
          <View className="pb-2">
            <Text className="font-inter-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
              {vacantionData.companyName}
            </Text>
            <Text
              className="font-inter-bold text-lg text-fontDefault dark:text-fontDefault-dark"
              numberOfLines={2}>
              {vacantionData.vacationTitle}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            <Text className="font-inter-regular rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
              {vacationInformations.location}
            </Text>

            {vacationInformations.type && (
              <Text className="font-inter-regular rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                {vacationInformations.type}
              </Text>
            )}

            <Text className="font-inter-regular rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
              Hora integral
            </Text>
          </View>

          <View className="flex-row items-center justify-between gap-2 pt-2">
            <Text className="font-inter-semi-bold text-base text-fontTertiary dark:text-fontTertiary-dark">
              Publicação: {vacantionData.createdAt}
            </Text>

            {LONG_LOGOS[`${vacantionData.platform}LongLogo` as keyof typeof LONG_LOGOS]}
          </View>
        </View>
      </View>

      <ScrollView
        className="-mx-[1rem]"
        contentContainerStyle={{
          gap: 8,
        }}>
        <View className="bg-foreground px-4 py-4 dark:bg-foreground-dark">
          <Text className="font-inter-bold pb-4 text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Sobre a vaga
          </Text>

          <Text className="font-inter-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
            {vacantionData.vacantionDescription || "Não foi possível buscar informações na vaga."}
          </Text>
        </View>

        <View className="bg-foreground px-4 py-4 dark:bg-foreground-dark">
          <Text className="font-inter-bold pb-4 text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Habilidades & Responsabilidades
          </Text>

          {vacantionData.vacantionRequirements.length === 0 ? (
            <Text className="font-inter-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
              Não foi possível buscar informações na vaga.
            </Text>
          ) : (
            vacantionData.vacantionRequirements.map((skill, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: "#dcdcdc",
                  }}
                />
                <Text className="font-inter-medium ml-2 text-base text-fontTertiary dark:text-fontTertiary-dark">
                  {skill}
                </Text>
              </View>
            ))
          )}
        </View>

        <View className="items-center py-4">
          <TouchableOpacity
            className="w-[70%] items-center justify-center rounded-xl bg-fontLink py-5 dark:bg-fontLink-dark"
            onPress={() => Linking.openURL(vacantionData.vacantionLink)}>
            <Text className="font-inter-medium text-center text-xl text-fontDefault-dark">
              Acessar vaga
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
