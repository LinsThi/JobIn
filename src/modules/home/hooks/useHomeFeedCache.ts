/* eslint-disable import/order */
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { NormalizedJobDTO } from "~/src/shared/queries/useSearchJobs/types";
import { zustandMMKVStorage } from "~/src/shared/services/mmkvStorage";

export interface HomeFeedSnapshot {
  /** `categoriesKey|skillsKey` the jobs were fetched for. */
  key: string;
  jobs: NormalizedJobDTO[];
  updatedAt: number;
}

interface HomeFeedCacheStore {
  snapshot: HomeFeedSnapshot | null;
  save: (snapshot: HomeFeedSnapshot) => void;
}

/**
 * Last successful Home feed, persisted so a cold app open paints the previous
 * results immediately while React Query revalidates in the background — instead
 * of showing skeletons (and re-triggering the whole scrape) every launch.
 */
const useHomeFeedCache = create<HomeFeedCacheStore>()(
  persist(
    (set) => ({
      snapshot: null,
      save: (snapshot) => set({ snapshot }),
    }),
    {
      name: "@JobIn:homeFeedCache",
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export default useHomeFeedCache;

/**
 * Whether the persisted snapshot has finished loading from MMKV. The
 * feed query waits on this so it can seed itself with the cached jobs before the
 * first fetch instead of racing hydration.
 */
export function useHomeFeedCacheHydrated() {
  const [hydrated, setHydrated] = useState(() => useHomeFeedCache.persist.hasHydrated());

  useEffect(() => {
    const unsub = useHomeFeedCache.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useHomeFeedCache.persist.hasHydrated());
    return unsub;
  }, []);

  return hydrated;
}
