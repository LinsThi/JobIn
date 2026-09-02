import Feather from "@expo/vector-icons/Feather";
import { ReactNode, useEffect, useState } from "react";
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

import { IconButton } from "~/src/shared/components/ui/IconButton";
import { Text } from "~/src/shared/components/ui/Text";
import { JobPlatformId, getPlatformMeta } from "~/src/shared/domain/job";

type Props = {
  open: boolean;
  filters: SearchFilters;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <YStack mb={22}>
      <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900" mb={10}>
        {title}
      </Text>
      {children}
    </YStack>
  );
}

type ChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
  grow?: boolean;
  pill?: boolean;
};

function ChoiceChip({ label, active, onPress, grow, pill }: ChipProps) {
  return (
    <XStack
      flex={grow ? 1 : undefined}
      items="center"
      justify="center"
      px={pill ? 13 : 0}
      py={pill ? 9 : 12}
      rounded={pill ? 999 : 14}
      bg={active ? "$ji-fill-accent" : "$ji-white"}
      borderWidth={1}
      borderColor={active ? "$ji-teal-500" : "$ji-border-2"}
      pressStyle={{ opacity: 0.7 }}
      onPress={onPress}>
      <Text
        variant="tag"
        fontSize={pill ? 11.5 : 12}
        color={active ? "$ji-teal-500" : "$ji-navy-600"}>
        {label}
      </Text>
    </XStack>
  );
}

function PlatformRow({
  id,
  speed,
  active,
  onPress,
}: {
  id: JobPlatformId;
  speed: "fast" | "mid" | "slow";
  active: boolean;
  onPress: () => void;
}) {
  const meta = getPlatformMeta(id);

  return (
    <XStack
      items="center"
      gap={12}
      px={14}
      py={12}
      rounded={16}
      bg={active ? "$ji-fill-accent" : "$ji-white"}
      borderWidth={1}
      borderColor={active ? "$ji-teal-500" : "$ji-border-2"}
      pressStyle={{ opacity: 0.8 }}
      onPress={onPress}>
      <YStack
        width={34}
        height={34}
        rounded={11}
        items="center"
        justify="center"
        style={{ backgroundColor: meta.color }}>
        <Text fontFamily="$bold" fontSize={11} color="$ji-white">
          {meta.mono}
        </Text>
      </YStack>

      <YStack flex={1}>
        <Text variant="cardMeta" fontFamily="$semibold" color="$ji-navy-900">
          {meta.name}
        </Text>
        <Text variant="tag" color="$ji-ink-4" mt={2}>
          {searchCopy.speedLabel[speed]}
        </Text>
      </YStack>

      <YStack
        width={20}
        height={20}
        rounded={7}
        items="center"
        justify="center"
        borderWidth={1.5}
        borderColor={active ? "$ji-teal-500" : "$ji-border-check"}
        bg={active ? "$ji-teal-500" : "transparent"}>
        {active ? <Feather name="check" size={11} color="#FFFFFF" /> : null}
      </YStack>
    </XStack>
  );
}

export function SearchFilterSheet({ open, filters, onClose, onApply }: Props) {
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
                    grow
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
                    pill
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
                    grow
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
                    pill
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
