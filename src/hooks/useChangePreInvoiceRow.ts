import { useQuery } from "@tanstack/react-query";
import { getAllChangePreInvoiceRowHistoryList } from "../api/getData";
import type { IChangePreInvoiceRowHistoryListItem } from "../types/type";

export const useChangePreInvoiceRow = () => {
  return useQuery<IChangePreInvoiceRowHistoryListItem[], Error>({
    queryKey: ["changePreInvoiceRowHistory"],
    queryFn: () => getAllChangePreInvoiceRowHistoryList(),
    staleTime: 2000,
    retry: 5,
  });
};
