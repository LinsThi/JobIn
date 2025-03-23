export type StateProps = {
  alreadyOpenedApp: boolean;
  showChangesUpdates: boolean;
};

export type ActionProps = {
  handleChangeFirstOpenedApp: () => void;
  handleChangeShowUpdates: (status: boolean) => void;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateAppStatus: StateProps = {
  alreadyOpenedApp: false,
  showChangesUpdates: false,
};
