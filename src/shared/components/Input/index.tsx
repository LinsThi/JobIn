import { TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps;

export function Input({ ...rest }: Props) {
  return (
    <View className="rounded-lg bg-[#F2F2F7] p-2">
      <TextInput {...rest} />
    </View>
  );
}
