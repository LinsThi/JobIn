import colors from "~/src/shared/theme/colors";

export type StateProps = {
  isDisabled?: boolean;
  backgroundColor: string;
};

export type ActionProps = {
  setBackgroundColor: (color: string) => void;
  resetBackgroundColor: () => void;
  activeSafeArea: () => void;
  desactiveSafeArea: () => void;
};

export type StorePropsSafeAreaBackground = {
  state: StateProps;
  actions: ActionProps;
};

export const DEFAULT_SAFE_AREA_BACKGROUND = colors["ji-bg-app"];

export const initialStateSafeAreaBackground: StateProps = {
  isDisabled: false,
  backgroundColor: DEFAULT_SAFE_AREA_BACKGROUND,
};
