import Feather from "@expo/vector-icons/Feather";
import { ScrollView } from "react-native";
import { XStack, YStack } from "tamagui";

import { homeCopy } from "../../home.copy";

import { SectionHeader } from "~/src/shared/components/ui/SectionHeader";
import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  items: string[];
  onSelect: (term: string) => void;
  onClear: () => void;
};

export function RecentSearches({ items, onSelect, onClear }: Props) {
  if (items.length === 0) return null;

  return (
    <YStack>
      <SectionHeader
        title={homeCopy.recentTitle}
        actionLabel={homeCopy.recentClear}
        onAction={onClear}
        actionTone="muted"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -20 }}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {items.map((term) => (
          <XStack
            key={term}
            items="center"
            gap={7}
            px={14}
            py={9}
            rounded={999}
            bg="$ji-white"
            borderWidth={1}
            borderColor="$ji-border-2"
            pressStyle={{ borderColor: "$ji-teal-500" }}
            onPress={() => onSelect(term)}>
            <Feather name="clock" size={12} color="#175A72" />
            <Text variant="tag" color="$ji-navy-600">
              {term}
            </Text>
          </XStack>
        ))}
      </ScrollView>
    </YStack>
  );
}
