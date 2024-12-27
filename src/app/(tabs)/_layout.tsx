import { Tabs } from "expo-router";

import { TabBarIcon } from "@/TabBarIcon";
import useTheme from "~/src/shared/store/useTheme";

export const unstable_tabs_settings = {
  initialRouteName: "home/index",
};

const { Screen } = Tabs;

export default function TabLayout() {
  const {
    state: { theme },
  } = useTheme();

  const ACTIVE_TINT_COLOR = theme === "dark" ? "#CDAEF5" : "#007AFF";
  const INACTIVE_TINT_COLOR = theme === "dark" ? "#515151" : "#787880";

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#222232" : "#F8F8F8",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: ACTIVE_TINT_COLOR,
        tabBarInactiveTintColor: INACTIVE_TINT_COLOR,
      }}>
      <Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} />
          ),
        }}
      />

      <Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} />
          ),
        }}
      />
    </Tabs>
  );
}
