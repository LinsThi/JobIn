/* eslint-disable import/order */
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { StoreProps, initialStateAuth } from "./@types";

/**
 * Session state mirrored from supabase-js. Not persisted — supabase-js already
 * persists the session via MMKV (see `supabase.ts`); this store just makes it
 * reactive and layers in the "needs profile" gate (set by `useProfile`).
 */
const useAuth = create<StoreProps>()((set, get) => ({
  state: initialStateAuth,
  actions: {
    setSession: (session: Session | null) => {
      const nextUserId = session?.user.id ?? null;

      if (!session) {
        set({ state: { status: "signedOut", session: null, userId: null } });
        return;
      }

      const { status: prevStatus, userId: prevUserId } = get().state;
      // Token refreshes for the same user must not bounce back to "loading".
      const keepResolvedStatus =
        prevUserId === nextUserId && (prevStatus === "ready" || prevStatus === "needsProfile");

      set({
        state: {
          status: keepResolvedStatus ? prevStatus : "loading",
          session,
          userId: nextUserId,
        },
      });
    },
    setProfileComplete: (complete: boolean) => {
      if (!get().state.session) return;
      set((prev) => ({
        state: { ...prev.state, status: complete ? "ready" : "needsProfile" },
      }));
    },
  },
}));

export default useAuth;
