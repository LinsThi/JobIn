import { forwardRef } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import useTheme from "~/src/shared/store/useTheme";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { PLATFORMS, SHORT_LOGOS } from "~/src/shared/utils/platforms";

export const BottomPlatform = forwardRef((_, ref) => {
  const {
    actions: { handleFollowPlatform, handleUnfollowPlatform, verifyIfPlatformIsFollowed },
  } = useUserDetails();
  const {
    actions: { handleCloseBottomPlatform },
  } = useBottomPlatform();

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
              onPress={() => {
                functionToCall(currentPlatform);
                handleCloseBottomPlatform();
              }}
              className={`flex flex-row items-center py-4 ${isFollowed ? "bg-backgroundPlatformSelected dark:bg-backgroundPlatformSelected-dark" : "transparent"} w-full gap-4 px-8`}>
              {SHORT_LOGOS[`${currentPlatform.shortLogo}` as keyof typeof SHORT_LOGOS]}

              <Text className="font-roboto-bold rounded-tl text-xl text-fontDefault dark:text-fontDefault-dark">
                {currentPlatform.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
});
