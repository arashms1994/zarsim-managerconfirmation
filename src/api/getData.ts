import { BASE_URL } from "./base";
import { useQuery } from "@tanstack/react-query";
import type { IChangePreInvoiceRowHistoryListItem } from "../types/type";

export async function getAllChangePreInvoiceRowHistoryList(): Promise<
  IChangePreInvoiceRowHistoryListItem[]
> {
  const listTitle = "changePreInvoiceRowHistory";
  const selectFields = [
    "Id",
    "Title",
    "printTitle",
    "printType",
    "productTittle",
    "colorFinalCode",
    "colorTitle",
    "packingTitle",
    "preInvoiceProductTitle",
    "finalGenerationCode",
    "finalProductCode",
    "packingCode",
    "orderNumber",
    "productCode",
    "amount",
    "productionAmount",
    "price",
    "totalPrice",
    "productCatgory",
    "Created",
    "Modified",
    "Author/Id",
    "Author/Title",
    "Editor/Id",
    "Editor/Title",
    "ContentTypeId",
    "OData__UIVersionString",
    "Attachments",
    "status",
  ].join(",");
  let items: IChangePreInvoiceRowHistoryListItem[] = [];
  let nextUrl:
    | string
    | null = `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$orderby=ID desc&$expand=Author,Editor&$select=${selectFields}`;

  try {
    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(
          `خطا در گرفتن آیتم‌های changePreInvoiceRowHistory: ${err} (Status: ${res.status})`
        );
      }

      const json: {
        d: { results: IChangePreInvoiceRowHistoryListItem[]; __next?: string };
      } = await res.json();

      const results = json.d?.results;
      if (!Array.isArray(results)) {
        throw new Error(
          "ساختار داده‌ی برگشتی نامعتبر است: results یک آرایه نیست"
        );
      }

      items = [...items, ...results];
      nextUrl = json.d.__next ?? null;

      console.log(
        `دریافت ${results.length} آیتم. کل آیتم‌ها: ${items.length}, Next URL: ${nextUrl}`
      );
    }

    console.log(`کل آیتم‌های دریافت‌شده: ${items.length}`);
    return items;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌های changePreInvoiceRowHistory:", err);
    throw err;
  }
}

export const useChangePreInvoiceRow = () => {
  return useQuery<IChangePreInvoiceRowHistoryListItem[], Error>({
    queryKey: ["changePreInvoiceRowHistory"],
    queryFn: () => getAllChangePreInvoiceRowHistoryList(),
    staleTime: 2000,
    retry: 1,
  });
};
