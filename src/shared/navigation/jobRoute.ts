import { Job } from "~/src/shared/domain/job";

/**
 * The job detail screen has no single-job endpoint yet, so it receives the whole
 * job through navigation params. Both the encode (navigators) and decode (the
 * screen) live here so the transport contract stays in one place.
 */
export function jobDetailHref(job: Job) {
  return {
    pathname: "/job/[id]" as const,
    params: { id: job.id, job: JSON.stringify(job) },
  };
}

export function parseJobParam(raw: string | undefined): Job | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Job;
  } catch {
    return null;
  }
}
