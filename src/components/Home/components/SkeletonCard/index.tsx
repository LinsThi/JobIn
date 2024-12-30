import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useWindowDimensions, View } from "react-native";

export function SkeletonCard() {
  const { width } = useWindowDimensions();

  const fonts_sizes = {
    TITLE: 18,
    SUBTITLE: 16,
    DESCRIPTION: 14,
  };

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      className="mb-4 flex h-56 flex-row gap-4 rounded-lg border border-foreground bg-foreground p-4 dark:border-foreground-dark dark:bg-foreground-dark">
      <Skeleton colorMode="light" radius="round" width={48} height={48} />

      <View className="flex gap-4">
        <View className="flex gap-1">
          <Skeleton colorMode="light" radius="round" width={width / 2} height={fonts_sizes.TITLE} />

          <Skeleton
            colorMode="light"
            radius="round"
            width={width / 3}
            height={fonts_sizes.SUBTITLE}
          />
        </View>

        <View className="flex gap-1">
          <Skeleton
            colorMode="light"
            radius="round"
            width={width / 1.5}
            height={fonts_sizes.DESCRIPTION}
          />

          <Skeleton
            colorMode="light"
            radius="round"
            width={width / 1.5}
            height={fonts_sizes.DESCRIPTION}
          />

          <Skeleton
            colorMode="light"
            radius="round"
            width={width / 1.5}
            height={fonts_sizes.DESCRIPTION}
          />
        </View>

        <View className="mt-8 flex flex-row justify-end gap-1">
          <Skeleton
            colorMode="light"
            radius="round"
            width={width / 5}
            height={fonts_sizes.DESCRIPTION}
          />

          <Skeleton
            colorMode="light"
            radius="round"
            width={width / 5}
            height={fonts_sizes.DESCRIPTION}
          />
        </View>
      </View>
    </MotiView>
  );
}
