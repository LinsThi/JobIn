import { YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  mono: string;
  color: string;
};

/** Tiny platform glyph shown inside the platform `Tag` on a job card. */
export function PlatformChip({ mono, color }: Props) {
  return (
    <YStack
      width={14}
      height={14}
      rounded={5}
      items="center"
      justify="center"
      style={{ backgroundColor: color }}>
      <Text fontFamily="$bold" fontSize={6.5} lineHeight={7} color="$ji-white">
        {mono}
      </Text>
    </YStack>
  );
}
