import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { OTP_LENGTH, RESEND_COOLDOWN_SECONDS } from "../../auth.constants";
import { authCopy } from "../../auth.copy";

import { supabase } from "~/src/shared/services/supabase";
import { showCustomToast } from "~/src/shared/utils/toast";

export function useVerifyOtpScreen() {
  const router = useRouter();
  const { email = "" } = useLocalSearchParams<{ email?: string }>();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onChangeCode = (next: string) => {
    setCode(next);
    if (error) setError(null);
  };

  const verify = useCallback(
    async (token: string) => {
      if (submittingRef.current || token.length !== OTP_LENGTH || !email) return;
      submittingRef.current = true;
      setLoading(true);
      setError(null);

      // Returning users get a "magic link" OTP (`email`); a brand-new user whose
      // project still has "Confirm email" on gets a "signup" OTP. Try both.
      let { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      if (verifyError) {
        ({ error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token,
          type: "signup",
        }));
      }

      submittingRef.current = false;
      setLoading(false);

      // On success `onAuthStateChange` flips the auth status and the root guard
      // swaps this stack out — nothing to navigate here.
      if (verifyError) {
        setCode("");
        setError(
          verifyError.status === 403 || verifyError.status === 401
            ? authCopy.verify.invalidCode
            : authCopy.verify.genericError
        );
      }
    },
    [email]
  );

  const onResend = async () => {
    if (cooldown > 0 || !email) return;
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setError(null);

    const { error: resendError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (resendError) {
      setError(authCopy.verify.genericError);
      return;
    }
    showCustomToast(authCopy.verify.resent);
  };

  return {
    email,
    code,
    onChangeCode,
    error,
    loading,
    cooldown,
    canSubmit: code.length === OTP_LENGTH && !loading,
    onSubmit: () => verify(code),
    onComplete: verify,
    onResend,
    goBack: () => router.back(),
  };
}
