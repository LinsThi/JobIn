import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { IResponseGetVacation } from "~/src/shared/queries/useQueryGetVacantionsAddRecently/types";
import { apiServe } from "~/src/shared/services/api";
import { PlataformProps } from "~/src/shared/utils/platforms";

async function handleGetVacantions(vacantionName: string, plataformsToSearch: string[]) {
  if (plataformsToSearch.length === 0 || vacantionName === "") {
    return [];
  }

  try {
    const querySearch = vacantionName.toLowerCase().replace(" ", "-");

    const params = new URLSearchParams();
    params.append("querySearch", querySearch);

    plataformsToSearch.forEach((platform) => {
      params.append("platforms", platform);
    });

    const { data } = await apiServe.get<IResponseGetVacation>(`/jobSearch?${params.toString()}`);

    return data.data;
  } catch (err: AxiosError | any) {
    console.log("Error useQuerySearchVacantion", err);

    return [];
  }
}

export const useQuerySearchVacantion = (
  vacantionName: string,
  platformsFollowed: PlataformProps[]
) => {
  const plataformsToSearch = platformsFollowed.map((platform) => {
    return platform.name;
  });

  return useQuery({
    queryKey: ["searchVacantions", vacantionName, plataformsToSearch],
    queryFn: () => handleGetVacantions(vacantionName, plataformsToSearch),
    enabled: vacantionName.length > 0 && plataformsToSearch.length > 0,
  });
};
