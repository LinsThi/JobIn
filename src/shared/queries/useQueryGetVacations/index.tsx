import { useQuery } from "@tanstack/react-query";

import { IResponseGetVacation } from "~/src/shared/queries/useQueryGetVacations/types";
import { apiServe } from "~/src/shared/services/api";

async function handleGetVacantions(vacantionName: string) {
  try {
    const querySearch = vacantionName.toLowerCase().replace(" ", "-");

    const { data } = await apiServe.get<IResponseGetVacation>("/infojobs/busca", {
      params: {
        querySearch,
      },
    });

    return data.data;
  } catch (err) {
    console.log(err);
  }
}

export const useQueryGetVacantions = (vacantionName: string) => {
  return useQuery({
    queryKey: ["getVacantions"],
    queryFn: () => handleGetVacantions(vacantionName),
  });
};
