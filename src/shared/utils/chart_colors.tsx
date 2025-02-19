import { useRef } from "react";
import { RankedSkillProps } from "~/src/shared/queries/useQueryGetVacantionsAddRecently/types";

export const themeColors = [
  "#6593D3", // Azul brilhante
  "#DC4172", // Rosa vibrante
  "#23C253", // Verde vibrante
  "#D78A1D", // Amarelo saturado
  "#9931C5", // Roxo intenso
  "#222AC0", // Azul escuro
];

export const useFormattedSkillsWithColors = (
  skillsObject: RankedSkillProps[],
  theme: "light" | "dark"
) => {
  const colorMapRef = useRef(new Map<string, string>());

  // Atribuir cores apenas se o mapa ainda estiver vazio
  if (colorMapRef.current.size === 0) {
    skillsObject.forEach((skill, index) => {
      if (!colorMapRef.current.has(skill.skill)) {
        const colorIndex = index % themeColors.length;
        colorMapRef.current.set(skill.skill, themeColors[colorIndex]);
      }
    });
  }

  return skillsObject.map((skill) => {
    const color = colorMapRef.current.get(skill.skill) || themeColors[0]; // Fallback para evitar `undefined`
    return {
      ...skill,
      color,
    };
  });
};
