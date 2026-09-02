import { ReactNode } from "react";
import { XStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type TagTone = "neutral" | "fill" | "accent";

type Props = {
  label: string;
  tone?: TagTone;
  icon?: ReactNode;
};

const TONE_STYLES = {
  neutral: { bg: "$ji-white", borderColor: "$ji-border-2", color: "$ji-navy-600" },
  fill: { bg: "$ji-fill-1", borderColor: "$ji-fill-1", color: "$ji-navy-600" },
  accent: { bg: "$ji-fill-accent", borderColor: "$ji-fill-accent", color: "$ji-teal-500" },
} as const satisfies Record<TagTone, { bg: string; borderColor: string; color: string }>;

export function Tag({ label, tone = "fill", icon }: Props) {
  const style = TONE_STYLES[tone];

  return (
    <XStack
      items="center"
      gap={6}
      px={10}
      py={6}
      rounded={8}
      bg={style.bg}
      borderWidth={1}
      borderColor={style.borderColor}>
      {icon}
      <Text variant="tag" color={style.color}>
        {label}
      </Text>
    </XStack>
  );
}
