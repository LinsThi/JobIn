import { ScrollView } from "react-native";
import { YStack } from "tamagui";

import { JobApplyBar } from "../../components/JobApplyBar";
import { JobBenefitList } from "../../components/JobBenefitList";
import { JobDetailAbout } from "../../components/JobDetailAbout";
import { JobDetailHeader } from "../../components/JobDetailHeader";
import { JobDetailTabs } from "../../components/JobDetailTabs";
import { JobRequirementList } from "../../components/JobRequirementList";
import { jobDetailCopy } from "../../job-detail.constants";
import { useJobDetailScreen } from "./useJobDetailScreen";

import { Text } from "~/src/shared/components/ui/Text";

export function JobDetailScreen() {
  const { job, tab, setTab, saved, onToggleSave, onApply, goBack } = useJobDetailScreen();

  if (!job) {
    return (
      <YStack flex={1} bg="$background" items="center" justify="center" px={32} gap={8}>
        <Text variant="section">{jobDetailCopy.notFoundTitle}</Text>
        <Text variant="subtitle" style={{ textAlign: "center" }}>
          {jobDetailCopy.notFoundBody}
        </Text>
        <Text variant="action" color="$ji-teal-500" mt={8} onPress={goBack}>
          Voltar
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="$background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}>
        <JobDetailHeader job={job} saved={saved} onBack={goBack} onToggleSave={onToggleSave} />

        <YStack px={20} pt={20} gap={20}>
          <JobDetailTabs value={tab} onChange={setTab} />

          {tab === "about" ? <JobDetailAbout job={job} /> : null}
          {tab === "requirements" ? <JobRequirementList items={job.requirements} /> : null}
          {tab === "benefits" ? <JobBenefitList items={job.benefits} /> : null}
        </YStack>
      </ScrollView>

      <JobApplyBar disabled={!job.url} onApply={onApply} />
    </YStack>
  );
}

export default JobDetailScreen;
