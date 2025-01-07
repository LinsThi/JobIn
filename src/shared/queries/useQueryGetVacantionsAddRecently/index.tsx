import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { IResponseGetVacation } from "~/src/shared/queries/useQueryGetVacations/types";
import { apiServe } from "~/src/shared/services/api";
import useUserDetails from "~/src/shared/store/useUserDetails";

async function handleGetVacantions(vacantionName: string, plataformsToSearch: string[]) {
  if (plataformsToSearch.length === 0) {
    return [];
  }

  try {
    const querySearch = vacantionName.toLowerCase().replace(" ", "-");

    const params = new URLSearchParams();
    params.append("querySearch", querySearch);
    params.append("quantityToSearch", "5");

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

  const plataformsToSearch = platformsFollowed.map((platform) => {
    return platform.name;
  });

  return useQuery({
    queryKey: ["getVacantionsAddRecently"],
    queryFn: () => handleGetVacantions(vacantionName, plataformsToSearch),
    enabled: !!plataformsToSearch.length,
  });
};
