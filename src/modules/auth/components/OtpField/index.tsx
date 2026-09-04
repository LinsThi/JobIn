import { YStack } from "tamagui";

import { OtpInput } from "../OtpInput";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onComplete: (code: string) => void;
  disabled: boolean;
  error: string | null;
};

export function OtpField({ value, onChange, onComplete, disabled, error }: Props) {
  return (
    <YStack gap={12}>
      <OtpInput
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        disabled={disabled}
        error={!!error}
      />

      {error ? (
        <Text variant="cardMeta" color="$ji-orange-500">
          {error}
        </Text>
      ) : null}
    </YStack>
  );
}
