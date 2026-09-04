import { ReactNode } from "react";
import { ActivityIndicator } from "react-native";
import { XStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "ghost";
  icon?: ReactNode;
  /** Which side `icon` renders on. Defaults to before the label. */
  iconPosition?: "start" | "end";
};

/** Full-width pill action. `primary` = teal fill, `ghost` = text only. */
export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  icon,
  iconPosition = "start",
}: Props) {
  const inert = disabled || loading;
  const isGhost = variant === "ghost";

  return (
    <XStack
      height={56}
      rounded={20}
      items="center"
      justify="center"
      gap={10}
      bg={isGhost ? "transparent" : "$ji-teal-500"}
      opacity={inert ? 0.5 : 1}
      pressStyle={inert ? undefined : { scale: 0.98 }}
      onPress={inert ? undefined : onPress}>
      {loading ? (
        <ActivityIndicator color={isGhost ? "#219EBC" : "#FFFFFF"} />
      ) : (
        <>
          {icon && iconPosition === "start" ? icon : null}
          <Text variant="button" color={isGhost ? "$ji-teal-500" : "$ji-white"}>
            {label}
          </Text>
          {icon && iconPosition === "end" ? icon : null}
        </>
      )}
    </XStack>
  );
}
