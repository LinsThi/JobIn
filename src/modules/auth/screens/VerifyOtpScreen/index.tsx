import { useVerifyOtpScreen } from "./useVerifyOtpScreen";
import { authCopy } from "../../auth.copy";
import { AuthLayout } from "../../components/AuthLayout";
import { OtpField } from "../../components/OtpField";
import { VerifyOtpActions } from "../../components/VerifyOtpActions";

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
      subtitle={
        <>
          {authCopy.verify.subtitlePrefix}
          <Text variant="subtitle" fontFamily="$semibold" color="$ji-navy-600">
            {email}
          </Text>
          {authCopy.verify.subtitleSuffix}
        </>
      }
      onBack={goBack}>
      <OtpField
        value={code}
        onChange={onChangeCode}
        onComplete={onComplete}
        disabled={loading}
        error={error}
      />

      <VerifyOtpActions
        loading={loading}
        canSubmit={canSubmit}
        onSubmit={onSubmit}
        cooldown={cooldown}
        onResend={onResend}
      />
    </AuthLayout>
  );
}

export default VerifyOtpScreen;
