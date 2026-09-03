# Supabase auth + profile setup

JobIn uses Supabase for two things only:

1. **Authentication** — email-only, 6-digit OTP (no password, no magic link).
2. **The `profiles` table** — the user's `skills` and up to 3 `tracked_categories`,
   so the setup survives a phone switch.

Everything else (saved job openings, followed platforms, recent searches) stays in
on-device storage.

## One-time project setup

### 1. Create the project

Create a project at https://supabase.com.

### 2. Custom SMTP (Resend)

The built-in email service can't send a 6-digit code (its templates aren't editable
on the free plan) and is capped at ~2 emails/hour. A custom SMTP provider fixes both.
Resend's free tier (3k emails/month) is enough.

1. Sign up at https://resend.com.
2. **Domains → Add Domain** and follow the DNS steps to verify a domain you own
   (needed to send to arbitrary inboxes). For a quick test you can skip this and use
   the sender `onboarding@resend.dev`, but Resend will then only deliver to the
   address you signed up with.
3. **API Keys → Create API Key** (sending access is enough). Copy the `re_...` value.
4. In Supabase: **Project Settings → Authentication → SMTP Settings** → enable
   **Custom SMTP** and fill in:

   | Field        | Value                                                  |
   | ------------ | ------------------------------------------------------ |
   | Sender email | `no-reply@yourdomain.com` (or `onboarding@resend.dev`) |
   | Sender name  | `JobIn`                                                |
   | Host         | `smtp.resend.com`                                      |
   | Port         | `465`                                                  |
   | Username     | `resend`                                               |
   | Password     | your `re_...` API key                                  |

5. **Authentication → Rate Limits** → raise "Rate limit for sending emails" from the
   default (e.g. to 30/hour) now that a real provider is behind it.

### 3. Email provider + templates

1. **Authentication → Providers → Email**: enable _Email_ and **turn OFF "Confirm
   email"**. The OTP already proves the person controls the inbox, so a separate
   confirmation step is redundant — and while it's on, a brand-new user gets the
   "Confirm signup" _link_ email instead of a code.
2. **Authentication → Emails → Templates**: edit the body of **both** "Magic Link"
   **and** "Confirm signup" (`signInWithOtp` uses "Magic Link" for returning users and
   "Confirm signup" for the first sign-up) so each shows the code:

   ```html
   <h2>Seu código de acesso ao JobIn</h2>
   <p>Use o código abaixo para entrar. Ele expira em 1 hora.</p>
   <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px">{{ .Token }}</p>
   ```

   As long as `{{ .Token }}` is present (and `{{ .ConfirmationURL }}` is removed), the
   email carries a 6-digit code instead of a link.

### 4. Database

**SQL editor** → run `supabase/migrations/0001_profiles.sql`.

### 5. App env

**Project Settings → API keys** → copy into the app's `.env` (see `.env.example`):

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

- **URL**: the project origin only — no `/rest/v1` (or any) path suffix.
- **Key**: the **publishable** key (`sb_publishable_...`, or the legacy `anon` JWT
  `eyJ...`). **Never** the `sb_secret_...` / `service_role` key — it grants full admin
  access and must not ship in a client app. If you pasted a secret key anywhere,
  rotate it under Project Settings → API keys.

Restart the Expo dev server after changing `.env` (env is inlined at bundle time).

## Notes

- `flowType: "implicit"` is used in `src/shared/services/supabase.ts` — the PKCE flow
  needs a redirect and is unnecessary for OTP.
- `verifyOtp` is tried with `type: "email"` then `type: "signup"`, so it works whether
  or not "Confirm email" is left on.
- RLS makes every `profiles` row readable/writable only by its owner. With the
  publishable key and no session, `select * from profiles` returns 0 rows.
- "Profile complete" is derived in the app (`skills.length > 0 && tracked_categories.length > 0`),
  not stored.
