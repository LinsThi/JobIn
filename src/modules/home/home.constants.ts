/** TODO: replace with the authenticated user's first name once profiles exist. */
export const DEFAULT_USER_NAME = "Marina";

export const NEW_JOBS_PREVIEW_COUNT = 3;

export const RECOMMENDED_PREVIEW_COUNT = 5;

/**
 * Backend match score with desired-only skills is `70 + 30 * (skillsHit / skills)`,
 * so anything above 70 means the job mentioned at least one of the user's skills.
 */
export const HOME_FEED_MATCH_FLOOR = 70;

/** How long the Home job feed stays fresh before a refetch (30 min). */
export const HOME_FEED_STALE_MS = 30 * 60 * 1000;

/** Keep the feed cached across tab navigation for an hour. */
export const HOME_FEED_GC_MS = 60 * 60 * 1000;

/** How often to re-poll `/home/feed` while categories are still scraping. */
export const HOME_FEED_POLL_MS = 3000;

/**
 * Oldest persisted snapshot still worth painting on a cold open (24 h). Beyond
 * that we show skeletons and wait for a fresh result.
 */
export const HOME_FEED_SNAPSHOT_MAX_AGE_MS = 24 * 60 * 60 * 1000;
