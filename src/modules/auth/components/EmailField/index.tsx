import Feather from "@expo/vector-icons/Feather";
import { TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { authCopy } from "../../auth.copy";

import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

type Props = {
  value: string;
  onChangeText: (next: string) => void;
  onSubmit: () => void;
  error: string | null;
};

export function EmailField({ value, onChangeText, onSubmit, error }: Props) {
  const borderColor = error ? "$ji-orange-500" : value ? "$ji-blue-300" : "$ji-border-2";

  return (
    <YStack gap={8}>
      <Text variant="eyebrow" color="$ji-navy-900" fontFamily="$semibold">
        {authCopy.signIn.emailLabel}
      </Text>

      <XStack
        items="center"
        gap={10}
        height={54}
        px={15}
        rounded={16}
        bg="$ji-white"
        borderWidth={1.5}
        borderColor={borderColor}>
        <Feather
          name="mail"
          size={17}
          color={error ? colors["ji-orange-500"] : colors["ji-ink-5"]}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder={authCopy.signIn.emailPlaceholder}
          placeholderTextColor={colors["ji-ink-5"]}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="send"
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: "Poppins_500Medium",
            fontSize: 14,
            color: colors["ji-navy-900"],
            padding: 0,
          }}
        />
      </XStack>

      {error ? (
        <Text variant="cardMeta" color="$ji-orange-500">
          {error}
        </Text>
      ) : null}
    </YStack>
  );
}
