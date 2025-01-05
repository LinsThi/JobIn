export type StateProps = {
  isOpened: boolean;
};

export type ActionProps = {
  handleOpenBottomPlatform: () => void;
  handleCloseBottomPlatform: () => void;
};

export type StorePropsBottomPlatform = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateBottomPlatform: StateProps = {
  isOpened: false,
};
