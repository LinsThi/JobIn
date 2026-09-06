/**
 * Wire types for the async job-search endpoints:
 *
 *   GET /jobs/search?page=&pageSize=  -> 200 SearchPageDTO      (cache hit, paginated)
 *                                    -> 202 EnqueuedSearchDTO   (scraping queued)
 *   GET /jobs/search/status/:id       -> 200 SearchStatusDTO
 *
 * These mirror the backend `NormalizedJob` contract. Map them into the domain
 * `Job` before handing anything to the UI.
 */

/** Skill-match summary, present only when the request carried a `skills` param. */
export interface JobMatchDTO {
  /** 0–100. With only desired skills it lands in 70–100 (70 = no skill hit). */
  score: number;
  matchedSkills: string[];
  missingRequiredSkills: string[];
  explanation: string;
}

export interface NormalizedJobDTO {
  id: string;
  title: string;
  company: string;
  location: {
    raw: string;
    city?: string;
    state?: string;
    country?: string;
  };
  salary: {
    raw: string;
    min?: number;
    max?: number;
    currency?: string;
  };
  workModel?: string;
  contractType?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  url: string;
  platform: string;
  publishedAt?: string;
  match?: JobMatchDTO;
}

export type SearchSourceStatus = {
  status: "success" | "error";
  error?: string;
};

/** One page of a search's results (`GET /jobs/search`, 200). */
export interface SearchPageDTO {
  data: NormalizedJobDTO[];
  meta: { page: number; pageSize: number; total: number };
  sources: Record<string, SearchSourceStatus>;
  statistics?: unknown;
}

export interface EnqueuedSearchDTO {
  jobId: string;
  status: "queued";
  duplicate: boolean;
}

export type SearchJobStatus = "queued" | "processing" | "completed" | "failed";

export type ProviderOutcome = "success" | "error";

/** Which sources have answered so far while the job is still processing. */
export interface SearchProgress {
  platforms: Record<string, ProviderOutcome>;
}

export interface SearchStatusDTO {
  jobId: string;
  status: SearchJobStatus;
  progress?: SearchProgress;
  error?: string;
}
