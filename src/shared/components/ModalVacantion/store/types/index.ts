export type StateProps = {
  isOpened: boolean;
  type: "create" | "edit" | null;
};

export type ActionProps = {
  handleOpenModalVacantion: (type: "create" | "edit") => void;
  handleCloseModalVacantion: () => void;
};

export type StorePropsModalVacantion = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateModalVacantion: StateProps = {
  isOpened: false,
  type: null,
};
