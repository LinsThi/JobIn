import { Text as TamaguiText, styled } from "tamagui";

import theme from "~/src/shared/theme";

const { size, lineHeight, letterSpacing } = theme.fonts;

/**
 * Single source of typography for the app. Feature code imports this `Text`,
 * never tamagui's — add a role here instead of styling text inline.
 */
export const Text = styled(TamaguiText, {
  name: "Text",
  fontFamily: "$body",
  color: "$ji-navy-900",

  variants: {
    variant: {
      brand: {
        fontFamily: "$bold",
        fontSize: size.headline,
        lineHeight: lineHeight.headline,
        letterSpacing: -0.4,
      },
      eyebrow: {
        fontFamily: "$medium",
        fontSize: 10,
        lineHeight: 14,
        color: "$ji-ink-4",
      },
      display: {
        fontFamily: "$semibold",
        fontSize: size.display,
        lineHeight: lineHeight.display,
        letterSpacing: letterSpacing.display,
      },
      subtitle: {
        fontFamily: "$regular",
        fontSize: size.body,
        lineHeight: lineHeight.body,
        color: "$ji-ink-4",
      },
      section: {
        fontFamily: "$semibold",
        fontSize: size.section,
        lineHeight: lineHeight.section,
        letterSpacing: letterSpacing.section,
      },
      action: {
        fontFamily: "$semibold",
        fontSize: size.meta,
        lineHeight: lineHeight.meta,
        color: "$ji-ink-4",
      },
      cardTitle: {
        fontFamily: "$semibold",
        fontSize: size["card-title"],
        lineHeight: lineHeight["card-title"],
        letterSpacing: letterSpacing["card-title"],
      },
      cardMeta: {
        fontFamily: "$medium",
        fontSize: size.meta,
        lineHeight: lineHeight.meta,
        color: "$ji-ink-4",
      },
      tag: {
        fontFamily: "$semibold",
        fontSize: size.tag,
        lineHeight: lineHeight.tag,
        color: "$ji-navy-600",
      },
      button: {
        fontFamily: "$semibold",
        fontSize: size.section,
        lineHeight: lineHeight.section,
        color: "$ji-white",
      },
    },
  } as const,
});
