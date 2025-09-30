import { BASE_URL } from "./base";
import type {
  IBastebandiListItem,
  IBastebandiShodeListItem,
  IChangePreInvoiceRowHistoryListItem,
  IDetailCustomerFactorListItem,
  IOrderProductsListItem,
  IPishraftMarahelTolidItem,
} from "../types/type";

export async function getAllChangePreInvoiceRowHistoryList(): Promise<
  IChangePreInvoiceRowHistoryListItem[]
> {
  const listTitle = "changePreInvoiceRowHistory";
  const selectFields = [
    "ID",
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
    "coverColor",
    "colorString",
    "customerName",
    "customerCode",
    "preInvoiceCreateDate",
    "packingType",
    "packingMaterial",
    "packingSize",
    "packingM",
    "STW",
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

export async function getAllBastebandiList(): Promise<IBastebandiListItem[]> {
  const listGuid = "9B482D2A-67F6-451B-BBA1-A47E5ABD95C5";
  let allResults: IBastebandiListItem[] = [];
  let nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      const data = await response.json();

      allResults = [...allResults, ...data.d.results];

      nextUrl = data.d.__next || null;
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function getAllBasteBandiShodeList(): Promise<
  IBastebandiShodeListItem[]
> {
  const listGuid = "1788C718-E3CA-461C-AF37-23B1C970F9DC";
  let allResults: IBastebandiShodeListItem[] = [];
  let nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      const data = await response.json();

      allResults = [...allResults, ...data.d.results];

      nextUrl = data.d.__next || null;
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function getAllPishraftMaraheleTolidList(): Promise<
  IPishraftMarahelTolidItem[]
> {
  const listGuid = "66184F05-6D40-473D-AE54-7E0C029BDEB2";
  let allResults: IPishraftMarahelTolidItem[] = [];
  let nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      const data = await response.json();

      allResults = [...allResults, ...data.d.results];

      nextUrl = data.d.__next || null;
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function getAllOrderProductsList(): Promise<
  IOrderProductsListItem[]
> {
  const listGuid = "B749FB13-24C9-4404-8200-BCFA5DED5EDC";
  let allResults: IOrderProductsListItem[] = [];
  let nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      const data = await response.json();

      allResults = [...allResults, ...data.d.results];

      nextUrl = data.d.__next || null;
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function getAllDetailCustomerFactorList(
  parentDetailCode: string
): Promise<IDetailCustomerFactorListItem | null> {
  const listGuid = "C6636CFE-76E0-4E0F-B65F-C14893D3970E";
  const nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=parent_ditaile_code eq '${parentDetailCode}'`;

  try {
    const response = await fetch(nextUrl, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    });

    if (!response.ok) {
      throw new Error(`خطای HTTP: ${response.status}`);
    }

    const data = await response.json();

    const result =
      data.d.results && data.d.results.length > 0 ? data.d.results[0] : null;

    return result;
  } catch (err) {
    console.error("خطا در دریافت آیتم:", err);
    return null;
  }
}
