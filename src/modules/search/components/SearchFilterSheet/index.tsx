import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { XStack, YStack } from "tamagui";

import {
  CONTRACT_TYPES,
  EMPTY_FILTERS,
  SALARY_STEPS,
  SEARCH_PLATFORMS,
  SEARCH_STATES,
  SearchFilters,
  WORK_MODELS,
  salaryStepLabel,
} from "../../search.constants";
import { searchCopy } from "../../search.copy";

import { FilterSection } from "./FilterSection";
import { PlatformRow } from "./PlatformRow";
import { SearchFilterSheetProps } from "./types";

import { ChoiceChip } from "~/src/shared/components/ui/ChoiceChip";
import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function SearchFilterSheet({ open, filters, onClose, onApply }: SearchFilterSheetProps) {
  const [draft, setDraft] = useState<SearchFilters>(filters);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  return (
    <Modal
      visible={open}
      transparent
      statusBarTranslucent
      animationType="slide"
      onRequestClose={onClose}>
      <YStack flex={1} style={{ backgroundColor: "rgba(2,48,71,0.42)" }}>
        <YStack flex={1} onPress={onClose} />

        <YStack
          bg="$ji-bg-app"
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, maxHeight: "92%" }}>
          <YStack px={20} pt={14} pb={12}>
            <YStack
              width={38}
              height={4}
              rounded={2}
              bg="$ji-border-3"
              style={{ alignSelf: "center", marginBottom: 14 }}
            />

            <XStack items="center" justify="space-between">
              <Text variant="section" fontSize={17}>
                {searchCopy.filters.title}
              </Text>

              <IconButton size={32} tone="fill" onPress={onClose}>
                <Feather name="x" size={14} color="#023047" />
              </IconButton>
            </XStack>
          </YStack>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 16 }}>
            <FilterSection title={searchCopy.filters.workModel}>
              <XStack gap={8}>
                {WORK_MODELS.map((model) => (
                  <ChoiceChip
                    key={model}
                    label={model}
                    active={draft.workModels.includes(model)}
                    onPress={() =>
                      setDraft((prev) => ({
                        ...prev,
                        workModels: toggle(prev.workModels, model),
                      }))
                    }
                  />
                ))}
              </XStack>
            </FilterSection>

            <FilterSection title={searchCopy.filters.platforms}>
              <YStack gap={8}>
                {SEARCH_PLATFORMS.map((platform) => (
                  <PlatformRow
                    key={platform.id}
                    id={platform.id}
                    speed={platform.speed}
                    active={draft.platforms.includes(platform.id)}
                    onPress={() =>
                      setDraft((prev) => ({
                        ...prev,
                        platforms: toggle(prev.platforms, platform.id),
                      }))
                    }
                  />
                ))}
              </YStack>
            </FilterSection>

            <FilterSection title={searchCopy.filters.location}>
              <XStack flexWrap="wrap" gap={7}>
                {SEARCH_STATES.map((uf) => (
                  <ChoiceChip
                    key={uf}
                    label={uf}
                    variant="square"
                    active={draft.states.includes(uf)}
                    onPress={() =>
                      setDraft((prev) => ({ ...prev, states: toggle(prev.states, uf) }))
                    }
                  />
                ))}
              </XStack>
            </FilterSection>

            <FilterSection title={searchCopy.filters.contract}>
              <XStack gap={8}>
                {CONTRACT_TYPES.map((contract) => (
                  <ChoiceChip
                    key={contract}
                    label={contract}
                    fullWidth
                    active={draft.contracts.includes(contract)}
                    onPress={() =>
                      setDraft((prev) => ({
                        ...prev,
                        contracts: toggle(prev.contracts, contract),
                      }))
                    }
                  />
                ))}
              </XStack>
            </FilterSection>

            <FilterSection title={searchCopy.filters.salary}>
              <XStack flexWrap="wrap" gap={7}>
                {SALARY_STEPS.map((step) => (
                  <ChoiceChip
                    key={step}
                    variant="pill"
                    label={step === 0 ? searchCopy.filters.anySalary : salaryStepLabel(step)}
                    active={draft.salaryMin === step}
                    onPress={() => setDraft((prev) => ({ ...prev, salaryMin: step }))}
                  />
                ))}
              </XStack>
            </FilterSection>
          </ScrollView>

          <XStack
            gap={10}
            px={20}
            pt={14}
            pb={26}
            bg="$ji-white"
            borderTopWidth={1}
            borderColor="$ji-border-1">
            <XStack
              px={20}
              py={15}
              rounded={16}
              items="center"
              justify="center"
              borderWidth={1}
              borderColor="$ji-border-2"
              bg="$ji-white"
              pressStyle={{ opacity: 0.7 }}
              onPress={() => setDraft(EMPTY_FILTERS)}>
              <Text variant="tag" fontSize={13} color="$ji-navy-600">
                {searchCopy.filters.clear}
              </Text>
            </XStack>

            <XStack
              flex={1}
              py={15}
              rounded={16}
              items="center"
              justify="center"
              bg="$ji-teal-500"
              pressStyle={{ scale: 0.98 }}
              onPress={() => onApply(draft)}>
              <Text variant="tag" fontSize={13} color="$ji-white">
                {searchCopy.filters.apply}
              </Text>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
}
