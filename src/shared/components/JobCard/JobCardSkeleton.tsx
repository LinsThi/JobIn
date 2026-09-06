import { XStack, YStack } from "tamagui";

function Block({ width, height }: { width: number | string; height: number }) {
  return <YStack style={{ width, height }} rounded={8} bg="$ji-fill-2" />;
}

export function JobCardSkeleton() {
  return (
    <YStack bg="$ji-white" borderWidth={1} borderColor="$ji-border-1" rounded={22} p={15} gap={13}>
      <XStack gap={12} items="center">
        <YStack width={44} height={44} rounded={14} bg="$ji-fill-2" />
        <YStack flex={1} gap={8}>
          <Block width="70%" height={14} />
          <Block width="45%" height={11} />
        </YStack>
      </XStack>
      <XStack gap={6}>
        <Block width={72} height={22} />
        <Block width={56} height={22} />
        <Block width={64} height={22} />
      </XStack>
    </YStack>
  );
}
