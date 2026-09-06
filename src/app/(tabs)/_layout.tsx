import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabBarIcon } from "~/src/shared/components/TabBarIcon";
import colors from "~/src/shared/theme/colors";

const { Screen } = Tabs;

const TAB_ACTIVE = colors["ji-white"];
const TAB_INACTIVE = colors["ji-ink-on-dark-muted"];

/** Bar height above the system navigation area. */
const TAB_BAR_BASE_HEIGHT = 74;
const TAB_BAR_BASE_PADDING_BOTTOM = 18;

export default function TabLayout() {
  // Button (3-button) navigation reports a large bottom inset; without adding it
  // the absolute-positioned bar sits under the system buttons and they overlap.
  const insets = useSafeAreaInsets();

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
          height: TAB_BAR_BASE_HEIGHT + insets.bottom,
          paddingTop: 8,
          paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom,
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
