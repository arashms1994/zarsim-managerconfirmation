import { useQuery } from "@tanstack/react-query";
import { getAllSubProductionPlanList } from "../api/getData";

export const useBastebandi = (shomareradiffactor: string) => {
  return useQuery<any | null, Error>({
    queryKey: ["bastebandi", shomareradiffactor],
    queryFn: () => getAllSubProductionPlanList(shomareradiffactor),
    staleTime: 2000,
    retry: 5,
  });
};
