import { YStack } from "tamagui";

import { useVerifyOtpScreen } from "./useVerifyOtpScreen";
import { authCopy } from "../../auth.copy";
import { AuthLayout } from "../../components/AuthLayout";
import { OtpInput } from "../../components/OtpInput";

import { Button } from "~/src/shared/components/ui/Button";
import { Text } from "~/src/shared/components/ui/Text";

export function VerifyOtpScreen() {
  const {
    email,
    code,
    onChangeCode,
    error,
    loading,
    cooldown,
    canSubmit,
    onSubmit,
    onComplete,
    onResend,
    goBack,
  } = useVerifyOtpScreen();

  return (
    <AuthLayout
      title={authCopy.verify.title}
      subtitle={authCopy.verify.subtitle(email)}
      onBack={goBack}>
      <YStack gap={12}>
        <OtpInput value={code} onChange={onChangeCode} onComplete={onComplete} disabled={loading} />

        {error ? (
          <Text variant="cardMeta" color="$ji-orange-500">
            {error}
          </Text>
        ) : null}
      </YStack>

      <YStack gap={8}>
        <Button
          label={loading ? authCopy.verify.submitting : authCopy.verify.submit}
          onPress={onSubmit}
          disabled={!canSubmit}
          loading={loading}
        />
        <Button
          label={cooldown > 0 ? authCopy.verify.resendIn(cooldown) : authCopy.verify.resend}
          onPress={onResend}
          disabled={cooldown > 0}
          variant="ghost"
        />
      </YStack>
    </AuthLayout>
  );
}

export default VerifyOtpScreen;
