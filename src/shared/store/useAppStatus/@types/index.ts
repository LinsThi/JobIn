export type StateProps = {
  alreadyOpenedApp: boolean;
};

export type ActionProps = {
  handleChangeFirstOpenedApp: () => void;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateAppStatus: StateProps = {
  alreadyOpenedApp: false,
};
