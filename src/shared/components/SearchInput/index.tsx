import EvilIcons from "@expo/vector-icons/EvilIcons";
import { ComponentProps } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  showClearButton?: boolean;
  functionToClear?: () => void;
  functionToSearch: () => void;
  customStyle?: string;
} & ComponentProps<typeof TextInput>;

export default function SearchInput({
  showClearButton,
  functionToClear,
  functionToSearch,
  ...props
}: Props) {
  return (
    <View className="w-full flex-row items-center rounded-xl bg-[#767680]/15 px-2">
      <TouchableOpacity onPress={functionToSearch}>
        <EvilIcons name="search" size={32} color="#89898E" className="-mt-2" />
      </TouchableOpacity>

      <TextInput
        // className="flex-1 px-4 text-black dark:text-white"
        className={`flex-1 px-4 text-black dark:text-white ${props.customStyle}`}
        numberOfLines={1}
        onEndEditing={functionToSearch}
        {...props}
      />

      {functionToClear && props.value !== "" && (
        <TouchableOpacity onPress={functionToClear}>
          <EvilIcons name="close" size={32} color="#89898E" className="-mt-2" />
        </TouchableOpacity>
      )}
    </View>
  );
}
