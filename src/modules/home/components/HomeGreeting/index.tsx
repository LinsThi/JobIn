import { YStack } from "tamagui";

import { homeCopy } from "../../home.copy";

import { Text } from "~/src/shared/components/ui/Text";

export function HomeGreeting() {
  return (
    <YStack gap={6}>
      <Text variant="display">{homeCopy.greeting}</Text>
      <Text variant="subtitle">{homeCopy.subtitle}</Text>
    </YStack>
  );
}
