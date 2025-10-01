import { useQuery } from "@tanstack/react-query";
import type { IPishraftMarahelTolidItem } from "../types/type";
import { getAllPishraftMaraheleTolidList } from "../api/getData";

export const usePishraftMarahelTolid = (shomaresefaresh:string) => {
  return useQuery<IPishraftMarahelTolidItem[], Error>({
    queryKey: ["pishraftMarahelTolid", shomaresefaresh],
    queryFn: () => getAllPishraftMaraheleTolidList(shomaresefaresh),
    staleTime: 2000,
  });
};
