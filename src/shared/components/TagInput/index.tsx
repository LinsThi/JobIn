import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  /** When set and reached, the input is hidden and a hint is shown. */
  maxTags?: number;
};

export function TagInput({ value, onChange, placeholder, maxTags }: Props) {
  const [draft, setDraft] = useState("");

  const atLimit = maxTags !== undefined && value.length >= maxTags;

  const addTag = () => {
    const tag = draft.trim();
    if (!tag || atLimit) return;

    const exists = value.some((item) => item.toLowerCase() === tag.toLowerCase());
    if (!exists) onChange([...value, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  return (
    <YStack gap={10}>
      {value.length > 0 ? (
        <XStack gap={8} flexWrap="wrap">
          {value.map((tag) => (
            <XStack
              key={tag}
              items="center"
              gap={6}
              pl={12}
              pr={8}
              py={7}
              rounded={999}
              bg="$ji-fill-1"
              borderWidth={1}
              borderColor="$ji-fill-1">
              <Text variant="tag">{tag}</Text>
              <Feather
                name="x"
                size={13}
                color={colors["ji-navy-600"]}
                onPress={() => removeTag(tag)}
                suppressHighlighting
              />
            </XStack>
          ))}
        </XStack>
      ) : null}

      {atLimit ? (
        <Text variant="cardMeta">Limite de {maxTags} atingido. Remova uma para trocar.</Text>
      ) : (
        <XStack
          items="center"
          gap={8}
          height={48}
          px={14}
          rounded={14}
          bg="$ji-white"
          borderWidth={1}
          borderColor="$ji-border-2">
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={addTag}
            placeholder={placeholder}
            placeholderTextColor={colors["ji-ink-5"]}
            returnKeyType="done"
            blurOnSubmit={false}
            autoCapitalize="words"
            style={{
              flex: 1,
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
              color: colors["ji-navy-900"],
              padding: 0,
            }}
          />
          <Feather
            name="plus"
            size={18}
            color={draft.trim() ? colors["ji-teal-500"] : colors["ji-ink-5"]}
            onPress={addTag}
            suppressHighlighting
          />
        </XStack>
      )}
    </YStack>
  );
}
