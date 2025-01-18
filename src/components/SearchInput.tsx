import EvilIcons from "@expo/vector-icons/EvilIcons";
import { ComponentProps } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  showClearButton?: boolean;
  functionToClear?: () => void;
  functionToSearch: () => void;
} & ComponentProps<typeof TextInput>;

export default function SearchInput({
  showClearButton,
  functionToClear,
  functionToSearch,
  ...props
}: Props) {
  return (
    <View className="w-full flex-row items-center rounded-lg bg-gray-300 px-2 py-1 dark:bg-gray-500">
      <EvilIcons name="search" size={32} color="white" className="-mt-2" />

      <TextInput
        className="flex-1 px-4 text-black dark:text-white"
        numberOfLines={1}
        onEndEditing={functionToSearch}
        {...props}
      />

      {functionToClear && props.value !== "" && (
        <TouchableOpacity onPress={functionToClear}>
          <EvilIcons name="close" size={32} color="white" className="-mt-2" />
        </TouchableOpacity>
      )}
    </View>
  );
}
