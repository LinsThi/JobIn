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

export interface SearchStatusDTO {
  jobId: string;
  status: SearchJobStatus;
  error?: string;
}
