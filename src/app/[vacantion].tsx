import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useMemo } from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

import useTheme from "~/src/shared/store/useTheme";
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
  } = useTheme();
  const { vacantion } = useLocalSearchParams<LocalParams>();

  const vacantionData = JSON.parse(vacantion) as IVacationProps;

  const isSaved = false;

  const { goBack } = useNavigation();

  const vacationInformations = useMemo(() => {
    return {
      location: vacantionData.vacantionLocation.split(",")[0],
      type:
        vacantionData.vacantionLocation.split(",")[0] === vacantionData.vacantionType.split(",")[0]
          ? null
          : vacantionData.vacantionType.split(",")[0],
      fullTime: "Hora integral",
    };
  }, [vacantionData]);

  return (
    <View className="flex flex-1 bg-background px-4 pt-8 dark:bg-background-dark">
      <View className="flex-row justify-between px-4">
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons
            name="arrow-back-ios"
            size={ICON_SIZE}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        <View className="flex-row gap-6">
          <TouchableOpacity>
            {isSaved ? (
              <FontAwesome
                name="bookmark"
                size={ICON_SIZE}
                color={theme === "dark" ? "white" : "black"}
              />
            ) : (
              <FontAwesome
                name="bookmark-o"
                size={ICON_SIZE}
                color={theme === "dark" ? "white" : "black"}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity>
            <AntDesign
              name="sharealt"
              size={ICON_SIZE}
              color={theme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View className="flex-row items-center gap-6 px-2 pb-4 pt-8">
          <Image
            className="h-20 w-20 rounded-full"
            source={{
              uri: isValidUrl(vacantionData.companyImage)
                ? (vacantionData.companyImage as string)
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s",
            }}
            resizeMode="stretch"
            alt="company_image"
          />

          <View className="flex-1">
            <View className="pb-2">
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                {vacantionData.companyName}
              </Text>
              <Text
                className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark"
                numberOfLines={2}>
                {vacantionData.vacationTitle}
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                {vacationInformations.location}
              </Text>

              {vacationInformations.type && (
                <Text className="rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                  {vacationInformations.type}
                </Text>
              )}

              <Text className="rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                Hora integral
              </Text>
            </View>

            <View className="flex-row items-center gap-2 pt-2">
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                Publicada há {vacantionData.createdAt}
              </Text>

              {LONG_LOGOS[`${vacantionData.platform}LongLogo` as keyof typeof LONG_LOGOS]}
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        className="-mx-[1rem]"
        contentContainerStyle={{
          gap: 8,
        }}>
        <View className="bg-foreground px-4 py-4 dark:bg-foreground-dark">
          <Text className="pb-4 font-roboto-bold text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Sobre a vaga
          </Text>

          <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
            {vacantionData.vacantionDescription || "Não foi possível buscar a descrição da vaga!"}
          </Text>
        </View>

        <View className="bg-foreground px-4 py-4 dark:bg-foreground-dark">
          <Text className="pb-4 font-roboto-bold text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Habilidades & Responsabilidades
          </Text>

          {vacantionData.vacantionRequirements.length === 0 ? (
            <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
              "Não foi possível buscar a descrição da vaga!
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
                <Text className="ml-2 font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
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
            <Text className="text-center font-roboto-medium text-xl text-fontDefault-dark">
              Acessar vaga
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
