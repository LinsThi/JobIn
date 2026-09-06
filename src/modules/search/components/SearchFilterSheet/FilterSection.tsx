import { YStack } from "tamagui";

import { FilterSectionProps } from "./types";

import { Text } from "~/src/shared/components/ui/Text";

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <YStack mb={22}>
      <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900" mb={10}>
        {title}
      </Text>
      {children}
    </YStack>
  );
}
