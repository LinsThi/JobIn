import { forwardRef } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

import useTheme from "~/src/shared/store/useTheme";
import { PlataformProps, PLATFORMS, SHORT_LOGOS } from "~/src/shared/utils/platforms";

type Props = {
  handleCloseBottomPlatform: () => void;
  handleChangeFollowPlatform: (platform: PlataformProps) => void;
  platformsSelected: PlataformProps[];
  verifyIfPlatformIsFollowed: (platform: PlataformProps) => boolean;
};

export const BottomPlatformSearch = forwardRef<BottomSheet, Props>(
  (
    {
      handleCloseBottomPlatform,
      handleChangeFollowPlatform,
      platformsSelected,
      verifyIfPlatformIsFollowed,
    },
    ref
  ) => {
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

            return (
              <TouchableOpacity
                key={currentPlatform.name}
                onPress={() => {
                  handleChangeFollowPlatform(currentPlatform);
                  handleCloseBottomPlatform();
                }}
                className={`flex flex-row items-center py-4 ${isFollowed ? "bg-backgroundPlatformSelected dark:bg-backgroundPlatformSelected-dark" : "transparent"} w-full gap-4 px-8`}>
                {SHORT_LOGOS[`${currentPlatform.shortLogo}` as keyof typeof SHORT_LOGOS]}

                <Text
                  className={`rounded-tl text-xl text-fontDefault dark:text-fontDefault-dark ${isFollowed ? "font-inter-semi-bold" : "font-inter-regular"}`}>
                  {currentPlatform.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </BottomSheet>
    );
  }
);
