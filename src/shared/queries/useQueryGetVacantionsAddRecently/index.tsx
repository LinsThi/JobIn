import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line import/order, @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { IResponseGetVacation } from "./types";

import { apiServe } from "~/src/shared/services/api";
import useUserDetails from "~/src/shared/store/useUserDetails";

async function handleGetVacantions(vacantionName: string, plataformsToSearch: string[]) {
  if (!plataformsToSearch.length) return [];

  try {
    console.log("request");
    const querySearch = vacantionName.toLowerCase().replace(" ", "-");

    const params = new URLSearchParams();
    params.append("querySearch", querySearch);
    params.append("quantityToSearch", "5");

    plataformsToSearch.forEach((platform) => {
      params.append("platforms", platform);
    });

    const { data, request } = await apiServe.get<IResponseGetVacation>(
      `/jobSearch?${params.toString()}`
    );

    console.log("request", request);

    return data.data;
  } catch (err: AxiosError | any) {
    console.log("Error useQueryGetVacantions", err);
    console.log(JSON.stringify(err));

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
    enabled: !!plataformsToSearch.length,
  });
};
