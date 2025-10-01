import { useQuery } from "@tanstack/react-query";
import { getAllSubProductionPlanList } from "../api/getData";
import type { IProductionPlanListItem } from "../types/type";

export const useSubProductionPlan = (shomareradiffactor: string) => {
  return useQuery<IProductionPlanListItem[], Error>({
    queryKey: ["subProductionPlan", shomareradiffactor],
    queryFn: () => getAllSubProductionPlanList(shomareradiffactor),
    staleTime: 2000,
  });
};
