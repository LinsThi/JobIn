import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { XStack } from "tamagui";

import { RequiredUpdateHint } from "./RequiredUpdateHint";

import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";

/**
 * Title + trailing action. Optional update: an "X" that dismisses. Mandatory
 * update: an info icon that reveals `RequiredUpdateHint` instead — there's no
 * way to dismiss a mandatory update.
 *
 * `position: relative` + `zIndex` here matter: RequiredUpdateHint overflows
 * below this row via `position: absolute`, and needs to paint above the
 * "What's new" section, which is this row's *sibling* — zIndex only reorders
 * siblings under the same parent, so it has to live on the row itself, not
 * on something nested inside it.
 */
export function UpdateModalHeader({
  isOptionalToUpdate,
  onDismiss,
}: {
  isOptionalToUpdate: boolean;
  onDismiss: () => void;
}) {
  const [showRequiredHint, setShowRequiredHint] = useState(false);

  return (
    <XStack items="center" justify="space-between" style={{ position: "relative", zIndex: 10 }}>
      <Text variant="section">Nova versão disponível</Text>

      {isOptionalToUpdate ? (
        <IconButton size={32} tone="fill" onPress={onDismiss}>
          <Feather name="x" size={14} color="#023047" />
        </IconButton>
      ) : (
        <IconButton size={32} tone="fill" onPress={() => setShowRequiredHint((prev) => !prev)}>
          <Feather name="info" size={14} color="#023047" />
        </IconButton>
      )}

      {showRequiredHint && <RequiredUpdateHint onDismiss={() => setShowRequiredHint(false)} />}
    </XStack>
  );
}
