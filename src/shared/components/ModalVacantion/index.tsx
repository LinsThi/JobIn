import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, Text, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";

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

  const [vacantionChoosen, setVacantionChoosen] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (isOpened) {
      setVacantionChoosen(vacantionRequired || "");
    }
  }, [isOpened, vacantionRequired]);

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
    <Modal transparent visible={isOpened}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <TouchableWithoutFeedback onPress={handleCloseModalVacantion}>
            <View className="absolute left-0 top-0 h-full w-full" />
          </TouchableWithoutFeedback>

          <View className="flex w-4/5 gap-4 rounded-lg bg-white p-6">
            <Text className="text-center font-inter-bold text-base">
              {type === "create"
                ? "Antes de começar, qual posição você deseja ficar por dentro de atualizações?"
                : "Qual posição você deseja ficar por dentro de atualizações?"}
            </Text>

            <Input
              placeholder="Ex: Desenvolvedor Frontend"
              value={vacantionChoosen}
              onChangeText={handleSetVacantion}
              customContainerClass="bg-[#D9D9D9]"
              maxLength={50}
              functionToClear={() => setVacantionChoosen("")}
            />

            <Button
              title="Salvar"
              onPress={handleSendVacantion}
              customClassName="py-[0.6rem] bg-backgroundButton"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
