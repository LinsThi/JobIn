import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
  title: string;
  isLoading?: boolean;
  customClassName?: string;
} & TouchableOpacityProps;

export function Button({ title, onPress, isLoading = false, customClassName, ...props }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-backgroundButton dark:bg-backgroundButton-dark flex items-center justify-center rounded-lg py-5 ${customClassName}`}
      {...props}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className="text-lg text-white">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
