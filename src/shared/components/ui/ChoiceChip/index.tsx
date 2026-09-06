import { Text } from "~/src/shared/components/ui/Text";
import { ChoiceChipFrame } from "./styles";
import { ChipProps, ChoiceChipSize } from "./types";

const LABEL_FONT_SIZE: Record<ChoiceChipSize, number> = {
  sm: 11,
  md: 12,
  lg: 14,
};

export function ChoiceChip({
  label,
  active,
  onPress,
  size = "md",
  variant = "tag",
  fullWidth,
  ...frameProps
}: ChipProps) {
  // `square` owns its whole box (fixed 50x50) – applying `size` padding on top
  // would shrink the content area and clip multi-letter labels.
  const isSquare = variant === "square";

  return (
    <ChoiceChipFrame
      active={active}
      variant={variant}
      size={isSquare ? undefined : size}
      fullWidth={fullWidth}
      onPress={onPress}
      {...frameProps}>
      <Text
        variant="tag"
        numberOfLines={1}
        fontSize={LABEL_FONT_SIZE[size]}
        color={active ? "$ji-teal-500" : "$ji-navy-600"}>
        {label}
      </Text>
    </ChoiceChipFrame>
  );
}
