import { XStack, YStack } from "tamagui";

import { searchCopy } from "../../search.copy";

import { SegmentedControl } from "~/src/shared/components/ui/SegmentedControl";
import { Text } from "~/src/shared/components/ui/Text";
import { SearchSort } from "~/src/shared/queries/useSearchJobs";

const SORT_ITEMS: readonly { key: SearchSort; label: string }[] = [
  { key: "recent", label: searchCopy.sort.recent },
  { key: "relevance", label: searchCopy.sort.relevance },
];

type Props = {
  count: number;
  activeFilterCount: number;
  sort: SearchSort;
  onChangeSort: (sort: SearchSort) => void;
};

export function SearchResultsHeader({ count, activeFilterCount, sort, onChangeSort }: Props) {
  return (
    <YStack gap={12}>
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

      <SegmentedControl items={SORT_ITEMS} value={sort} onChange={onChangeSort} />
    </YStack>
  );
}
