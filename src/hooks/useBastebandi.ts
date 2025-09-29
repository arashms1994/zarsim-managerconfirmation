import { useQuery } from "@tanstack/react-query";
import { getAllBastebandiList } from "../api/getData";
import type { IBastebandiListItem } from "../types/type";

export const useBastebandi = () => {
  return useQuery<IBastebandiListItem[], Error>({
    queryKey: ["bastebandi"],
    queryFn: () => getAllBastebandiList(),
    staleTime: 2000,
    retry: 5,
  });
};
