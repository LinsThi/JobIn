import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

export default function Opportunity() {
  const isSaved = false;

  const { goBack } = useNavigation();

  return (
    <View className="flex flex-1 bg-background px-4 pt-8 dark:bg-background-dark">
      <View className="flex-row justify-between px-4">
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons name="arrow-back-ios" size={ICON_SIZE} color="white" />
        </TouchableOpacity>

        <View className="flex-row gap-6">
          <TouchableOpacity>
            {isSaved ? (
              <FontAwesome name="bookmark" size={ICON_SIZE} color="white" />
            ) : (
              <FontAwesome name="bookmark-o" size={ICON_SIZE} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity>
            <AntDesign name="sharealt" size={ICON_SIZE} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View className="flex-row items-center gap-6 px-2 py-8">
          <Image
            className="h-16 w-16 rounded-full"
            source={{
              uri: OPPORTUNITY_DETAILS.icon_plataform,
            }}
            alt="company_image"
          />

          <View>
            <View className="pb-2">
              <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
                {OPPORTUNITY_DETAILS.company}
              </Text>
              <Text className="font-roboto-medium text-lg text-fontDefault dark:text-fontDefault-dark">
                {OPPORTUNITY_DETAILS.name}
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="rounded-md bg-[#606060] p-1 text-fontTertiary dark:text-fontTertiary-dark">
                {OPPORTUNITY_DETAILS.location}
              </Text>

              <Text className="rounded-md bg-[#606060] p-1 text-fontTertiary dark:text-fontTertiary-dark">
                {OPPORTUNITY_DETAILS.job_location}
              </Text>

              <Text className="rounded-md bg-[#606060] p-1 text-fontTertiary dark:text-fontTertiary-dark">
                {OPPORTUNITY_DETAILS.job_hour}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        className="-mx-[1rem]"
        contentContainerStyle={{
          gap: 8,
        }}>
        <View className="bg-[#222232] px-4 py-4">
          <Text className="pb-4 font-roboto-bold text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Sobre a vaga
          </Text>

          <Text className="font-roboto-medium text-base text-fontTertiary dark:text-fontTertiary-dark">
            {OPPORTUNITY_DETAILS.job_description}
          </Text>
        </View>

        <View className="bg-[#222232] px-4 py-4">
          <Text className="pb-4 font-roboto-bold text-xl text-fontTertiary dark:text-fontTertiary-dark">
            Habilidades & Responsabilidades
          </Text>

          {OPPORTUNITY_DETAILS.job_skills.map((skill, index) => (
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
            <Text className="text-center font-roboto-medium text-xl text-fontDefault dark:text-fontDefault-dark">
              Acessar vaga
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
