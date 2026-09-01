import { Tabs } from "expo-router";

import { TabBarIcon } from "~/src/shared/components/TabBarIcon";

export const unstable_tabs_settings = {
  initialRouteName: "home/index",
};

const { Screen } = Tabs;

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#F8F8F8",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#787880",
      }}>
      <Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="home"
              color={focused ? "#007AFF" : "#787880"}
              focused={focused}
            />
          ),
        }}
      />

      <Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" color={focused ? "#007AFF" : "#787880"} />
          ),
        }}
      />
    </Tabs>
  );
}
