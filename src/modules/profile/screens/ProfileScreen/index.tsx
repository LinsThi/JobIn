import Feather from "@expo/vector-icons/Feather";
import { ActivityIndicator } from "react-native";
import { YStack } from "tamagui";

import { useProfileScreen } from "./useProfileScreen";
import { profileCopy } from "../../profile.copy";

import { TagInput } from "~/src/shared/components/TagInput";
import { Button } from "~/src/shared/components/ui/Button";
import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Screen } from "~/src/shared/components/ui/Screen";
import { Text } from "~/src/shared/components/ui/Text";
import { MAX_TRACKED_CATEGORIES } from "~/src/shared/queries/useProfile/types";

export function ProfileScreen() {
  const {
    isSetup,
    email,
    loadingProfile,
    skills,
    setSkills,
    categories,
    setCategories,
    canSave,
    saving,
    onSave,
    onSignOut,
    goBack,
  } = useProfileScreen();

  return (
    <Screen gap={24}>
      {!isSetup ? (
        <IconButton tone="fill" onPress={goBack}>
          <Feather name="chevron-left" size={16} color="#023047" />
        </IconButton>
      ) : null}

      <YStack gap={6}>
        <Text variant="display">{isSetup ? profileCopy.setupTitle : profileCopy.editTitle}</Text>
        <Text variant="subtitle">
          {isSetup ? profileCopy.setupSubtitle : profileCopy.editSubtitle}
        </Text>
      </YStack>

      {email ? (
        <YStack gap={4}>
          <Text variant="eyebrow">Conta</Text>
          <Text variant="cardMeta" color="$ji-navy-600">
            {email}
          </Text>
        </YStack>
      ) : null}

      {loadingProfile ? (
        <ActivityIndicator color="#219EBC" style={{ marginTop: 24 }} />
      ) : (
        <>
          <YStack gap={10}>
            <Text variant="eyebrow">{profileCopy.skillsLabel}</Text>
            <TagInput
              value={skills}
              onChange={setSkills}
              placeholder={profileCopy.skillsPlaceholder}
            />
          </YStack>

          <YStack gap={10}>
            <Text variant="eyebrow">{profileCopy.categoriesLabel}</Text>
            <TagInput
              value={categories}
              onChange={setCategories}
              placeholder={profileCopy.categoriesPlaceholder}
              maxTags={MAX_TRACKED_CATEGORIES}
            />
          </YStack>

          <Button
            label={
              saving ? profileCopy.saving : isSetup ? profileCopy.saveAndContinue : profileCopy.save
            }
            onPress={onSave}
            disabled={!canSave}
            loading={saving}
          />

          {!isSetup ? (
            <Button label={profileCopy.signOut} onPress={onSignOut} variant="ghost" />
          ) : null}
        </>
      )}
    </Screen>
  );
}

export default ProfileScreen;
