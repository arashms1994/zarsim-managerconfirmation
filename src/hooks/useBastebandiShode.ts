import { useQuery } from "@tanstack/react-query";
import type { IBastebandiShodeListItem } from "../types/type";
import { getAllBasteBandiShodeList } from "../api/getData";

export const useBastebandiShode = () => {
  return useQuery<IBastebandiShodeListItem[], Error>({
    queryKey: ["bastebandiShode"],
    queryFn: () => getAllBasteBandiShodeList(),
    staleTime: 2000,
    retry: 5,
  });
};
