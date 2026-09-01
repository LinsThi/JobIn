import { ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import config from "~/src/tamagui.config";

export default function AppProvider({
  children,
  defaultTheme = "light",
}: {
  children: ReactNode;
  defaultTheme?: "light" | "dark";
}) {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      {children}
    </TamaguiProvider>
  );
}
