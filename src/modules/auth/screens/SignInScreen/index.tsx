import { TextInput } from "react-native";
import { YStack } from "tamagui";

import { useSignInScreen } from "./useSignInScreen";
import { authCopy } from "../../auth.copy";
import { AuthLayout } from "../../components/AuthLayout";

import { Button } from "~/src/shared/components/ui/Button";
import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

export function SignInScreen() {
  const { email, onChangeEmail, error, loading, canSubmit, onSubmit } = useSignInScreen();

  return (
    <AuthLayout title={authCopy.signIn.title} subtitle={authCopy.signIn.subtitle}>
      <YStack gap={10}>
        <Text variant="eyebrow">{authCopy.signIn.emailLabel}</Text>

        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          onSubmitEditing={onSubmit}
          placeholder={authCopy.signIn.emailPlaceholder}
          placeholderTextColor={colors["ji-ink-5"]}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="send"
          style={{
            height: 48,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: error ? colors["ji-orange-500"] : colors["ji-border-2"],
            backgroundColor: colors["ji-white"],
            paddingHorizontal: 14,
            fontFamily: "Poppins_500Medium",
            fontSize: 14,
            color: colors["ji-navy-900"],
          }}
        />

        {error ? (
          <Text variant="cardMeta" color="$ji-orange-500">
            {error}
          </Text>
        ) : null}
      </YStack>

      <Button
        label={loading ? authCopy.signIn.submitting : authCopy.signIn.submit}
        onPress={onSubmit}
        disabled={!canSubmit}
        loading={loading}
      />
    </AuthLayout>
  );
}

export default SignInScreen;
