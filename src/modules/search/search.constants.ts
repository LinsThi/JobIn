import { JobPlatformId } from "~/src/shared/domain/job";

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
  { id: "gupy", speed: "fast" },
  { id: "infojobs", speed: "mid" },
  { id: "catho", speed: "mid" },
  { id: "trabalhabrasil", speed: "slow" },
];

/** Stagger between platform "concluído" ticks while a search runs. */
export const SEARCH_STEP_MS = 380;

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
  platforms: [],
  states: [],
  salaryMin: 0,
};

export function countActiveFilters(filters: SearchFilters): number {
  return (
    filters.workModels.length +
    filters.contracts.length +
    filters.platforms.length +
    filters.states.length +
    (filters.salaryMin > 0 ? 1 : 0)
  );
}

export function salaryStepLabel(step: number): string {
  return `R$ ${Math.round(step / 1000)}k+`;
}
