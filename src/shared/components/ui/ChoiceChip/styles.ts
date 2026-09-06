import { GetProps, styled, XStack } from "tamagui";

export const ChoiceChipFrame = styled(XStack, {
  name: "ChoiceChip",
  items: "center",
  justify: "center",
  borderWidth: 1,
  pressStyle: {
    opacity: 0.7,
  },

  variants: {
    active: {
      true: {
        bg: "$ji-fill-accent",
        borderColor: "$ji-teal-500",
      },
      false: {
        bg: "$ji-white",
        borderColor: "$ji-border-2",
      },
    },

    variant: {
      tag: {
        borderRadius: 24,
      },
      pill: {
        borderRadius: 999,
      },
      square: {
        borderRadius: 24,
        width: 50,
        height: 50,
      },
    },

    size: {
      sm: {
        px: 12,
        py: 9,
      },
      md: {
        p: 15,
      },
      lg: {
        px: 18,
        py: 16,
      },
    },

    fullWidth: {
      true: {
        flex: 1,
      },
      false: {},
    },
  } as const,

  defaultVariants: {
    variant: "tag",
  },
});

export type ChoiceChipFrameProps = GetProps<typeof ChoiceChipFrame>;
