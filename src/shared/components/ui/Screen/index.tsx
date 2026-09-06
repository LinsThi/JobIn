import { ReactNode, Ref } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

type Props = {
  children: ReactNode;
  /** Vertical gap between direct children. */
  gap?: number;
  scrollRef?: Ref<ScrollView>;
  /** Extra bottom padding on top of the tab-bar clearance. */
  extraBottomSpace?: number;
  /** Reserve space for the floating bottom tab bar. Off for screens outside `(tabs)`. */
  withTabBarClearance?: boolean;
};

const HORIZONTAL_PADDING = 20;
const TOP_PADDING = 24;
const TAB_BAR_CLEARANCE = 120;

export function Screen({
  children,
  gap = 28,
  scrollRef,
  extraBottomSpace = 0,
  withTabBarClearance = true,
}: Props) {
  const insets = useSafeAreaInsets();
  // The tab bar itself grows by the bottom inset (button navigation), so the
  // content it floats over has to clear that same amount.
  const clearance = withTabBarClearance ? TAB_BAR_CLEARANCE + insets.bottom : 0;

  return (
    <YStack flex={1} bg="$background">
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingTop: TOP_PADDING,
          paddingBottom: clearance + extraBottomSpace,
        }}>
        <YStack gap={gap}>{children}</YStack>
      </ScrollView>
    </YStack>
  );
}
