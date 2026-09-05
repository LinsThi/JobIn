import { Job, JobPlatformId } from "~/src/shared/domain/job";

/** A search result carries its UF so the location filter can match it. */
export type SearchJob = Job & { state: string };

export const WORK_MODELS = ["Remoto", "Híbrido", "Presencial"] as const;
export const CONTRACT_TYPES = ["CLT", "PJ"] as const;

export const SEARCH_STATES = [
  "SP",
  "RJ",
  "MG",
  "RS",
  "PR",
  "SC",
  "BA",
  "PE",
  "CE",
  "DF",
  "GO",
  "ES",
  "AM",
  "PA",
];

/** Salary floors offered in the filter sheet — `0` means "no minimum". */
export const SALARY_STEPS = [0, 3000, 5000, 8000, 12000, 16000];

export type PlatformSpeed = "fast" | "mid" | "slow";

/** Platforms queried on every search, ordered by how fast they usually answer. */
export const SEARCH_PLATFORMS: { id: JobPlatformId; speed: PlatformSpeed }[] = [
  { id: "linkedin", speed: "fast" },
  { id: "infojobs", speed: "fast" },
  { id: "catho", speed: "fast" },
  { id: "trabalhabrasil", speed: "fast" },
  { id: "gupy", speed: "mid" },
];

/** All platform ids, in query order. */
export const ALL_PLATFORM_IDS: JobPlatformId[] = SEARCH_PLATFORMS.map((platform) => platform.id);

/** Stagger between platform "concluído" ticks while a search runs. */
export const SEARCH_STEP_MS = 380;

/** Screen layout. */
export const SEARCH_H_PADDING = 20;
export const SEARCH_TAB_BAR_CLEARANCE = 120;

export type SearchFilters = {
  workModels: string[];
  contracts: string[];
  platforms: JobPlatformId[];
  states: string[];
  salaryMin: number;
};

export const EMPTY_FILTERS: SearchFilters = {
  workModels: [],
  contracts: [],
  platforms: [...ALL_PLATFORM_IDS],
  states: [],
  salaryMin: 0,
};

export function countActiveFilters(filters: SearchFilters): number {
  // Every platform selected is the default, so it doesn't count as an active filter.
  const platformCount =
    filters.platforms.length === ALL_PLATFORM_IDS.length ? 0 : filters.platforms.length;

  return (
    filters.workModels.length +
    filters.contracts.length +
    platformCount +
    filters.states.length +
    (filters.salaryMin > 0 ? 1 : 0)
  );
}

export function salaryStepLabel(step: number): string {
  return `R$ ${Math.round(step / 1000)}k+`;
}
