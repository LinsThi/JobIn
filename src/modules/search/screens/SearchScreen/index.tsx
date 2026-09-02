import { ScrollView } from "react-native";
import { YStack } from "tamagui";

import { PlatformSearchStatus } from "../../components/PlatformSearchStatus";
import { SearchBar } from "../../components/SearchBar";
import { SearchFilterSheet } from "../../components/SearchFilterSheet";
import { SearchHeader } from "../../components/SearchHeader";
import { SearchPlaceholder } from "../../components/SearchPlaceholder";
import { SearchResults } from "../../components/SearchResults";
import { SearchResultsHeader } from "../../components/SearchResultsHeader";
import { SEARCH_H_PADDING, SEARCH_TAB_BAR_CLEARANCE } from "../../search.constants";
import { searchCopy } from "../../search.copy";
import { useSearchScreen } from "./useSearchScreen";

export function SearchScreen() {
  const search = useSearchScreen();

  return (
    <>
      <YStack flex={1} bg="$background">
        <YStack px={SEARCH_H_PADDING} pt={24} pb={16} gap={16}>
          <SearchHeader onBack={search.goBack} />

          <SearchBar
            value={search.query}
            onChangeText={search.onChangeQuery}
            onSubmit={search.onSubmit}
            onOpenFilters={search.openFilters}
            activeFilterCount={search.activeFilterCount}
          />

          {search.phase === "done" ? (
            <SearchResultsHeader
              count={search.resultCount}
              activeFilterCount={search.activeFilterCount}
            />
          ) : null}
        </YStack>

        {search.phase === "idle" ? (
          <SearchPlaceholder title={searchCopy.idleTitle} body={searchCopy.idleBody} />
        ) : search.phase === "searching" ? (
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: SEARCH_H_PADDING,
              paddingBottom: SEARCH_TAB_BAR_CLEARANCE,
            }}>
            <PlatformSearchStatus completed={search.completedPlatforms} />
          </ScrollView>
        ) : (
          <SearchResults
            results={search.results}
            onPressJob={search.openJob}
            onEndReached={search.loadMore}
            loadingMore={search.loadingMore}
          />
        )}
      </YStack>

      <SearchFilterSheet
        open={search.filtersOpen}
        filters={search.filters}
        onClose={search.closeFilters}
        onApply={search.applyFilters}
      />
    </>
  );
}

export default SearchScreen;
