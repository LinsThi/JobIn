import { XStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";

type Segment<T extends string> = {
  key: T;
  label: string;
};

type Props<T extends string> = {
  items: readonly Segment<T>[];
  value: T;
  onChange: (key: T) => void;
};

export function SegmentedControl<T extends string>({ items, value, onChange }: Props<T>) {
  return (
    <XStack gap={5} p={5} rounded={16} bg="$ji-fill-2">
      {items.map((item) => {
        const active = item.key === value;

        return (
          <XStack
            key={item.key}
            flex={1}
            items="center"
            justify="center"
            py={11}
            rounded={12}
            bg={active ? "$ji-white" : "transparent"}
            pressStyle={active ? undefined : { opacity: 0.6 }}
            onPress={() => onChange(item.key)}>
            <Text variant="tag" fontSize={12.5} color={active ? "$ji-navy-900" : "$ji-navy-500"}>
              {item.label}
            </Text>
          </XStack>
        );
      })}
    </XStack>
  );
}
