import { IVacationProps } from "~/src/shared/types/vacantion";

export type StateProps = {
  isOpened: boolean;
  vacantion: IVacationProps | null;
};

export type ActionProps = {
  handleOpenModalVacantion: (vacantion: IVacationProps) => void;
  handleCloseModalVacantion: () => void;
};

export type StorePropsModalVacantion = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateModalVacantion: StateProps = {
  isOpened: false,
  vacantion: null,
};
