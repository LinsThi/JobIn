import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, ToastAndroid, View } from "react-native";

import { Button } from "~/src/shared/components/Button";
import { Input } from "~/src/shared/components/Input";
import { useModalVacation } from "~/src/shared/components/ModalVacantion/store/useModalVacantion";
import useAppStatus from "~/src/shared/store/useAppStatus";
import useUserDetails from "~/src/shared/store/useUserDetails";

export function ModalVacantion() {
  const {
    state: { isOpened },
    actions: { handleCloseModalVacantion },
  } = useModalVacation();
  const {
    actions: { handleChangeVacantion },
  } = useUserDetails();
  const {
    actions: { handleChangeFirstOpenedApp },
  } = useAppStatus();

  const [vacantion, setVacantion] = useState("");

  const router = useRouter();

  const handleSetVacantion = (value: string) => {
    setVacantion(value);
  };

  const handleSendVacantion = () => {
    if (vacantion.length < 6) {
      return ToastAndroid.show("Digite uma vaga válida", ToastAndroid.SHORT);
    }

    handleChangeVacantion(vacantion);
    handleCloseModalVacantion();
    handleChangeFirstOpenedApp();

    ToastAndroid.show("Vaga salva com sucesso", ToastAndroid.SHORT);
    return router.push("/(tabs)/home");
  };

  return (
    <Modal animationType="slide" transparent visible={isOpened}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="flex w-4/5 gap-4 rounded-lg bg-white p-6">
          <Text className="text-center text-base font-bold">
            Antes de começar, qual vaga você deseja ficar por dentro de atualizações?
          </Text>

          <Input placeholder="Ex: Desenvolvedor Frontend" onChangeText={handleSetVacantion} />

          <Button title="Salvar" onPress={handleSendVacantion} customClassName="py-3" />
        </View>
      </View>
    </Modal>
  );
}
