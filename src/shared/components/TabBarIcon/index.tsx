import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

type Props = {
  name: string;
  color: string;
  focused?: boolean;
};

export const TabBarIcon = ({ name, color, focused = false }: Props) => {
  if (name === "home") {
    return (
      <Ionicons
        name={focused ? "briefcase" : "briefcase-outline"}
        size={24}
        style={styles.tabBarIcon}
        color={color}
      />
    );
  }

  if (name === "search") {
    return <FontAwesome size={24} style={styles.tabBarIcon} color={color} name="search" />;
  }

  return (
    <Ionicons
      size={24}
      style={styles.tabBarIcon}
      color={color}
      name={focused ? "bookmark" : "bookmark-outline"}
    />
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
