import { YStack } from "tamagui";

import { authCopy } from "../../auth.copy";

import { Button } from "~/src/shared/components/ui/Button";

type Props = {
  loading: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
  cooldown: number;
  onResend: () => void;
};

export function VerifyOtpActions({ loading, canSubmit, onSubmit, cooldown, onResend }: Props) {
  return (
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
  );
}
