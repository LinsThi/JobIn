import Feather from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { jobDetailCopy } from "../../job-detail.constants";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  disabled?: boolean;
  onApply: () => void;
};

export function JobApplyBar({ disabled = false, onApply }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <YStack
      px={20}
      pt={14}
      pb={insets.bottom + 16}
      bg="$ji-white"
      borderTopWidth={1}
      borderColor="$ji-border-1">
      <XStack
        height={56}
        rounded={20}
        items="center"
        justify="center"
        gap={10}
        bg="$ji-teal-500"
        opacity={disabled ? 0.5 : 1}
        pressStyle={disabled ? undefined : { scale: 0.98 }}
        onPress={disabled ? undefined : onApply}>
        <Text variant="button">{jobDetailCopy.apply}</Text>
        <Feather name="arrow-up-right" size={16} color="#FFFFFF" />
      </XStack>
    </YStack>
  );
}
