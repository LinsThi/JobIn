import { Image } from "react-native";
import { YStack } from "tamagui";

import { authCopy } from "../../auth.copy";

import appIcon from "~/src/assets/app_logo/icon.png";
import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

/**
 * Icon + wordmark shown above the email field. `paddingTop` is scaled to
 * `AuthWave`'s height so the block bottoms out where the wave fades — see
 * that component's comment for the scale factor if either one changes.
 */
export function SignInHero() {
  return (
    <YStack items="center" style={{ paddingTop: 93 }}>
      <YStack
        rounded={24}
        style={{
          shadowColor: colors["ji-navy-900"],
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.35,
          shadowRadius: 18,
          elevation: 10,
        }}>
        <Image
          source={appIcon}
          accessibilityLabel={authCopy.signIn.title}
          style={{ width: 76, height: 76, borderRadius: 24 }}
        />
      </YStack>
      <Text variant="brand" style={{ fontSize: 30, letterSpacing: -1, marginTop: 22 }}>
        JobIn
      </Text>
    </YStack>
  );
}
