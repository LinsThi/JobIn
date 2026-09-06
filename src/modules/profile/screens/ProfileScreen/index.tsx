import Feather from "@expo/vector-icons/Feather";
import { ActivityIndicator, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { CATEGORY_SUGGESTIONS, SKILL_SUGGESTIONS } from "../../profile.constants";
import { profileCopy } from "../../profile.copy";
import { useProfileScreen } from "./useProfileScreen";
import { setupProgress } from "./utils";

import { TagInput } from "~/src/shared/components/TagInput";
import { Button } from "~/src/shared/components/ui/Button";
import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";
import { MAX_TRACKED_CATEGORIES } from "~/src/shared/store/useUserDetails/@types";
import colors from "~/src/shared/theme/colors";

export function ProfileScreen() {
  const {
    isSetup,
    loadingProfile,
    skills,
    setSkills,
    categories,
    setCategories,
    canSave,
    onSave,
    goBack,
  } = useProfileScreen();

  const insets = useSafeAreaInsets();

  const progressPct = setupProgress(skills.length, categories.length);
  const categoriesAtLimit = categories.length >= MAX_TRACKED_CATEGORIES;

  return (
    <YStack flex={1} bg="$background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 }}>
        <YStack gap={24}>
          {isSetup ? (
            <XStack items="center" gap={5}>
              <XStack flex={1} height={5} rounded={3} bg="$ji-fill-2" overflow="hidden">
                <XStack height="100%" width={`${progressPct}%`} rounded={3} bg="$ji-teal-500" />
              </XStack>
              <Text variant="cardMeta" color="$ji-ink-4">
                {progressPct}%
              </Text>
            </XStack>
          ) : (
            <IconButton tone="fill" onPress={goBack}>
              <Feather name="chevron-left" size={16} color="#023047" />
            </IconButton>
          )}

          <YStack gap={6}>
            <Text variant="display">
              {isSetup ? profileCopy.setupTitle : profileCopy.editTitle}
            </Text>
            <Text variant="subtitle">
              {isSetup ? profileCopy.setupSubtitle : profileCopy.editSubtitle}
            </Text>
          </YStack>

          {loadingProfile ? (
            <ActivityIndicator color="#219EBC" style={{ marginTop: 24 }} />
          ) : (
            <YStack gap={20}>
              <YStack gap={10}>
                <XStack items="baseline" justify="space-between">
                  <Text variant="section">{profileCopy.skillsLabel}</Text>
                  <Text variant="cardMeta" color={skills.length ? "$ji-navy-700" : "$ji-ink-5"}>
                    {profileCopy.skillsCount(skills.length)}
                  </Text>
                </XStack>
                <Text variant="cardMeta">{profileCopy.skillsHelper}</Text>
                <TagInput
                  value={skills}
                  onChange={setSkills}
                  placeholder={profileCopy.skillsPlaceholder}
                  suggestions={SKILL_SUGGESTIONS}
                  icon={<Feather name="zap" size={15} color={colors["ji-ink-5"]} />}
                />
              </YStack>

              <YStack gap={10}>
                <XStack items="baseline" justify="space-between">
                  <Text variant="section">{profileCopy.categoriesLabel}</Text>
                  <Text
                    variant="cardMeta"
                    color={categoriesAtLimit ? "$ji-orange-500" : "$ji-ink-5"}>
                    {profileCopy.categoriesCount(categories.length, MAX_TRACKED_CATEGORIES)}
                  </Text>
                </XStack>
                <Text variant="cardMeta">{profileCopy.categoriesHelper}</Text>
                <TagInput
                  value={categories}
                  onChange={setCategories}
                  placeholder={profileCopy.categoriesPlaceholder}
                  maxTags={MAX_TRACKED_CATEGORIES}
                  suggestions={CATEGORY_SUGGESTIONS}
                  icon={<Feather name="briefcase" size={15} color={colors["ji-ink-5"]} />}
                />
              </YStack>
            </YStack>
          )}
        </YStack>
      </ScrollView>

      {loadingProfile ? null : (
        <YStack
          px={20}
          pt={12}
          pb={insets.bottom + 16}
          bg="$ji-white"
          borderTopWidth={1}
          borderColor="$ji-border-1">
          <Button
            label={isSetup ? profileCopy.saveAndContinue : profileCopy.save}
            onPress={onSave}
            disabled={!canSave}
          />
        </YStack>
      )}
    </YStack>
  );
}

export default ProfileScreen;
