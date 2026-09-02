import { ActivityIndicator, FlatList } from "react-native";
import { YStack } from "tamagui";

import { SEARCH_H_PADDING, SEARCH_TAB_BAR_CLEARANCE } from "../../search.constants";
import { searchCopy } from "../../search.copy";
import { SearchPlaceholder } from "../SearchPlaceholder";

import { JobCard } from "~/src/shared/components/JobCard";
import { Job } from "~/src/shared/domain/job";

type Props = {
  results: Job[];
  onPressJob: (job: Job) => void;
  onEndReached: () => void;
  loadingMore: boolean;
};

export function SearchResults({ results, onPressJob, onEndReached, loadingMore }: Props) {
  return (
    <FlatList
      data={results}
      style={{ flex: 1 }}
      keyExtractor={(job) => job.id}
      renderItem={({ item }) => <JobCard job={item} onPress={onPressJob} />}
      ItemSeparatorComponent={() => <YStack height={11} />}
      contentContainerStyle={{
        paddingHorizontal: SEARCH_H_PADDING,
        paddingBottom: SEARCH_TAB_BAR_CLEARANCE,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      ListEmptyComponent={
        <SearchPlaceholder title={searchCopy.emptyTitle} body={searchCopy.emptyBody} />
      }
      ListFooterComponent={
        loadingMore ? <ActivityIndicator style={{ marginTop: 18 }} color="#219EBC" /> : null
      }
    />
  );
}
