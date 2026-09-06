import { forwardRef } from "react";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { ScrollView, Text } from "tamagui";

import { useBottomPlatform } from "~/src/shared/components/BottomPlatform/store/useBottomPlatform";
import useUserDetails from "~/src/shared/store/useUserDetails";

export const BottomPlatform = forwardRef<any>((_, ref) => {
  const {
    actions: { handleFollowPlatform, handleUnfollowPlatform, verifyIfPlatformIsFollowed },
  } = useUserDetails();
  const {
    actions: { handleCloseBottomPlatform },
  } = useBottomPlatform();

  return (
    <BottomSheet
      hasDraggableIcon
      ref={ref}
      height={300}
      sheetBackgroundColor="#FFFFFF">
      <ScrollView>
        <Text>Bottom Platform</Text>
      </ScrollView>
    </BottomSheet>
  );
});
