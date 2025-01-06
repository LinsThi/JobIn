import { forwardRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { PLATFORMS } from "~/src/shared/utils/platforms";

export const BottomPlatform = forwardRef((_, ref) => {
  const {
    actions: { handleFollowPlatform, handleUnfollowPlatform, verifyIfPlatformIsFollowed },
  } = useUserDetails();

  const {
    state: { theme },
  } = useTheme();

  return (
    <BottomSheet
      hasDraggableIcon
      ref={ref}
      height={300}
      sheetBackgroundColor={theme === "dark" ? "#181829" : "#FFFFFF"}>
      <ScrollView className="flex rounded-lg pt-4" contentContainerClassName="pb-4">
        {Object.entries(PLATFORMS).map(([_, currentPlatform]) => {
          const isFollowed = verifyIfPlatformIsFollowed(currentPlatform);
          const functionToCall = isFollowed ? handleUnfollowPlatform : handleFollowPlatform;

          return (
            <TouchableOpacity
              key={currentPlatform.name}
              onPress={() => functionToCall(currentPlatform)}
              className={`flex flex-row items-center p-4 ${isFollowed ? "bg-backgroundDetailsVacantion dark:bg-backgroundDetailsVacantion-dark" : "transparent"} w-full gap-4`}>
              <Image
                className="h-12 w-12 rounded-full"
                source={{ uri: currentPlatform.shortLogo }}
              />
              <Text className="rounded-tl font-roboto-bold text-xl">{currentPlatform.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
});
