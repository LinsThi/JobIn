import { ReactNode } from "react";

import { SearchFilters } from "../../search.constants";

import { JobPlatformId } from "~/src/shared/domain/job";

export type SearchFilterSheetProps = {
  open: boolean;
  filters: SearchFilters;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
};

export type FilterSectionProps = {
  title: string;
  children: ReactNode;
};

export type PlatformRowProps = {
  id: JobPlatformId;
  speed: "fast" | "mid" | "slow";
  active: boolean;
  onPress: () => void;
};
