import { YStack } from "tamagui";

import { Text } from "~/src/shared/components/ui/Text";
import colors from "~/src/shared/theme/colors";

/**
 * Speech bubble anchored under the header's info icon (mandatory-update
 * case). Rendered inside the modal's own content on purpose — a Toast lives
 * in the normal view tree, which sits *behind* a native Modal's overlay
 * layer, so it would never be visible here.
 */
export function RequiredUpdateHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <YStack
      items="flex-end"
      style={{ position: "absolute", top: 38, right: 0 }}
      onPress={onDismiss}>
      <YStack
        style={{
          width: 0,
          height: 0,
          marginRight: 10,
          borderLeftWidth: 6,
          borderRightWidth: 6,
          borderBottomWidth: 6,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: colors["ji-navy-900"],
        }}
      />
      <YStack bg="$ji-navy-900" rounded={12} px={14} py={10} style={{ maxWidth: 230 }}>
        <Text variant="tag" color="$ji-white">
          Esta atualização é obrigatória para continuar usando o app
        </Text>
      </YStack>
    </YStack>
  );
}
