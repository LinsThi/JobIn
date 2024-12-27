/* eslint-disable prettier/prettier */
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";

import LogoIndeed from "~/src/assets/svg/indeed_logo.svg";
import LogoInfoJobs from "~/src/assets/svg/infojobs_logo.svg";
import LogoLinkedin from "~/src/assets/svg/linkedin_logo.svg";
import Logo from "~/src/assets/svg/logo_name.svg";
import useAppStatus from "~/src/shared/store/useAppStatus";

export default function Welcome() {
  const {
    actions: { handleChangeFirstOpenedApp },
  } = useAppStatus();

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
        <Text className="text-foreground-DEFAULT pt-8 text-center text-2xl">
          Encontre vagas de emprego dos mais populares sites de emprego do Brasil!
        </Text>

        <View className="flex flex-row items-center justify-center gap-x-6">
          <LogoIndeed width={100} height={100} />
          <LogoLinkedin width={100} height={100} />
          <LogoInfoJobs width={80} height={80} />
        </View>

        <Link href="/(tabs)/home" asChild>
          <TouchableOpacity
            onPress={handleChangeFirstOpenedApp}
            className="dark:bg-primary-dark flex items-center justify-center rounded-lg bg-blue-300 py-5">
            <Text className="text-lg text-white">Entrar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
