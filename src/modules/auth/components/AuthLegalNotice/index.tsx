import { YStack } from "tamagui";

import { authCopy } from "../../auth.copy";

import { Text } from "~/src/shared/components/ui/Text";

export function AuthLegalNotice() {
  return (
    <YStack style={{ paddingTop: 28 }}>
      <Text variant="cardMeta" style={{ textAlign: "center" }}>
        {authCopy.signIn.legal.prefix}
        <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-700">
          {authCopy.signIn.legal.terms}
        </Text>
        {authCopy.signIn.legal.middle}
        <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-700">
          {authCopy.signIn.legal.privacy}
        </Text>
        {authCopy.signIn.legal.suffix}
      </Text>
    </YStack>
  );
}
