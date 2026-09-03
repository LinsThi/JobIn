import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase is used for two things only: email-OTP auth and the `profiles` table
 * (skills + tracked categories). See docs/SUPABASE_AUTH.md.
 *
 * `flowType: "implicit"` — the PKCE flow needs a redirect URL and buys us nothing
 * for a 6-digit OTP. `detectSessionInUrl: false` — there is no URL to parse in a
 * native app.
 */
const rawUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!rawUrl || !supabaseKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
      "Copy .env.example to .env and fill them in — see docs/SUPABASE_AUTH.md."
  );
}

// The value pasted from the dashboard sometimes carries a REST path — supabase-js
// wants only the project origin (`https://xxxx.supabase.co`).
const supabaseUrl = rawUrl
  .trim()
  .replace(/\/(rest|auth|storage)\/v1\/?$/, "")
  .replace(/\/+$/, "");

if (supabaseKey.startsWith("sb_secret_") || supabaseKey.startsWith("service_role")) {
  throw new Error(
    "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY looks like a SECRET key. Never ship the " +
      "secret/service_role key in the app — use the publishable (sb_publishable_...) key."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "implicit",
  },
});
