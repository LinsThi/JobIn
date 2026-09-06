import { XStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  actionTone?: "muted" | "accent";
};

export function SectionHeader({ title, actionLabel, onAction, actionTone = "accent" }: Props) {
  return (
    <XStack items="center" justify="space-between" mb={12}>
      <Text variant="section">{title}</Text>

      {actionLabel && onAction ? (
        <Text
          variant="action"
          color={actionTone === "accent" ? "$ji-teal-500" : "$ji-ink-4"}
          onPress={onAction}
          pressStyle={{ opacity: 0.6 }}>
          {actionLabel}
        </Text>
      ) : null}
    </XStack>
  );
}
