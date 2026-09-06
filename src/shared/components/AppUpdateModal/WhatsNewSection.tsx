import { XStack, YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

/** The "what's new" bullets for this release, or a generic fallback message. */
export function WhatsNewSection({
  notes,
  storeVersion,
}: {
  notes?: string[];
  storeVersion?: string;
}) {
  if (!notes?.length) {
    return (
      <Text variant="subtitle">
        {storeVersion
          ? `A versão ${storeVersion} do JobIn já está disponível na Play Store.`
          : "Uma nova versão do JobIn já está disponível na Play Store."}
      </Text>
    );
  }

  return (
    <YStack gap={8}>
      <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900">
        O que há de novo
      </Text>
      <YStack gap={6}>
        {notes.map((item) => (
          <XStack key={item} gap={8} items="flex-start">
            <Text variant="subtitle">•</Text>
            <Text variant="subtitle" style={{ flex: 1 }}>
              {item}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}
