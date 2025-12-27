import { useQuery } from "@tanstack/react-query";
import { getAllBasteBandiShodeList } from "../api/getData";
import type { IBastebandiShodeListItem } from "../types/type";

export const useBastebandiShode = (shomarefactor: string) => {
  return useQuery<IBastebandiShodeListItem | null, Error>({
    queryKey: ["bastebandiShode", shomarefactor],
    queryFn: () => getAllBasteBandiShodeList(shomarefactor),
    staleTime: 2000,
  });
};
