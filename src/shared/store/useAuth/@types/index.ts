import { Session } from "@supabase/supabase-js";

/**
 * - `loading`      — restoring the session / waiting for the profile query
 * - `signedOut`    — no session, show the auth stack
 * - `needsProfile` — signed in but skills/categories not filled out yet
 * - `ready`        — signed in with a complete profile
 */
export type AuthStatus = "loading" | "signedOut" | "needsProfile" | "ready";

export type StateProps = {
  status: AuthStatus;
  session: Session | null;
  userId: string | null;
};

export type ActionProps = {
  /** Feed every `getSession()` / `onAuthStateChange` result through here. */
  setSession: (session: Session | null) => void;
  /** Called by `useProfile` once the row is known. */
  setProfileComplete: (complete: boolean) => void;
};

export type StoreProps = {
  state: StateProps;
  actions: ActionProps;
};

export const initialStateAuth: StateProps = {
  status: "loading",
  session: null,
  userId: null,
};
