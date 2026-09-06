import Feather from "@expo/vector-icons/Feather";
import { ReactNode, useState } from "react";
import { ScrollView, TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  /** When set and reached, the input is hidden and a hint is shown. */
  maxTags?: number;
  /** Leading glyph inside the input row, e.g. a section-specific Feather icon. */
  icon?: ReactNode;
  /** Tappable suggestions shown under the input; already-added ones are hidden. */
  suggestions?: string[];
  /**
   * When set, the picked-tags list scrolls inside its own area capped at this
   * height (px) instead of growing the parent. Keeps surrounding UI fixed.
   */
  tagsMaxHeight?: number;
};

export function TagInput({
  value,
  onChange,
  placeholder,
  maxTags,
  icon,
  suggestions,
  tagsMaxHeight,
}: Props) {
  const [draft, setDraft] = useState("");

  const atLimit = maxTags !== undefined && value.length >= maxTags;

  const addTag = (raw?: string) => {
    const tag = (raw ?? draft).trim();
    if (!tag || atLimit) return;

    const exists = value.some((item) => item.toLowerCase() === tag.toLowerCase());
    if (!exists) onChange([...value, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  const visibleSuggestions = suggestions?.filter(
    (label) => !value.some((item) => item.toLowerCase() === label.toLowerCase())
  );

  const tagsWrap = (
    <XStack gap={8} flexWrap="wrap">
      {value.map((tag) => (
        <XStack
          key={tag}
          items="center"
          gap={8}
          pl={14}
          pr={10}
          py={10}
          rounded={999}
          bg="$ji-fill-accent"
          borderWidth={1}
          borderColor="$ji-teal-500"
          style={{ maxWidth: "100%" }}>
          <Text variant="tag" color="$ji-navy-700" numberOfLines={1} style={{ flexShrink: 1 }}>
            {tag}
          </Text>
          <XStack
            width={16}
            height={16}
            rounded={999}
            items="center"
            justify="center"
            bg="$ji-teal-500"
            pressStyle={{ scale: 0.85 }}
            onPress={() => removeTag(tag)}
            style={{ flexShrink: 0 }}>
            <Feather name="x" size={9} color={colors["ji-white"]} />
          </XStack>
        </XStack>
      ))}
    </XStack>
  );

  return (
    <YStack gap={12}>
      {atLimit ? (
        <Text variant="cardMeta" color="$ji-orange-500">
          Limite de {maxTags} atingido. Remova uma para trocar.
        </Text>
      ) : (
        <XStack gap={9}>
          <XStack
            flex={1}
            items="center"
            gap={9}
            height={50}
            px={14}
            rounded={16}
            bg="$ji-white"
            borderWidth={1.5}
            borderColor={draft ? "$ji-blue-300" : "$ji-border-2"}>
            {icon}
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => addTag()}
              placeholder={placeholder}
              placeholderTextColor={colors["ji-ink-5"]}
              returnKeyType="done"
              blurOnSubmit={false}
              autoCapitalize="words"
              numberOfLines={1}
              style={{
                flex: 1,
                minWidth: 0,
                fontFamily: "Poppins_500Medium",
                fontSize: 13,
                color: colors["ji-navy-900"],
                padding: 0,
              }}
            />
          </XStack>

          <XStack
            width={50}
            height={50}
            rounded={16}
            items="center"
            justify="center"
            bg={draft.trim() ? "$ji-teal-500" : "$ji-blue-300"}
            pressStyle={{ scale: 0.94 }}
            onPress={() => addTag()}>
            <Feather name="plus" size={18} color={colors["ji-white"]} />
          </XStack>
        </XStack>
      )}

      {!atLimit && visibleSuggestions && visibleSuggestions.length > 0 ? (
        <YStack gap={8}>
          <Text variant="cardMeta">Sugestões</Text>
          <XStack gap={8} flexWrap="wrap">
            {visibleSuggestions.map((label) => (
              <XStack
                key={label}
                pressStyle={{ scale: 0.95 }}
                onPress={() => addTag(label)}
                px={14}
                py={9}
                rounded={999}
                bg="$ji-white"
                borderWidth={1}
                borderColor="$ji-border-2"
                style={{ maxWidth: "100%" }}>
                <Text variant="tag" color="$ji-navy-600" numberOfLines={1}>
                  {label}
                </Text>
              </XStack>
            ))}
          </XStack>
        </YStack>
      ) : null}

      {value.length === 0 ? null : tagsMaxHeight === undefined ? (
        tagsWrap
      ) : (
        <ScrollView
          style={{ maxHeight: tagsMaxHeight }}
          showsVerticalScrollIndicator
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled">
          {tagsWrap}
        </ScrollView>
      )}
    </YStack>
  );
}
