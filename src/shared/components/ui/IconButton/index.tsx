import { ReactNode } from "react";
import { XStack, YStack } from "tamagui";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  badge?: boolean;
  size?: number;
  tone?: "surface" | "fill";
  disabled?: boolean;
};

export function IconButton({
  children,
  onPress,
  badge = false,
  size = 38,
  tone = "surface",
  disabled = false,
}: Props) {
  return (
    <XStack
      width={size}
      height={size}
      rounded={12}
      items="center"
      justify="center"
      position="relative"
      bg={tone === "surface" ? "$ji-white" : "$ji-fill-1"}
      borderWidth={tone === "surface" ? 1 : 0}
      borderColor="$ji-border-2"
      opacity={disabled ? 0.5 : 1}
      pressStyle={{ opacity: 0.7, scale: 0.94 }}
      onPress={disabled ? undefined : onPress}>
      {children}

      {badge ? (
        <YStack
          style={{ position: "absolute", top: 9, right: 10 }}
          width={7}
          height={7}
          rounded={999}
          bg="$ji-orange-500"
          borderWidth={1.5}
          borderColor="$ji-white"
        />
      ) : null}
    </XStack>
  );
}
