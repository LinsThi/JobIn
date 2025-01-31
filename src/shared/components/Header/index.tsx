import Feather from "@expo/vector-icons/Feather";
import { useNavigation, usePathname } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import IconLogoDarkSVG from "~/src/assets/app_logo/logo_name_dark.svg";
import IconLogoLightSVG from "~/src/assets/app_logo/logo_name_light.svg";
import IconEditDarkSVG from "~/src/assets/svg/icon/edit_dark.svg";
import IconEditLightSVG from "~/src/assets/svg/icon/edit_light.svg";
import { useModalVacation } from "~/src/shared/components/ModalVacantion/store/useModalVacantion";
import useTheme from "~/src/shared/store/useTheme";

export function Header() {
  const {
    actions: { handleToggleTheme },
    state: { theme },
  } = useTheme();
  const {
    actions: { handleOpenModalVacantion },
  } = useModalVacation();

  const { navigate } = useNavigation();

  const pathname = usePathname();

  const logoToRender = useMemo(() => {
    if (theme === "dark") {
      return <IconLogoLightSVG width={80} height={60} />;
    }

    return <IconLogoDarkSVG width={80} height={60} />;
  }, [theme]);

  return (
    <View className="flex flex-row items-center justify-between bg-background px-4 pb-8 pt-6 dark:bg-background-dark">
      <TouchableOpacity onPress={() => navigate("splash")}>{logoToRender}</TouchableOpacity>

      <View className="flex flex-row items-center gap-4">
        {pathname === "/" && (
          <TouchableOpacity onPress={() => handleOpenModalVacantion("edit")}>
            {theme === "dark" ? <IconEditLightSVG /> : <IconEditDarkSVG />}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleToggleTheme}>
          <Feather
            name={theme === "dark" ? "moon" : "sun"}
            size={32}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
