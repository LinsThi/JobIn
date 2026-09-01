import { defaultConfig } from "@tamagui/config/v5";
import { createFont, createTamagui } from "tamagui";

import theme from "./shared/theme";

// const poppins = createFont({
//   family: theme.fonts.family,
//   size: theme.fonts.size,
//   lineHeight: theme.fonts.lineHeight,
//   letterSpacing: theme.fonts.letterSpacing,
//   weight: theme.fonts.weight,
// });

const regular = createFont({
  family: theme.fonts.fonts.regular.family,
  size: theme.fonts.size,
  lineHeight: theme.fonts.lineHeight,
  letterSpacing: theme.fonts.letterSpacing,
  weight: {
    4: theme.fonts.fonts.regular.weight,
  },
});

const medium = createFont({
  family: theme.fonts.fonts.medium.family,
  size: theme.fonts.size,
  lineHeight: theme.fonts.lineHeight,
  letterSpacing: theme.fonts.letterSpacing,
  weight: {
    5: theme.fonts.fonts.medium.weight,
  },
});

const semibold = createFont({
  family: theme.fonts.fonts.semibold.family,
  size: theme.fonts.size,
  lineHeight: theme.fonts.lineHeight,
  letterSpacing: theme.fonts.letterSpacing,
  weight: {
    6: theme.fonts.fonts.semibold.weight,
  },
});

const bold = createFont({
  family: theme.fonts.fonts.bold.family,
  size: theme.fonts.size,
  lineHeight: theme.fonts.lineHeight,
  letterSpacing: theme.fonts.letterSpacing,
  weight: {
    7: theme.fonts.fonts.bold.weight,
  },
});

export const config = createTamagui({
  ...defaultConfig,
  themeClassName: "tamagui",
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      background: "$ji-bg-app",
      color: "$ji-navy-900",
      text: "$ji-navy-900",
      card: "$ji-white",
      borderColor: "$ji-border-1",
      primary: "$ji-teal-500",
      primaryStrong: "$ji-teal-700",
    },
    dark: {
      ...defaultConfig.themes.dark,
      background: "$ji-navy-900",
      color: "$ji-white",
      text: "$ji-white",
      card: "$ji-navy-600",
      borderColor: "$ji-ink-3",
      primary: "$ji-teal-400",
      primaryStrong: "$ji-amber-500",
    },
  },
  tokens: {
    ...defaultConfig.tokens,

    color: {
      ...theme.colors,
    },

    space: {
      ...defaultConfig.tokens.space,
      ...theme.sizes.space,
    },

    size: {
      ...theme.sizes.space,
    },

    radius: {
      ...defaultConfig.tokens.radius,
      ...theme.sizes.radius,
    },
  },
  fonts: {
    regular,
    medium,
    semibold,
    bold,
    body: regular,
    heading: semibold,
    unset: regular,
  },
  // Cast keeps TS from resolving `TextProps` against the config that is still
  // being created here — that resolution is what makes `AppConfig` circular.
  defaultProps: {
    Text: {
      fontFamily: "$body",
    },
  } as Record<string, unknown>,
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
