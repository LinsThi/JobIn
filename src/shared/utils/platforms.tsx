import { Image, View } from "react-native";

import InfoJobsShortLogo from "~/src/assets/images/injojobs_short.jpg";
import LinkedinShortLogo from "~/src/assets/images/linkedin_short.webp";
import TrabalhaBrasilShortLogo from "~/src/assets/images/trabalhabrasil_short.png";
import InfojobsLongLogo from "~/src/assets/svg/infojobs_logo.svg";
import LinkedinLongLogo from "~/src/assets/svg/linkedin_logo.svg";
import TrabalhaBrasilLongLogo from "~/src/assets/svg/trabalhaBrasil_logo.svg";

export const LONG_LOGOS = {
  InfoJobsLongLogo: (
    <View className="pt-2">
      <InfojobsLongLogo width={50} height={30} />
    </View>
  ),
  LinkedInLongLogo: <LinkedinLongLogo width={60} height={30} />,

  TrabalhaBrasilLongLogo: <TrabalhaBrasilLongLogo width={50} height={30} />,
};

export const SHORT_LOGOS = {
  InfoJobsShortLogo: <Image className="h-12 w-12 rounded-full" source={InfoJobsShortLogo} />,
  LinkedinShortLogo: <Image className="h-12 w-12 rounded-full" source={LinkedinShortLogo} />,
  TrabalhaBrasilShortLogo: (
    <Image className="h-12 w-12 rounded-full" source={TrabalhaBrasilShortLogo} />
  ),
};

export type PlataformProps = {
  name: string;
  shortLogo: string;
  longLogo: string;
  description: string;
};

export const PLATFORMS = {
  LinkedIn: {
    name: "LinkedIn",
    shortLogo: "LinkedinShortLogo",
    longLogo: "LinkedinLongLogo",
    description: "Plataforma oficial do LinkedIn, feita para buscar novas vagas.",
  },
  InfoJobs: {
    name: "InfoJobs",
    shortLogo: "InfoJobsShortLogo",
    longLogo: "InfoJobsLongLogo",
    description: "Plataforma oficial do InfoJobs, feita para buscar novas vagas.",
  },
  TrabalhaBrasil: {
    name: "TrabalhaBrasil",
    shortLogo: "TrabalhaBrasilShortLogo",
    longLogo: "TrabalhaBrasilLongLogo",
    description: "Plataforma oficial da Trabalha Brasil, feita para buscar nov",
  },
};
