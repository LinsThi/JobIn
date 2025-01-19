import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";

import splashScreen from "../assets/animations/splash_animation.json";

import useAppStatus from "~/src/shared/store/useAppStatus";

export default function SplashScreen() {
  const router = useRouter();
  const {
    state: { alreadyOpenedApp },
  } = useAppStatus();

  const finishAnimation = () => {
    router.push(alreadyOpenedApp ? "/(tabs)" : "/welcome");
  };

  return (
    <View className="flex flex-1 items-center justify-center bg-foreground-dark">
      <LottieView
        source={splashScreen}
        style={{ width: "40%", height: "40%" }}
        autoPlay
        loop={false}
        onAnimationFinish={finishAnimation}
        duration={5000}
      />
    </View>
  );
}
