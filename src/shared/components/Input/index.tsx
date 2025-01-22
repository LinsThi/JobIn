import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type Props = TextInputProps & {
  customContainerClass?: string;
  functionToClear?: () => void;
};

export function Input({ customContainerClass, functionToClear, ...props }: Props) {
  return (
    <View
      className={`rounded-lg bg-[#F2F2F7] ${customContainerClass} max-w-full flex-row items-center overflow-hidden px-2 py-1`}>
      <TextInput {...props} multiline={false} className="h-12 flex-1" />

      {functionToClear && props.value !== "" && (
        <TouchableOpacity onPress={functionToClear}>
          <EvilIcons name="close" size={24} color="black" className="-mt-2" />
        </TouchableOpacity>
      )}
    </View>
  );
}
