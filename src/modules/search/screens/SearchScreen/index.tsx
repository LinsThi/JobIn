import { ScrollView } from "react-native";
import { YStack } from "tamagui";

import { useSearchScreen } from "./useSearchScreen";
import { PlatformSearchStatus } from "../../components/PlatformSearchStatus";
import { SearchBar } from "../../components/SearchBar";
import { SearchFilterSheet } from "../../components/SearchFilterSheet";
import { SearchHeader } from "../../components/SearchHeader";
import { SearchResults } from "../../components/SearchResults";
import { SearchResultsHeader } from "../../components/SearchResultsHeader";

const H_PADDING = 20;
const TAB_BAR_CLEARANCE = 120;

export function SearchScreen() {
  const search = useSearchScreen();

  return (
    <>
      <YStack flex={1} bg="$background">
        <YStack px={H_PADDING} pt={24} pb={16} gap={16}>
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
              count={search.results.length}
              activeFilterCount={search.activeFilterCount}
            />
          ) : null}
        </YStack>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: H_PADDING,
            paddingBottom: TAB_BAR_CLEARANCE,
          }}>
          {search.phase === "searching" ? (
            <PlatformSearchStatus completed={search.completedPlatforms} />
          ) : (
            <SearchResults results={search.results} onPressJob={search.openJob} />
          )}
        </ScrollView>
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
