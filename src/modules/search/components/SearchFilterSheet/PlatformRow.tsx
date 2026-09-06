import Feather from "@expo/vector-icons/Feather";
import { XStack, YStack } from "tamagui";

import { searchCopy } from "../../search.copy";

import { PlatformRowProps } from "./types";

import { Text } from "~/src/shared/components/ui/Text";
import { getPlatformMeta } from "~/src/shared/domain/job";

export function PlatformRow({ id, speed, active, onPress }: PlatformRowProps) {
  const meta = getPlatformMeta(id);

  return (
    <XStack
      items="center"
      gap={12}
      px={14}
      py={12}
      rounded={16}
      bg={active ? "$ji-fill-accent" : "$ji-white"}
      borderWidth={1}
      borderColor={active ? "$ji-teal-500" : "$ji-border-2"}
      pressStyle={{ opacity: 0.8 }}
      onPress={onPress}>
      <YStack
        width={34}
        height={34}
        rounded={11}
        items="center"
        justify="center"
        style={{ backgroundColor: meta.color }}>
        <Text fontFamily="$bold" fontSize={11} color="$ji-white">
          {meta.mono}
        </Text>
      </YStack>

      <YStack flex={1}>
        <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900">
          {meta.name}
        </Text>
        <Text variant="tag" color="$ji-ink-4" mt={2}>
          {searchCopy.speedLabel[speed]}
        </Text>
      </YStack>

      <YStack
        width={20}
        height={20}
        rounded={7}
        items="center"
        justify="center"
        borderWidth={1.5}
        borderColor={active ? "$ji-teal-500" : "$ji-border-check"}
        bg={active ? "$ji-teal-500" : "transparent"}>
        {active ? <Feather name="check" size={11} color="#FFFFFF" /> : null}
      </YStack>
    </XStack>
  );
}
