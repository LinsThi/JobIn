export type StateProps = {
  isOpened: boolean;
};

export type ActionProps = {
  handleOpenModalVacantion: () => void;
  handleCloseModalVacantion: () => void;
};

export type StorePropsModalVacantion = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateModalVacantion: StateProps = {
  isOpened: false,
};
