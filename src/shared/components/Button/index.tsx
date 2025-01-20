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
      className={`flex items-center justify-center rounded-lg bg-backgroundButton py-5 dark:bg-backgroundButton-dark ${customClassName}`}
      {...props}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className="text-lg text-white">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
