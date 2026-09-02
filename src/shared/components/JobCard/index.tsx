import Feather from "@expo/vector-icons/Feather";
import { Image } from "react-native";
import { XStack, YStack } from "tamagui";

import { useJobCard } from "./useJobCard";

import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Tag } from "~/src/shared/components/ui/Tag";
import { Text } from "~/src/shared/components/ui/Text";
import { Job, getJobInitial } from "~/src/shared/domain/job";
import { isValidUrl } from "~/src/shared/utils/url";

type Props = {
  job: Job;
  onPress?: (job: Job) => void;
  showSave?: boolean;
};

function PlatformChip({ mono, color }: { mono: string; color: string }) {
  return (
    <YStack
      width={14}
      height={14}
      rounded={5}
      items="center"
      justify="center"
      style={{ backgroundColor: color }}>
      <Text fontFamily="$bold" fontSize={6.5} lineHeight={7} color="$ji-white">
        {mono}
      </Text>
    </YStack>
  );
}

export function JobCard({ job, onPress, showSave = true }: Props) {
  const { saved, onToggleSave } = useJobCard(job);

  const hasImage = isValidUrl(job.companyImage ?? null);

  return (
    <YStack
      bg="$ji-white"
      borderWidth={1}
      borderColor="$ji-border-1"
      rounded={22}
      p={15}
      pressStyle={onPress ? { borderColor: "$ji-blue-300" } : undefined}
      onPress={onPress ? () => onPress(job) : undefined}>
      <XStack gap={12}>
        {hasImage ? (
          <Image
            source={{ uri: job.companyImage as string }}
            style={{ width: 44, height: 44, borderRadius: 14 }}
          />
        ) : (
          <YStack
            width={44}
            height={44}
            rounded={14}
            items="center"
            justify="center"
            style={{ backgroundColor: job.accent.background }}>
            <Text fontFamily="$bold" fontSize={14} color="$ji-white">
              {getJobInitial(job)}
            </Text>
          </YStack>
        )}

        <YStack flex={1}>
          <Text variant="cardTitle" numberOfLines={1}>
            {job.title}
          </Text>
          <Text variant="cardMeta" mt={4} numberOfLines={1}>
            {job.company} · {job.location}
          </Text>
        </YStack>

        {showSave ? (
          <IconButton size={34} tone={saved ? "fill" : "surface"} onPress={() => onToggleSave()}>
            <Feather name="bookmark" size={14} color={saved ? "#219EBC" : "#4A7C90"} />
          </IconButton>
        ) : null}
      </XStack>

      <XStack items="center" gap={6} mt={13} flexWrap="wrap">
        <Tag
          label={job.platform}
          tone="neutral"
          icon={<PlatformChip mono={job.platformMono} color={job.platformColor} />}
        />
        {job.workModel ? <Tag label={job.workModel} tone="fill" /> : null}
        {job.contractType ? <Tag label={job.contractType} tone="fill" /> : null}
        <Tag label={job.salaryLabel} tone="accent" />
        {job.postedAtLabel ? (
          <Text variant="tag" color="$ji-ink-5" ml="auto">
            {job.postedAtLabel}
          </Text>
        ) : null}
      </XStack>
    </YStack>
  );
}
