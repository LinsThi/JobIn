import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { useModalRemove } from "~/src/shared/components/ModalRemove/store/useModalRemove";
import useUserDetails from "~/src/shared/store/useUserDetails";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { showCustomToast } from "~/src/shared/utils/toast";

export function ModalRemove() {
  const {
    state: { isOpened, vacantion },
    actions: { handleCloseModalVacantion },
  } = useModalRemove();
  const {
    actions: { handleUnsaveVacantion },
  } = useUserDetails();

  return (
    <Modal animationType="slide" transparent visible={isOpened}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="flex w-[75%] gap-4 rounded-lg bg-white p-6">
          <Text className="font-inter-semi-bold text-center text-base">
            Deseja remover essa oportunidade dos salvos?
          </Text>

          <Text className="font-inter-regular text-center text-base">
            Essa ação não poderá ser desfeita.
          </Text>

          <View className="flex flex-row gap-6 pt-4">
            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-[#E8E8E8] p-3"
              onPress={handleCloseModalVacantion}>
              <Text className="font-inter-semibold text-lg text-[#0082FB]">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-[#E8E8E8] p-3"
              onPress={() => {
                handleUnsaveVacantion(vacantion as IVacationProps);
                showCustomToast("Vaga removida dos Salvos");
                handleCloseModalVacantion();
              }}>
              <Text className="font-inter-semibold text-lg text-[#EE171B]">Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
