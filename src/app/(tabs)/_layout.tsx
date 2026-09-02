import { Tabs } from "expo-router";

import { TabBarIcon } from "~/src/shared/components/TabBarIcon";
import colors from "~/src/shared/theme/colors";

const { Screen } = Tabs;

const TAB_ACTIVE = colors["ji-white"];
const TAB_INACTIVE = colors["ji-ink-on-dark-muted"];

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TAB_ACTIVE,
        tabBarInactiveTintColor: TAB_INACTIVE,
        tabBarStyle: {
          backgroundColor: colors["ji-navy-900"],
          borderTopWidth: 0,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          height: 74,
          paddingTop: 8,
          paddingBottom: 18,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_600SemiBold",
          fontSize: 9.5,
        },
      }}>
      <Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" color={focused ? TAB_ACTIVE : TAB_INACTIVE} focused={focused} />
          ),
        }}
      />

      <Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" color={focused ? TAB_ACTIVE : TAB_INACTIVE} />
          ),
        }}
      />

      <Screen
        name="saved"
        options={{
          title: "Vagas salvas",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="saved"
              color={focused ? TAB_ACTIVE : TAB_INACTIVE}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
