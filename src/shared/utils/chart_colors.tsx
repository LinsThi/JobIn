import { useRef } from "react";

import { RankedSkillProps } from "~/src/shared/queries/useQueryGetVacantionsAddRecently/types";

export const themeColors = {
  light: [
    "#0082FB",
    "#6A90B4",
    "#5AA4E8",
    "#85ADCC",
    "#94A9BC",
    "#28323B",
    "#42576D",
    "#A2C5E5",
    "#546F8A",
    "#293D50",
  ],
  dark: [
    "#8A31FF",
    "#8B6BB5",
    "#985AE8",
    "#806B9C",
    "#736782",
    "#E3D8F2",
    "#BFAED6",
    "#A68DC7",
    "#5B4875",
    "#4D376B",
  ],
};

export const useFormattedSkillsWithColors = (
  skillsObject: RankedSkillProps[],
  theme: "light" | "dark"
) => {
  const colorMapRef = useRef(new Map<string, string>());

  if (colorMapRef.current.size === 0) {
    skillsObject.forEach((skill) => {
      if (!colorMapRef.current.has(skill.skill)) {
        const randomIndex = Math.floor(Math.random() * themeColors.light.length);
        colorMapRef.current.set(skill.skill, themeColors.light[randomIndex]);
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
