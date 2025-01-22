import AntDesign from "@expo/vector-icons/AntDesign";
import { useMemo } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { PlataformProps } from "~/src/shared/utils/platforms";

type Props = {
  platformsToShow?: PlataformProps[];
};

type RenderItemProps = {
  item: PlataformProps;
};

export function PlatformsFilter({ platformsToShow }: Props) {
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
        className="flex-row items-center gap-2 rounded-xl bg-platformLabel px-4 py-2 dark:bg-platformLabel-dark"
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
      data={platformsToShow || platformsFollowed}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
    />
  );
}
