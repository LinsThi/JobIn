import { Tabs } from "expo-router";

import { Header } from "~/src/shared/components/Header";
import { TabBarIcon } from "~/src/shared/components/TabBarIcon";
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
      initialRouteName="index"
      screenOptions={{
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#222232" : "#F8F8F8",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: ACTIVE_TINT_COLOR,
        tabBarInactiveTintColor: INACTIVE_TINT_COLOR,
      }}>
      <Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} />
          ),
        }}
      />

      <Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} />
          ),
        }}
      />

      <Screen
        name="saved"
        options={{
          title: "Salvos",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="bookmark" color={focused ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} />
          ),
        }}
      />
    </Tabs>
  );
}
