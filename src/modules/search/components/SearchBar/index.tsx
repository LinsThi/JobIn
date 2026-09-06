import Feather from "@expo/vector-icons/Feather";
import { TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { searchCopy } from "../../search.copy";

import { Text } from "~/src/shared/components/ui/Text";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
};

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onOpenFilters,
  activeFilterCount,
}: Props) {
  const hasQuery = value.trim().length > 0;

  return (
    <XStack gap={10}>
      <XStack
        flex={1}
        items="center"
        gap={8}
        pl={15}
        pr={6}
        height={50}
        rounded={16}
        bg="$ji-white"
        borderWidth={1}
        borderColor="$ji-border-2">
        <Feather name="search" size={16} color="#4A7C90" />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          placeholder={searchCopy.inputPlaceholder}
          placeholderTextColor="#5A8A9C"
          style={{
            flex: 1,
            padding: 0,
            fontFamily: "Poppins_500Medium",
            fontSize: 13,
            color: "#023047",
          }}
        />

        {hasQuery ? (
          <XStack
            width={26}
            height={26}
            rounded={999}
            items="center"
            justify="center"
            bg="$ji-fill-2"
            pressStyle={{ scale: 0.9 }}
            onPress={() => onChangeText("")}
            accessibilityRole="button"
            accessibilityLabel={searchCopy.clearInput}>
            <Feather name="x" size={13} color="#4A7C90" />
          </XStack>
        ) : null}

        <XStack
          width={38}
          height={38}
          rounded={12}
          items="center"
          justify="center"
          bg={hasQuery ? "$ji-teal-500" : "$ji-fill-2"}
          pressStyle={hasQuery ? { scale: 0.94 } : undefined}
          onPress={hasQuery ? onSubmit : undefined}
          accessibilityRole="button"
          accessibilityLabel={searchCopy.searchAction}>
          <Feather name="arrow-right" size={18} color={hasQuery ? "#FFFFFF" : "#8CA9B4"} />
        </XStack>
      </XStack>

      <YStack
        width={50}
        height={50}
        rounded={16}
        items="center"
        justify="center"
        bg="$ji-navy-900"
        pressStyle={{ scale: 0.96 }}
        onPress={onOpenFilters}>
        <Feather name="sliders" size={18} color="#FFFFFF" />

        {activeFilterCount > 0 ? (
          <YStack
            style={{ position: "absolute", top: -4, right: -4, minWidth: 18 }}
            height={18}
            px={4}
            rounded={999}
            items="center"
            justify="center"
            bg="$ji-teal-500"
            borderWidth={2}
            borderColor="$ji-bg-app">
            <Text fontFamily="$bold" fontSize={9.5} color="$ji-white">
              {activeFilterCount}
            </Text>
          </YStack>
        ) : null}
      </YStack>
    </XStack>
  );
}
