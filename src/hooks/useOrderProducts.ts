import { useQuery } from "@tanstack/react-query";
import { getAllOrderProductsList } from "../api/getData";
import type { IOrderProductsListItem } from "../types/type";

export const useOrderProducts = () => {
  return useQuery<IOrderProductsListItem[], Error>({
    queryKey: ["orderProducts"],
    queryFn: () => getAllOrderProductsList(),
    staleTime: 2000,
  });
};
