import Feather from "@expo/vector-icons/Feather";
import { XStack } from "tamagui";

import { searchCopy } from "../../search.copy";

import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  onBack: () => void;
};

export function SearchHeader({ onBack }: Props) {
  return (
    <XStack items="center" gap={12}>
      <IconButton onPress={onBack}>
        <Feather name="chevron-left" size={16} color="#023047" />
      </IconButton>

      <Text variant="section" fontSize={16}>
        {searchCopy.title}
      </Text>
    </XStack>
  );
}
