import Feather from "@expo/vector-icons/Feather";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import IconLogoDarkSVG from "~/src/assets/logo_name_dark.svg";
import IconLogoLightSVG from "~/src/assets/logo_name_light.svg";
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

  const logoToRender = useMemo(() => {
    if (theme === "dark") {
      return <IconLogoLightSVG />;
    }

    return <IconLogoDarkSVG />;
  }, [theme]);

  return (
    <View className="flex flex-row items-center justify-between bg-background px-4 pb-8 pt-4 dark:bg-background-dark">
      {logoToRender}

      <View className="flex flex-row items-center gap-4">
        <TouchableOpacity onPress={() => handleOpenModalVacantion("edit")}>
          {theme === "dark" ? <IconEditLightSVG /> : <IconEditDarkSVG />}
        </TouchableOpacity>

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
