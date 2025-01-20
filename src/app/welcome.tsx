/* eslint-disable prettier/prettier */
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import LogoInfoJobs from "~/src/assets/svg/logos/infojobs_logo.svg";
import LogoLinkedin from "~/src/assets/svg/logos/linkedin_logo.svg";
import Logo from "~/src/assets/svg/logos/logo_name.svg";
import LogoTrabalhaBrasil from "~/src/assets/svg/logos/trabalhaBrasil_logo.svg";
import { useModalVacation } from "~/src/shared/components/ModalVacantion/store/useModalVacantion";

export default function Welcome() {
  const {
    actions: { handleOpenModalVacantion },
  } = useModalVacation();

  return (
    <View className="flex flex-1 items-center bg-background px-8 pt-16">
      <Logo />

      <LottieView
        source={require("../assets/animations/job_hiring.json")}
        style={{ width: "100%", height: "45%" }}
        autoPlay
        loop
      />

      <View className="flex-1">
        <Text className="text-foreground-DEFAULT pt-8 text-center font-inter-regular text-2xl">
          Encontre oportunidades dos mais populares sites de emprego do Brasil
        </Text>

        <View className="flex flex-row items-center justify-center gap-x-6">
          <LogoTrabalhaBrasil width={100} height={100} />
          <LogoLinkedin width={100} height={100} />
          <LogoInfoJobs width={80} height={80} />
        </View>

        <TouchableOpacity
          onPress={() => handleOpenModalVacantion("create")}
          className="dark:bg-primary-dark flex items-center justify-center rounded-lg bg-backgroundButton py-5">
          <Text className="text-lg text-white">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
