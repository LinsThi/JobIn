import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, ToastAndroid, View } from "react-native";

import { Button } from "~/src/shared/components/Button";
import { Input } from "~/src/shared/components/Input";
import { useModalVacation } from "~/src/shared/components/ModalVacantion/store/useModalVacantion";
import useAppStatus from "~/src/shared/store/useAppStatus";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { showCustomToast } from "~/src/shared/utils/toast";

export function ModalVacantion() {
  const {
    state: { isOpened, type },
    actions: { handleCloseModalVacantion },
  } = useModalVacation();
  const {
    state: { vacantionRequired },
    actions: { handleChangeVacantion },
  } = useUserDetails();
  const {
    actions: { handleChangeFirstOpenedApp },
  } = useAppStatus();

  const [vacantionChoosen, setVacantionChoosen] = useState(vacantionRequired);

  const router = useRouter();

  const handleSetVacantion = (value: string) => {
    setVacantionChoosen(value);
  };

  const handleSendVacantion = () => {
    if (vacantionChoosen.length < 6) {
      return ToastAndroid.show("Digite uma vaga válida", ToastAndroid.SHORT);
    }

    handleChangeVacantion(vacantionChoosen);
    handleCloseModalVacantion();
    handleChangeFirstOpenedApp();

    showCustomToast("Prefêrencias atualizadas");
    return router.push("/(tabs)");
  };

  return (
    <Modal animationType="slide" transparent visible={isOpened}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="flex w-4/5 gap-4 rounded-lg bg-white p-6">
          <Text className="font-inter-bold text-center text-base">
            {type === "create"
              ? "Antes de começar, qual posição você deseja ficar por dentro de atualizações?"
              : "Qual posição você deseja ficar por dentro de atualizações?"}
          </Text>

          <Input
            placeholder="Ex: Desenvolvedor Frontend"
            value={vacantionChoosen}
            onChangeText={handleSetVacantion}
            customContainerClass="bg-[#D9D9D9]"
          />

          <Button title="Salvar" onPress={handleSendVacantion} customClassName="py-[0.6rem]" />
        </View>
      </View>
    </Modal>
  );
}
