import { TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  customContainerClass?: string;
};

export function Input({ customContainerClass, ...rest }: Props) {
  return (
    <View
      className={`rounded-lg bg-[#F2F2F7] p-2 ${customContainerClass} max-w-full overflow-hidden`}>
      <TextInput {...rest} className="w-ful max-h-10 overflow-hidden text-base" />
    </View>
  );
}
