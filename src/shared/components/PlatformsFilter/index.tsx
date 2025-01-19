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
      size: 12,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    };
  }, [theme]);

  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <TouchableOpacity
        className="bg-platformLabel dark:bg-platformLabel-dark flex-row items-center gap-2 rounded-xl px-4 py-2"
        onPress={() => handleUnfollowPlatform(item)}>
        <Text className="font-roboto-medium text-base text-fontDefault dark:text-fontDefault-dark">
          {item.name}
        </Text>

        <AntDesign
          name="close"
          size={IconProps.size}
          color={IconProps.color}
          className="pt-[0.2rem]"
        />
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
