import { XStack, YStack } from "tamagui";

import { SEARCH_PLATFORMS } from "../../search.constants";
import { searchCopy } from "../../search.copy";

import { Text } from "~/src/shared/components/ui/Text";
import { JobPlatformId, getPlatformMeta } from "~/src/shared/domain/job";

type Props = {
  completed: JobPlatformId[];
};

export function PlatformSearchStatus({ completed }: Props) {
  return (
    <YStack bg="$ji-white" borderWidth={1} borderColor="$ji-border-1" rounded={22} p={16} gap={14}>
      <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900">
        {searchCopy.consultingTitle}
      </Text>

      <YStack gap={12}>
        {SEARCH_PLATFORMS.map(({ id }) => {
          const meta = getPlatformMeta(id);
          const done = completed.includes(id);

          return (
            <XStack key={id} items="center" gap={10}>
              <YStack
                width={26}
                height={26}
                rounded={8}
                items="center"
                justify="center"
                style={{ backgroundColor: meta.color }}>
                <Text fontFamily="$bold" fontSize={9} color="$ji-white">
                  {meta.mono}
                </Text>
              </YStack>

              <Text flex={1} variant="cardMeta" color="$ji-navy-600">
                {meta.name}
              </Text>

              <Text variant="tag" fontSize={11} color={done ? "$ji-teal-500" : "$ji-ink-5"}>
                {done ? searchCopy.statusDone : searchCopy.statusSearching}
              </Text>
            </XStack>
          );
        })}
      </YStack>
    </YStack>
  );
}
