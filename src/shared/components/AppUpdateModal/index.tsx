import { Modal } from "react-native";
import { YStack } from "tamagui";

import { UpdateModalHeader } from "./UpdateModalHeader";

import { Button } from "~/src/shared/components/ui/Button";
import { useAppUpdateCheck } from "~/src/shared/hooks/useAppUpdateCheck";

/**
 * Mount once at the root (see app/_layout.tsx) — checks Google Play for a
 * newer version on open and, if there is one, shows this modal. Android only.
 */
export function AppUpdateModal() {
  const { visible, isOptionalToUpdate, whatsNew, dismiss, confirmUpdate } = useAppUpdateCheck();

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      // Mandatory update: swallow the Android back button instead of closing.
      onRequestClose={isOptionalToUpdate ? dismiss : () => {}}>
      <YStack
        flex={1}
        items="center"
        justify="center"
        px={24}
        style={{ backgroundColor: "rgba(2,48,71,0.42)" }}>
        <YStack
          bg="$ji-bg-app"
          rounded={24}
          p={24}
          gap={16}
          style={{ width: "100%", maxWidth: 360 }}>
          <UpdateModalHeader isOptionalToUpdate={isOptionalToUpdate} onDismiss={dismiss} />

          {whatsNew}

          <YStack mt={8}>
            <Button label="Atualizar agora" onPress={confirmUpdate} />
          </YStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
