import { useRouter } from "expo-router";
import { useState } from "react";

import { EMAIL_REGEX } from "../../auth.constants";
import { authCopy } from "../../auth.copy";

import { supabase } from "~/src/shared/services/supabase";

export function useSignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const trimmed = email.trim();
  const canSubmit = EMAIL_REGEX.test(trimmed) && !loading;

  const onChangeEmail = (next: string) => {
    setEmail(next);
    if (error) setError(null);
  };

  const onSubmit = async () => {
    if (!EMAIL_REGEX.test(trimmed)) {
      setError(authCopy.signIn.invalidEmail);
      return;
    }

    setLoading(true);
    setError(null);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { shouldCreateUser: true },
    });

    setLoading(false);

    if (otpError) {
      setError(authCopy.signIn.genericError);
      return;
    }

    router.push({ pathname: "/(auth)/verify", params: { email: trimmed } });
  };

  return { email, onChangeEmail, error, loading, canSubmit, onSubmit };
}
