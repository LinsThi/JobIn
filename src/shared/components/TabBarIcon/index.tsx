import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

type Props = {
  name: string;
  color: string;
};

export const TabBarIcon = ({ name, color }: Props) => {
  if (name === "home") {
    return <Entypo name="briefcase" size={24} style={styles.tabBarIcon} color={color} />;
  }

  if (name === "search") {
    return <FontAwesome size={24} style={styles.tabBarIcon} color={color} name="search" />;
  }

  return <FontAwesome size={24} style={styles.tabBarIcon} color={color} name="bookmark-o" />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
