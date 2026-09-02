import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "react-native";
import { XStack, YStack } from "tamagui";

import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Tag } from "~/src/shared/components/ui/Tag";
import { Text } from "~/src/shared/components/ui/Text";
import { Job, getJobInitial } from "~/src/shared/domain/job";
import { isValidUrl } from "~/src/shared/utils/url";

type Props = {
  job: Job;
  saved: boolean;
  onBack: () => void;
  onToggleSave: () => void;
};

export function JobDetailHeader({ job, saved, onBack, onToggleSave }: Props) {
  const hasImage = isValidUrl(job.companyImage ?? null);
  const chips = [job.workModel, job.contractType, job.seniority].filter(Boolean) as string[];

  return (
    <YStack
      bg="$ji-white"
      px={20}
      pt={12}
      pb={26}
      borderBottomWidth={1}
      borderColor="$ji-border-1"
      style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
      <XStack items="center" justify="space-between" mb={20}>
        <IconButton tone="fill" onPress={onBack}>
          <Feather name="chevron-left" size={16} color="#023047" />
        </IconButton>

        <Text variant="action" color="$ji-ink-4">
          {job.platform}
        </Text>

        <IconButton tone={saved ? "fill" : "surface"} onPress={onToggleSave}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={15}
            color={saved ? "#219EBC" : "#4A7C90"}
          />
        </IconButton>
      </XStack>

      <YStack items="center" gap={8}>
        {hasImage ? (
          <Image
            source={{ uri: job.companyImage as string }}
            style={{ width: 76, height: 76, borderRadius: 26 }}
          />
        ) : (
          <YStack
            width={76}
            height={76}
            rounded={26}
            items="center"
            justify="center"
            style={{ backgroundColor: job.accent.background }}>
            <Text fontFamily="$bold" fontSize={24} color="$ji-white">
              {getJobInitial(job)}
            </Text>
          </YStack>
        )}

        <Text variant="titleLg" style={{ textAlign: "center" }} numberOfLines={3}>
          {job.title}
        </Text>

        <Text fontFamily="$medium" fontSize={13} color="$ji-navy-600">
          {job.company}
        </Text>

        <XStack items="center" gap={6}>
          <Feather name="map-pin" size={13} color="#4A7C90" />
          <Text fontFamily="$medium" fontSize={12} color="$ji-ink-4">
            {job.location}
          </Text>
        </XStack>

        <Text variant="money" mt={6}>
          {job.salaryLabel}
        </Text>

        {chips.length > 0 ? (
          <XStack items="center" justify="center" gap={7} flexWrap="wrap" mt={10}>
            {chips.map((chip) => (
              <Tag key={chip} label={chip} tone="neutral" radius={999} size="md" />
            ))}
          </XStack>
        ) : null}
      </YStack>
    </YStack>
  );
}
