import { JobAccent, JobPlatformId } from "./job.platform";

/**
 * Framework-agnostic job model used by every screen.
 * Never expose raw API shapes (IVacationProps) to the UI — map to this first.
 */
export interface Job {
  id: string;
  title: string;
  company: string;
  companyImage?: string | null;
  location: string;
  salaryLabel: string;
  salaryMin?: number;
  workModel?: string;
  contractType?: string;
  seniority?: string;
  /** Human-readable platform name, e.g. "LinkedIn". */
  platform: string;
  platformId: JobPlatformId;
  /** 2-letter monogram for the platform chip. */
  platformMono: string;
  /** Brand color for the platform chip. */
  platformColor: string;
  postedAtLabel: string;
  description?: string;
  requirements: string[];
  benefits: string[];
  url?: string;
  /** Hero-card colors, derived from the platform. */
  accent: JobAccent;
}

export function getJobInitial(job: Pick<Job, "company" | "title">): string {
  const source = job.company || job.title || "?";

  return source.trim().charAt(0).toUpperCase() || "?";
}
