import { View } from "react-native";

import GupyLongLogo from "~/src/assets/svg/gupy_logo.svg";
import InfojobsLongLogo from "~/src/assets/svg/infojobs_logo.svg";

export const LONG_LOGOS = {
  GupyLongLogo: <GupyLongLogo width={50} height={30} />,
  InfoJobsLongLogo: (
    <View className="pt-2">
      <InfojobsLongLogo width={50} height={30} />
    </View>
  ),
};

export type PlataformProps = {
  name: string;
  shortLogo: string;
  longLogo: string;
  description: string;
};

export const PLATFORMS = {
  Gupy: {
    name: "Gupy",
    shortLogo: "https://raichu-uploads.s3.amazonaws.com/logo_gupy_Fkctg7.png",
    longLogo: "GupyLongLogo",
    description: "Plataforma oficial da Gupy, feita para buscar novas vagas.",
  },
  InfoJobs: {
    name: "InfoJobs",
    shortLogo:
      "https://yt3.googleusercontent.com/TWGupP3fyLSSwXq3ViIt3qDZhzdI0rKNR5BvaH-VcZrtsUu_PU8N5yv-wdECxlKR-RWdw_VIgg=s900-c-k-c0x00ffffff-no-rj",
    longLogo: "InfoJobsLongLogo",
    description: "Plataforma oficial da Gupy, feita para buscar novas vagas.",
  },
};
