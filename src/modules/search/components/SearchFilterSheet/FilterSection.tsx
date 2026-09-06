import { XStack, YStack } from "tamagui";

import { FilterSectionProps } from "./types";

import { Text } from "~/src/shared/components/ui/Text";

export function FilterSection({ title, hint, children }: FilterSectionProps) {
  return (
    <YStack mb={22}>
      <XStack items="baseline" justify="space-between" mb={10}>
        <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900">
          {title}
        </Text>
        {hint ? (
          <Text variant="tag" color="$ji-ink-5">
            {hint}
          </Text>
        ) : null}
      </XStack>
      {children}
    </YStack>
  );
}
