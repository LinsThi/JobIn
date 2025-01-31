import { IVacationProps } from "~/src/shared/types/vacantion";

export type RankedSkillProps = {
  skill: string;
  count: number;
  color: string;
};

export type IResponseGetVacation = {
  data: IVacationProps[];
  rankedSkills: RankedSkillProps[];
};
