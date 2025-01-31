import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import EmptySkills from "~/src/assets/svg/images/list_skills.svg";
import { PieChartSkills } from "~/src/shared/components/PieChartSkills";
import { RankedSkillProps } from "~/src/shared/queries/useQueryGetVacantionsAddRecently/types";
import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { SOFTS_SKILLS_TOPIC } from "~/src/shared/utils/softs_topics";

export default function SkillsScreen() {
  const {
    state: { theme },
    actions: { handleToggleTheme },
  } = useTheme();
  const {
    state: { vacantionRequired },
  } = useUserDetails();

  const { goBack } = useNavigation();

  const params = useLocalSearchParams();
  const skillsObject: RankedSkillProps[] = JSON.parse(params.skills as never);

  const [topicExpanded, setTopicExpanded] = useState<null | number>(null);

  function handleExpandTopic(index: number) {
    setTopicExpanded((prev) => (prev === index ? null : index));
  }

  function verifyIfTopicIsOpened(index: number) {
    return topicExpanded === index;
  }

  return (
    <View className="flex flex-1 gap-4 bg-background px-4 dark:bg-background-dark">
      <View className="flex-row justify-between px-2 pt-12">
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        <View className="flex-row gap-6">
          <TouchableOpacity onPress={handleToggleTheme}>
            <Feather
              name={theme === "dark" ? "moon" : "sun"}
              size={28}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-2">
        {skillsObject.length > 0 ? (
          <View>
            <View className="flex gap-2">
              <Text className="font-inter-semi-bold text-2xl text-fontDefault dark:text-fontDefault-dark">
                Resumo de habilidades para
              </Text>

              <Text className="font-inter-medium text-xl text-fontDefault dark:text-fontDefault-dark">
                {vacantionRequired}
              </Text>
            </View>

            <PieChartSkills dataToChart={skillsObject} />
          </View>
        ) : (
          <View className="items-center pb-4 pt-2">
            <View>
              <Text className="font-inter-medium text-2xl text-fontDefault dark:text-fontDefault-dark">
                Nenhuma habilidade encontrada
              </Text>

              <Text className="font-inter-regular text-base text-fontDefault dark:text-fontDefault-dark">
                Infelizmente, as oportunidades encontradas não informa as soft skills necessárias.
              </Text>
            </View>

            <EmptySkills width={200} height={200} />
          </View>
        )}

        <View className="flex-1 gap-2">
          {SOFTS_SKILLS_TOPIC.map((topic, index) => (
            <TouchableOpacity
              key={index}
              className="rounded-2xl bg-backgroundPlatformSelected px-5 py-4 shadow-md dark:bg-backgroundPlatformSelected-dark"
              onPress={() => handleExpandTopic(index)}>
              <View className="flex flex-row items-center justify-between">
                <Text className="flex-1  font-inter-medium text-lg text-fontDefault dark:text-fontDefault-dark">
                  {topic.name}
                </Text>

                {verifyIfTopicIsOpened(index) ? (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={24}
                    color={theme === "dark" ? "white" : "black"}
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color={theme === "dark" ? "white" : "black"}
                  />
                )}
              </View>

              {verifyIfTopicIsOpened(index) && (
                <Text className="mt-2 text-base text-fontSecondary dark:text-fontSecondary-dark">
                  {topic.descriptions}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
