import Feather from "@expo/vector-icons/Feather";
import { YStack } from "tamagui";

import { useSignInScreen } from "./useSignInScreen";
import { authCopy } from "../../auth.copy";
import { AuthLegalNotice } from "../../components/AuthLegalNotice";
import { EmailField } from "../../components/EmailField";
import { SignInHero } from "../../components/SignInHero";
import { SignInLayout } from "../../components/SignInLayout";

import { Button } from "~/src/shared/components/ui/Button";
import { useScreenBackground } from "~/src/shared/hooks/useScreenBackground";
import colors from "~/src/shared/theme/colors";

export function SignInScreen() {
  const { email, onChangeEmail, error, loading, canSubmit, onSubmit } = useSignInScreen();

  // The rest of the app sits on `$ji-bg-app`; this screen is the white hero,
  // so the status-bar strip above it needs to match while it's focused.
  useScreenBackground(colors["ji-navy-700"]);

  return (
    <SignInLayout>
      <SignInHero />

      <YStack style={{ flex: 1, justifyContent: "center" }}>
        <EmailField value={email} onChangeText={onChangeEmail} onSubmit={onSubmit} error={error} />

        <YStack style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            label={loading ? authCopy.signIn.submitting : authCopy.signIn.submit}
            onPress={onSubmit}
            disabled={!canSubmit}
            loading={loading}
            iconPosition="end"
            icon={<Feather name="arrow-right" size={16} color={colors["ji-white"]} />}
          />
        </YStack>
      </YStack>

      <AuthLegalNotice />
    </SignInLayout>
  );
}

export default SignInScreen;
