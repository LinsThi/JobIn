import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { useJobSearch } from "../../hooks/useJobSearch";
import { SearchFilters, countActiveFilters } from "../../search.constants";

import { Job } from "~/src/shared/domain/job";
import { jobDetailHref } from "~/src/shared/navigation/jobRoute";
import useRecentSearches from "~/src/shared/store/useRecentSearches";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function useSearchScreen() {
  const router = useRouter();

  const { q } = useLocalSearchParams<{ q?: string }>();

  const setVacantion = useUserDetails((store) => store.actions.handleChangeVacantion);
  const addRecentSearch = useRecentSearches((store) => store.actions.addSearch);

  const search = useJobSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const commitSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();

      search.setQuery(trimmed);
      if (trimmed) {
        addRecentSearch(trimmed);
        setVacantion(trimmed);
      }
      search.runSearch(trimmed);
    },
    [search, addRecentSearch, setVacantion]
  );

  // Run a search only when Home hands us an explicit `q` (a tapped recent
  // search). Opening the tab normally carries no `q`, so the screen stays idle
  // until the user types and submits.
  const lastHandledQuery = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (q && q !== lastHandledQuery.current) {
      lastHandledQuery.current = q;
      commitSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const onSubmit = useCallback(() => commitSearch(search.query), [commitSearch, search.query]);

  const openJob = useCallback((job: Job) => router.push(jobDetailHref(job)), [router]);

  const goBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.navigate("/");
  }, [router]);

  const applyFilters = useCallback(
    (next: SearchFilters) => {
      search.setFilters(next);
      setFiltersOpen(false);
    },
    [search]
  );

  return {
    query: search.query,
    onChangeQuery: search.setQuery,
    onSubmit,
    submitted: search.submitted,
    phase: search.phase,
    completedPlatforms: search.completedPlatforms,
    results: search.results,
    filters: search.filters,
    activeFilterCount: countActiveFilters(search.filters),
    filtersOpen,
    openFilters: () => setFiltersOpen(true),
    closeFilters: () => setFiltersOpen(false),
    applyFilters,
    openJob,
    goBack,
  };
}
