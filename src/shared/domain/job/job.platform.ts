export type JobPlatformId =
  | "linkedin"
  | "gupy"
  | "infojobs"
  | "catho"
  | "trabalhabrasil"
  | "unknown";

export type JobAccent = {
  background: string;
  shadow: string;
};

export type JobPlatformMeta = {
  id: JobPlatformId;
  name: string;
  /** 2-letter monogram used on logo chips. */
  mono: string;
  /** Brand color (external platform identity, not a theme token). */
  color: string;
  accent: JobAccent;
};

export const JOB_PLATFORMS: Record<JobPlatformId, JobPlatformMeta> = {
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    mono: "in",
    color: "#219EBC",
    accent: { background: "#219EBC", shadow: "rgba(33,158,188,0.6)" },
  },
  gupy: {
    id: "gupy",
    name: "Gupy",
    mono: "Gy",
    color: "#023047",
    accent: { background: "#023047", shadow: "rgba(2,48,71,0.6)" },
  },
  infojobs: {
    id: "infojobs",
    name: "InfoJobs",
    mono: "iJ",
    color: "#04699B",
    accent: { background: "#04699B", shadow: "rgba(4,105,155,0.55)" },
  },
  catho: {
    id: "catho",
    name: "Catho",
    mono: "Ca",
    color: "#FB8500",
    accent: { background: "#FB8500", shadow: "rgba(251,133,0,0.5)" },
  },
  trabalhabrasil: {
    id: "trabalhabrasil",
    name: "TrabalhaBrasil",
    mono: "TB",
    color: "#D09500",
    accent: { background: "#D09500", shadow: "rgba(208,149,0,0.5)" },
  },
  unknown: {
    id: "unknown",
    name: "Outra plataforma",
    mono: "??",
    color: "#4A7C90",
    accent: { background: "#175A72", shadow: "rgba(23,90,114,0.5)" },
  },
};

export function normalizePlatformId(raw: string | null | undefined): JobPlatformId {
  const key = (raw ?? "").toLowerCase().replace(/[^a-z]/g, "");

  if (key.includes("linkedin")) return "linkedin";
  if (key.includes("gupy")) return "gupy";
  if (key.includes("infojobs")) return "infojobs";
  if (key.includes("catho")) return "catho";
  if (key.includes("trabalhabrasil")) return "trabalhabrasil";

  return "unknown";
}

export function getPlatformMeta(id: JobPlatformId): JobPlatformMeta {
  return JOB_PLATFORMS[id] ?? JOB_PLATFORMS.unknown;
}
