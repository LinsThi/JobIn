export type StateProps = {
  vacantionRequired: string;
};

export type ActionProps = {
  handleChangeVacantion: (vacantion: string) => void;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateUserDetails: StateProps = {
  vacantionRequired: "",
};
