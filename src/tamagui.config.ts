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

const { colors } = theme;

export const config = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    // Theme values are raw hex on purpose: `"$token"` references inside a theme
    // are resolved against other *theme* keys, not the color tokens, so they
    // would silently fail to dereference here.
    light: {
      ...defaultConfig.themes.light,
      background: colors["ji-bg-app"],
      backgroundStrong: colors["ji-bg-page"],
      color: colors["ji-navy-900"],
      colorPress: colors["ji-navy-700"],
      text: colors["ji-navy-900"],
      textMuted: colors["ji-ink-4"],
      card: colors["ji-white"],
      borderColor: colors["ji-border-1"],
      borderColorHover: colors["ji-border-2"],
      primary: colors["ji-teal-500"],
      primaryStrong: colors["ji-teal-700"],
    },
    dark: {
      ...defaultConfig.themes.dark,
      background: colors["ji-navy-900"],
      backgroundStrong: colors["ji-navy-700"],
      color: colors["ji-white"],
      colorPress: colors["ji-blue-200"],
      text: colors["ji-white"],
      textMuted: colors["ji-ink-on-dark-muted"],
      card: colors["ji-navy-600"],
      borderColor: colors["ji-ink-3"],
      borderColorHover: colors["ji-ink-4"],
      primary: colors["ji-teal-400"],
      primaryStrong: colors["ji-amber-500"],
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
      ...defaultConfig.tokens.size,
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
