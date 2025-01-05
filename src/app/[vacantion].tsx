import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import useTheme from "~/src/shared/store/useTheme";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { PLATFORMS } from "~/src/shared/utils/platforms";
import { isValidUrl } from "~/src/shared/utils/url";

const ICON_SIZE = 28;

const OPPORTUNITY_DETAILS = {
  name: "Desenvolvedor Front-End",
  company: "Google",
  location: "São Paulo",
  job_location: "Remoto",
  job_hour: "Hora integral",
  job_description: `As a UX Designer, you’ll rely on user-centered design methods to craft industry-leading user experiences—from concept to execution. Like all of our UX jobs, you’ll collaborate with your design partners to leverage and evolve the Google design language to build beautiful, innovative inspired products.

One of our team's key focus areas is the Next Billion Users (NBU) where we uncover human-centered insights to build products that ensure Google’s goal rings true for everyone, everywhere. In this role, you will research users needs, contexts, aspirations, and challenges and create products that meet those needs.`,
  job_skills: [
    "Adapting to device, network, and user constraints",
    "Applied research and product R&D",
    "Problem-solving in emerging markets",
    "End-to-end design, prototyping, and user validation",
    "Strong verbal, written, and visual communication skills",
  ],

  icon_plataform: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
};

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

          <View>
            <View className="pb-2">
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                {vacantionData.companyName}
              </Text>
              <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
                {vacantionData.vacationTitle}
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                {vacantionData.vacantionLocation}
              </Text>

              <Text className="rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                {vacantionData.vacantionType}
              </Text>

              <Text className="rounded-md bg-backgroundDetailsVacantion p-1 text-white dark:to-backgroundDetailsVacantion-dark">
                Hora integral
              </Text>
            </View>

            <View className="flex-row items-center gap-2 pt-2">
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                Publicada há 9h
              </Text>

              {PLATFORMS[vacantionData.platform as keyof typeof PLATFORMS].longLogo}
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
            {vacantionData.vacantionDescription}
          </Text>
        </View>

        <View className="bg-foreground px-4 py-4 dark:bg-foreground-dark">
          <Text className="pb-4 font-roboto-bold text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Habilidades & Responsabilidades
          </Text>

          {vacantionData.vacantionRequirements.map((skill, index) => (
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
          ))}
        </View>

        <View className="items-center py-4">
          <TouchableOpacity className="w-[70%] items-center justify-center rounded-xl bg-fontLink py-5 dark:bg-fontLink-dark">
            <Text className="text-center font-roboto-medium text-xl text-fontDefault-dark">
              Acessar vaga
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
