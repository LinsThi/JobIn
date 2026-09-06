import { XStack, YStack } from "tamagui";

function Block({ width, height }: { width: number | string; height: number }) {
  return <YStack style={{ width, height }} rounded={8} bg="$ji-fill-2" />;
}

/** Matches `RecommendedJobCard`'s footprint (252 wide, plain fill while loading). */
export function RecommendedJobCardSkeleton() {
  return (
    <YStack width={252} rounded={26} p={20} gap={14} bg="$ji-fill-1">
      <XStack items="center" justify="space-between">
        <XStack items="center" gap={9}>
          <YStack width={32} height={32} rounded={10} bg="$ji-fill-2" />
          <Block width={90} height={12} />
        </XStack>
        <Block width={48} height={18} />
      </XStack>

      <YStack gap={8} mt={12}>
        <Block width="90%" height={18} />
        <Block width="60%" height={18} />
      </YStack>

      <Block width="45%" height={12} />

      <XStack items="center" gap={9} mt={6}>
        <YStack flex={1} height={42} rounded={999} bg="$ji-fill-2" />
        <YStack width={42} height={42} rounded={999} bg="$ji-fill-2" />
      </XStack>
    </YStack>
  );
}
