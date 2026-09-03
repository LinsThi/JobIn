import { useRef } from "react";
import { TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { OTP_LENGTH } from "../../auth.constants";

import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
};

export function OtpInput({ value, onChange, onComplete, disabled = false }: Props) {
  const inputRef = useRef<TextInput>(null);
  const cells = Array.from({ length: OTP_LENGTH });

  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, OTP_LENGTH);
    onChange(digits);
    if (digits.length === OTP_LENGTH) onComplete?.(digits);
  };

  return (
    <YStack>
      <XStack gap={8} onPress={() => inputRef.current?.focus()}>
        {cells.map((_, index) => {
          const char = value[index] ?? "";
          const active = index === value.length;

          return (
            <YStack
              key={index}
              flex={1}
              height={56}
              rounded={14}
              items="center"
              justify="center"
              bg="$ji-white"
              borderWidth={active && !disabled ? 2 : 1}
              borderColor={active && !disabled ? "$ji-teal-500" : "$ji-border-2"}>
              <Text variant="titleLg">{char}</Text>
            </YStack>
          );
        })}
      </XStack>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={OTP_LENGTH}
        editable={!disabled}
        autoFocus
        caretHidden
        style={{
          position: "absolute",
          width: "100%",
          height: 56,
          opacity: 0,
          color: colors["ji-navy-900"],
        }}
      />
    </YStack>
  );
}
