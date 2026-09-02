import { YStack } from "tamagui";

import { useSavedJobsScreen } from "./useSavedJobsScreen";
import { SavedJobsEmpty } from "../../components/SavedJobsEmpty";
import { savedCopy } from "../../saved.copy";

import { JobCard } from "~/src/shared/components/JobCard";
import { Screen } from "~/src/shared/components/ui/Screen";
import { Text } from "~/src/shared/components/ui/Text";

export function SavedJobsScreen() {
  const { savedJobs, count, openJob, goToSearch } = useSavedJobsScreen();

  return (
    <Screen gap={22}>
      <YStack gap={4}>
        <Text variant="titleLg">{savedCopy.title}</Text>
        <Text variant="subtitle">{savedCopy.countLabel(count)}</Text>
      </YStack>

      {count === 0 ? (
        <SavedJobsEmpty onSearch={goToSearch} />
      ) : (
        <YStack gap={11}>
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} onPress={openJob} />
          ))}
        </YStack>
      )}
    </Screen>
  );
}

export default SavedJobsScreen;
