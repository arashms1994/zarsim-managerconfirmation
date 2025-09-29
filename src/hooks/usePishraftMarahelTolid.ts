import { useQuery } from "@tanstack/react-query";
import type { IPishraftMarahelTolidItem } from "../types/type";
import { getAllPishraftMaraheleTolidList } from "../api/getData";

export const usePishraftMarahelTolid = () => {
  return useQuery<IPishraftMarahelTolidItem[], Error>({
    queryKey: ["pishraftMarahelTolid"],
    queryFn: () => getAllPishraftMaraheleTolidList(),
    staleTime: 2000,
    retry: 5,
  });
};
