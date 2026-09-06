import type { ChoiceChipFrameProps } from "./styles";

export type ChoiceChipVariant = "tag" | "pill" | "square";
export type ChoiceChipSize = "sm" | "md" | "lg";

type FrameStyleProps = Omit<ChoiceChipFrameProps, "active" | "variant" | "size" | "children">;

export type ChipProps = FrameStyleProps & {
  label: string;
  active: boolean;
  onPress: () => void;
  /** shape of the chip – defaults to `tag` */
  variant?: ChoiceChipVariant;
  /** spacing/density – ignored by the fixed-size `square` variant */
  size?: ChoiceChipSize;
  fullWidth?: boolean;
};
