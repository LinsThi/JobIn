/* eslint-disable import/order */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandMMKVStorage } from "~/src/shared/services/mmkvStorage";
import { RECENT_SEARCHES_LIMIT, StoreProps, initialStateRecentSearches } from "./@types";

const useRecentSearches = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: initialStateRecentSearches,
      actions: {
        addSearch: (term: string) => {
          const normalized = term.trim();

          if (!normalized) return;

          const current = get().state.searches.filter(
            (search) => search.toLowerCase() !== normalized.toLowerCase()
          );

          set((prevState) => ({
            state: {
              ...prevState.state,
              searches: [normalized, ...current].slice(0, RECENT_SEARCHES_LIMIT),
            },
          }));
        },
        clearSearches: () => {
          set((prevState) => ({
            state: {
              ...prevState.state,
              searches: [],
            },
          }));
        },
      },
    }),
    {
      name: "@JobIn:recentSearches",
      storage: createJSONStorage(() => zustandMMKVStorage),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState as Partial<StoreProps> | undefined) ?? {};
        const state = persisted.state ?? initialStateRecentSearches;

        return {
          state: {
            searches: state.searches ?? [],
          },
          actions: currentState.actions,
        };
      },
    }
  )
);

export default useRecentSearches;
