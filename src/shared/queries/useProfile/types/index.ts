export type Profile = {
  skills: string[];
  trackedCategories: string[];
};

/** Row shape as stored in Supabase (snake_case). */
export type ProfileRow = {
  skills: string[] | null;
  tracked_categories: string[] | null;
};

export const EMPTY_PROFILE: Profile = { skills: [], trackedCategories: [] };

export const MAX_TRACKED_CATEGORIES = 3;

export function isProfileComplete(profile: Profile): boolean {
  return profile.skills.length > 0 && profile.trackedCategories.length > 0;
}
