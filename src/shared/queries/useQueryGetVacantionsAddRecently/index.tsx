import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line import/order, @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { IResponseGetVacation } from "./types";

import { apiServe } from "~/src/shared/services/api";
import useUserDetails from "~/src/shared/store/useUserDetails";

async function handleGetVacantions(vacantionName: string, plataformsToSearch: string[]) {
  if (!plataformsToSearch.length) return [];

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
    console.log("Error useQueryGetVacantions", err);

    return [];
  }
}

export const useQueryGetVacantionsAddRecently = (vacantionName: string) => {
  const {
    state: { platformsFollowed },
  } = useUserDetails();

  const plataformsToSearch = platformsFollowed.map((platform) => platform.name);

  const platformsKey = plataformsToSearch.sort().join(",");

  return useQuery({
    queryKey: ["getVacantionsAddRecently", vacantionName, platformsKey],
    queryFn: () => handleGetVacantions(vacantionName, plataformsToSearch),
  });
};
