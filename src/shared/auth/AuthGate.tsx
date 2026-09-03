import { useEffect } from "react";
import { AppState } from "react-native";

import { supabase } from "~/src/shared/services/supabase";
import useAuth from "~/src/shared/store/useAuth";

/**
 * Wires supabase-js into `useAuth`. Mounted once at the root. Renders nothing.
 *
 * - restores the persisted session on launch
 * - keeps the store in sync with sign-in / sign-out / token refresh
 * - drives supabase-js auto-refresh from foreground/background (RN has no
 *   background timers, so this must be toggled by hand — per the supabase docs)
 */
export function AuthGate() {
  const setSession = useAuth((store) => store.actions.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const appState = AppState.addEventListener("change", (next) => {
      if (next === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    if (AppState.currentState === "active") {
      supabase.auth.startAutoRefresh();
    }

    return () => {
      sub.subscription.unsubscribe();
      appState.remove();
      supabase.auth.stopAutoRefresh();
    };
  }, [setSession]);

  return null;
}
