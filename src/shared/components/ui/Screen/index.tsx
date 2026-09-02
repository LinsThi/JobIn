import { ReactNode, Ref } from "react";
import { ScrollView } from "react-native";
import { YStack } from "tamagui";

type Props = {
  children: ReactNode;
  /** Vertical gap between direct children. */
  gap?: number;
  scrollRef?: Ref<ScrollView>;
  /** Extra bottom padding on top of the tab-bar clearance. */
  extraBottomSpace?: number;
};

const HORIZONTAL_PADDING = 20;
const TOP_PADDING = 24;
const TAB_BAR_CLEARANCE = 120;

export function Screen({ children, gap = 28, scrollRef, extraBottomSpace = 0 }: Props) {
  return (
    <YStack flex={1} bg="$background">
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingTop: TOP_PADDING,
          paddingBottom: TAB_BAR_CLEARANCE + extraBottomSpace,
        }}>
        <YStack gap={gap}>{children}</YStack>
      </ScrollView>
    </YStack>
  );
}
