import { useQuery } from "@tanstack/react-query";
import { getBastebandiList } from "../api/getData";
import type { IBastebandiListItem } from "../types/type";

export const useBastebandi = (shomarefactor: string) => {
  return useQuery<IBastebandiListItem | null, Error>({
    queryKey: ["bastebandi", shomarefactor],
    queryFn: () => getBastebandiList(shomarefactor),
    staleTime: 2000,
    retry: 5,
  });
};
