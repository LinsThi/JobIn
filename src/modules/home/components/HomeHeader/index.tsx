import Feather from "@expo/vector-icons/Feather";
import { Image } from "react-native";
import { XStack, YStack } from "tamagui";

import appIcon from "~/src/assets/app_logo/icon.png";
import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  onPressBell: () => void;
  hasNotifications?: boolean;
};

export function HomeHeader({ onPressBell, hasNotifications = false }: Props) {
  return (
    <XStack items="center" justify="space-between">
      <XStack items="center" gap={10}>
        <Image source={appIcon} style={{ width: 38, height: 38, borderRadius: 12 }} />

        <YStack>
          <Text variant="brand">JobIn</Text>
          <Text variant="eyebrow" mt={3}>
            Várias plataformas, uma busca
          </Text>
        </YStack>
      </XStack>

      <IconButton onPress={onPressBell} badge={hasNotifications}>
        <Feather name="bell" size={17} color="#023047" />
      </IconButton>
    </XStack>
  );
}
