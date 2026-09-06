declare module "react-native-gesture-bottom-sheet" {
  import type { ComponentType, ForwardedRef, ReactNode } from "react";

  type BottomSheetRef = {
    open: () => void;
    close: () => void;
  };

  type BottomSheetProps = {
    ref?: ForwardedRef<BottomSheetRef>;
    height?: number;
    hasDraggableIcon?: boolean;
    sheetBackgroundColor?: string;
    children?: ReactNode;
  };

  const BottomSheet: ComponentType<BottomSheetProps>;
  export default BottomSheet;
}
