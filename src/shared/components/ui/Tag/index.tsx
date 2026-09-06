import { ReactNode } from "react";
import { XStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type TagTone = "neutral" | "fill" | "accent";

type Props = {
  label: string;
  tone?: TagTone;
  icon?: ReactNode;
  /** Corner radius — use a large value for a pill. */
  radius?: number;
  size?: "sm" | "md";
};

const TONE_STYLES = {
  neutral: { bg: "$ji-white", borderColor: "$ji-border-2", color: "$ji-navy-600" },
  fill: { bg: "$ji-fill-1", borderColor: "$ji-fill-1", color: "$ji-navy-600" },
  accent: { bg: "$ji-fill-accent", borderColor: "$ji-fill-accent", color: "$ji-teal-500" },
} as const satisfies Record<TagTone, { bg: string; borderColor: string; color: string }>;

export function Tag({ label, tone = "fill", icon, radius = 8, size = "sm" }: Props) {
  const style = TONE_STYLES[tone];
  const pad = size === "md" ? { px: 14, py: 9 } : { px: 10, py: 6 };

  return (
    <XStack
      items="center"
      gap={6}
      px={pad.px}
      py={pad.py}
      rounded={radius}
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
