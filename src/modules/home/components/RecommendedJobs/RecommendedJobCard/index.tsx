import Feather from "@expo/vector-icons/Feather";
import { XStack, YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";
import { Job, getJobInitial } from "~/src/shared/domain/job";

type Props = {
  job: Job;
  onPress: (job: Job) => void;
};

export function RecommendedJobCard({ job, onPress }: Props) {
  return (
    <YStack
      width={252}
      rounded={26}
      p={20}
      style={{ backgroundColor: job.accent.background }}
      pressStyle={{ scale: 0.98 }}
      onPress={() => onPress(job)}>
      <XStack items="center" gap={9} mb={26}>
        <XStack flex={1} items="center" gap={9} style={{ minWidth: 0 }}>
          <YStack
            width={32}
            height={32}
            rounded={10}
            items="center"
            justify="center"
            style={{ backgroundColor: "rgba(255,255,255,0.16)" }}>
            <Text fontFamily="$bold" fontSize={11} color="$ji-white">
              {getJobInitial(job)}
            </Text>
          </YStack>
          <Text
            fontFamily="$semibold"
            fontSize={12.5}
            numberOfLines={1}
            style={{ color: "rgba(255,255,255,0.92)", flexShrink: 1 }}>
            {job.company}
          </Text>
        </XStack>

        <YStack
          px={9}
          py={5}
          rounded={8}
          style={{ backgroundColor: "rgba(255,255,255,0.14)", flexShrink: 0 }}>
          <Text fontFamily="$bold" fontSize={9.5} color="$ji-white" letterSpacing={0.4}>
            {job.platform.toUpperCase()}
          </Text>
        </YStack>
      </XStack>

      <Text
        fontFamily="$semibold"
        fontSize={21}
        lineHeight={25}
        letterSpacing={-0.6}
        color="$ji-white"
        numberOfLines={2}
        style={{ minHeight: 50 }}
        mb={8}>
        {job.title}
      </Text>

      <Text
        fontFamily="$medium"
        fontSize={12.5}
        style={{ color: "rgba(255,255,255,0.72)" }}
        mb={18}>
        {job.salaryLabel}
        {job.workModel ? ` · ${job.workModel}` : ""}
        {job.postedAtLabel ? ` · ${job.postedAtLabel}` : ""}
      </Text>

      <XStack items="center" gap={9}>
        <XStack flex={1} py={12} rounded={999} bg="$ji-white" items="center" justify="center">
          <Text fontFamily="$semibold" fontSize={13} color="$ji-navy-900">
            Ver vaga
          </Text>
        </XStack>
        <YStack
          width={42}
          height={42}
          rounded={999}
          items="center"
          justify="center"
          style={{ backgroundColor: "rgba(2,48,71,0.32)" }}>
          <Feather name="arrow-up-right" size={15} color="#FFFFFF" />
        </YStack>
      </XStack>
    </YStack>
  );
}
