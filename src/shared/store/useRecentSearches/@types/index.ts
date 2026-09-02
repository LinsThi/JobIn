export const RECENT_SEARCHES_LIMIT = 6;

export type StateProps = {
  searches: string[];
};

export type ActionProps = {
  addSearch: (term: string) => void;
  clearSearches: () => void;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateRecentSearches: StateProps = {
  searches: [],
};
