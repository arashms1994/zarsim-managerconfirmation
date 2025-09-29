import { useQuery } from "@tanstack/react-query";
import { getAllDetailCustomerFactorList } from "../api/getData";
import type { IDetailCustomerFactorListItem } from "../types/type";

export const useDetailCustomerFactor = (parentDetailCode: string) => {
  return useQuery<IDetailCustomerFactorListItem | null, Error>({
    queryKey: ["detailCustomerFactor", parentDetailCode],
    queryFn: () => getAllDetailCustomerFactorList(parentDetailCode),
    staleTime: 2000,
    retry: 5,
    enabled: !!parentDetailCode,
  });
};
