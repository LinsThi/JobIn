import AntDesign from "@expo/vector-icons/AntDesign";
import { useMemo } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { PlataformProps } from "~/src/shared/utils/platforms";

type RenderItemProps = {
  item: PlataformProps;
};

export function PlatformsFilter() {
  const {
    state: { theme },
  } = useTheme();
  const {
    state: { platformsFollowed },
    actions: { handleUnfollowPlatform },
  } = useUserDetails();

  const IconProps = useMemo(() => {
    return {
      size: 18,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    };
  }, [theme]);

  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <TouchableOpacity
        className="flex-row items-center gap-2 rounded-xl bg-cardFollowed px-4 py-2 dark:bg-cardFollowed-dark"
        onPress={() => handleUnfollowPlatform(item)}>
        <Text className="font-roboto-medium text-base text-fontDefault dark:text-fontDefault-dark">
          {item.name}
        </Text>

        <AntDesign name="close" size={IconProps.size} color={IconProps.color} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={platformsFollowed}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
    />
  );
}
