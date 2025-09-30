import { useQuery } from "@tanstack/react-query";
import type { IBastebandiShodeListItem } from "../types/type";
import { getAllBasteBandiShodeList } from "../api/getData";

export const useBastebandiShode = (shomarefactor: string) => {
  return useQuery<IBastebandiShodeListItem | null, Error>({
    queryKey: ["bastebandiShode", shomarefactor],
    queryFn: () => getAllBasteBandiShodeList(shomarefactor),
    staleTime: 2000,
    retry: 5,
  });
};
