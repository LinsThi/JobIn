import { useRef } from "react";

import { RankedSkillProps } from "~/src/shared/queries/useQueryGetVacantionsAddRecently/types";

export const themeColors = {
  light: [
    "#00B0FF", // Azul brilhante
    "#FF4081", // Rosa vibrante
    "#00C853", // Verde vibrante
    "#FF9100", // Amarelo saturado
    "#D500F9", // Roxo intenso
    "#0038B7", // Azul escuro
  ],
  dark: [
    "#2979FF", // Azul profundo
    "#FF4081", // Rosa intenso
    "#7C4DFF", // Roxo elétrico
    "#FF6D00", // Laranja brilhante
    "#1DE9B6", // Verde água brilhante
    "#4A2186", // Roxo escuro
  ],
};

export const useFormattedSkillsWithColors = (
  skillsObject: RankedSkillProps[],
  theme: "light" | "dark"
) => {
  const colorMapRef = useRef(new Map<string, string>());

  if (colorMapRef.current.size === 0) {
    skillsObject.forEach((skill, index) => {
      if (!colorMapRef.current.has(skill.skill)) {
        const lightColor = themeColors.light[index];
        colorMapRef.current.set(skill.skill, lightColor);
      }
    });
  }

  return skillsObject.map((skill) => {
    const lightColor = colorMapRef.current.get(skill.skill)!;
    const darkColor = themeColors.dark[themeColors.light.indexOf(lightColor)] || lightColor;

    return {
      ...skill,
      color: theme === "dark" ? darkColor : lightColor,
    };
  });
};
