export type StateProps = {
  /** The splash video has buffered a frame and is about to render it. */
  ready: boolean;
  /** The splash video has finished playing (or hit its fallback timeout). */
  done: boolean;
};

export type ActionProps = {
  setReady: () => void;
  setDone: () => void;
};

export type StorePropsBootSplash = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateBootSplash: StateProps = {
  ready: false,
  done: false,
};
