import { XStack } from "tamagui";

import { searchCopy } from "../../search.copy";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  count: number;
  activeFilterCount: number;
};

export function SearchResultsHeader({ count, activeFilterCount }: Props) {
  return (
    <XStack items="center" justify="space-between">
      <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900">
        {searchCopy.resultsCount(count)}
      </Text>

      <Text variant="tag" fontSize={11.5} color="$ji-ink-4">
        {activeFilterCount > 0
          ? searchCopy.activeFiltersSummary(activeFilterCount)
          : searchCopy.allPlatformsSummary}
      </Text>
    </XStack>
  );
}
