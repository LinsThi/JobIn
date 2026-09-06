import { YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  title: string;
  body: string;
};

export function SearchPlaceholder({ title, body }: Props) {
  return (
    <YStack flex={1} items="center" pt={16} px={28} gap={8}>
      <Text variant="section" style={{ textAlign: "center" }}>
        {title}
      </Text>
      <Text variant="subtitle" style={{ textAlign: "center" }}>
        {body}
      </Text>
    </YStack>
  );
}
