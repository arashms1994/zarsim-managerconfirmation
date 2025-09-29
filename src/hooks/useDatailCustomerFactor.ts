import { useQuery } from "@tanstack/react-query";
import { getAllDetailCustomerFactorList } from "../api/getData";
import type { IDetailCustomerFactorListItem } from "../types/type";

export const useDetailCustomerFactor = () => {
  return useQuery<IDetailCustomerFactorListItem[], Error>({
    queryKey: ["detailCustomerFactor"],
    queryFn: () => getAllDetailCustomerFactorList(),
    staleTime: 2000,
    retry: 5,
  });
};
