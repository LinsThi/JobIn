import { ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import config from "~/src/tamagui.config";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
