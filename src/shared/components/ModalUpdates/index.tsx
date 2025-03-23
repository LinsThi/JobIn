import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Loading } from "~/src/shared/components/Loading";
import useAppStatus from "~/src/shared/store/useAppStatus";

const releaseNotes = [""];

export default function UpdatesDemo() {
  const { isDownloading } = Updates.useUpdates();
  const {
    state: { showChangesUpdates },
    actions: { handleChangeShowUpdates },
  } = useAppStatus();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        Alert.alert(
          "Vamos ver",
          `update: ${update.isAvailable} rollback: ${update.isRollBackToEmbedded}`
        );

        if (update.isAvailable || showChangesUpdates) {
          setModalVisible(true);
        }
      } catch (error) {
        console.error("Erro ao verificar atualização:", error);
      }
    };

    checkUpdate();
  }, [showChangesUpdates]);

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync(); // Baixa a atualização
      await Updates.reloadAsync(); // Recarrega a aplicação
      handleChangeShowUpdates(true); // Marca que a atualização foi aplicada
    } catch (error) {
      console.error("Erro ao atualizar o aplicativo:", error);
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="relative w-4/5 rounded-2xl bg-background p-6 pt-8 shadow-lg dark:bg-background-dark">
          {showChangesUpdates ? (
            <>
              <Text className="mb-4 text-center font-inter-bold text-2xl font-bold text-fontDefault dark:text-fontDefault-dark">
                Novidades da atualização
              </Text>

              <ScrollView className="h-32">
                {releaseNotes.map((note, index) => (
                  <Text key={index} className="flex-row items-center text-lg">
                    <Text className="text-2xl">• </Text>
                    {note}
                  </Text>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={() => {
                  handleChangeShowUpdates(false);
                  setModalVisible(false);
                }}
                className="dark:bg-primary-dark mt-4 flex h-12 items-center justify-center rounded-lg bg-backgroundButton dark:bg-backgroundButton-dark">
                <Text className="text-white">Fechar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className="mb-4 text-center font-inter-bold text-2xl font-bold text-fontDefault dark:text-fontDefault-dark">
                Nova versão disponível!
              </Text>

              <Text className="mb-4 text-center font-inter-regular text-base text-fontTertiary dark:text-fontTertiary-dark">
                Experimente a nova versão com melhorias, desempenho aprimorado e novos recursos!
              </Text>

              <TouchableOpacity
                onPress={handleUpdate}
                className="dark:bg-primary-dark flex h-12 items-center justify-center rounded-lg bg-backgroundButton dark:bg-backgroundButton-dark">
                {isDownloading ? (
                  <Loading size="small" color="#fff" />
                ) : (
                  <Text className="text-white">Atualizar agora</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </Modal>
  );
}
