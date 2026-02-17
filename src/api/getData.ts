import { BASE_URL } from "./base";
import type {
  IBastebandiListItem,
  IOrderProductsListItem,
  ICustomerFactorListItem,
  IProductionPlanListItem,
  IBastebandiShodeListItem,
  IPishraftMarahelTolidItem,
  IDetailCustomerFactorListItem,
  IChangePreInvoiceRowHistoryListItem,
} from "../types/type";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

export async function getCurrentUser(): Promise<string> {
  const response = await fetch(
    `${_spPageContextInfo.webAbsoluteUrl}/_api/web/currentuser`,
    {
      headers: { Accept: "application/json;odata=verbose" },
      credentials: "same-origin",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const rawLoginName = data.d.LoginName;

  return rawLoginName;
}

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
    }

    return items;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌های changePreInvoiceRowHistory:", err);
    throw err;
  }
}

export async function getBastebandiList(
  shomarefactor: string
): Promise<IBastebandiListItem | null> {
  const listGuid = "9B482D2A-67F6-451B-BBA1-A47E5ABD95C5";

  const escaped = String(shomarefactor).replaceAll("'", "''");
  const filter = `shomarefactor eq '${escaped}'`;
  const url = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=${encodeURIComponent(
    filter
  )}&$top=1`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`خطا در درخواست: ${response.statusText}`);
    }

    const data = await response.json();

    const results = data.d?.results as IBastebandiListItem[] | undefined;
    return results && results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("خطا در دریافت آیتم:", err);
    return null;
  }
}

export async function getAllBasteBandiShodeList(
  shomarefactor: string
): Promise<IBastebandiShodeListItem | null> {
  const listGuid = "1788C718-E3CA-461C-AF37-23B1C970F9DC";
  const escaped = String(shomarefactor).replaceAll("'", "''");
  const filter = `shomarefactor eq '${escaped}'`;
  const url = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=${encodeURIComponent(
    filter
  )}&$top=1`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`خطا در درخواست: ${response.statusText}`);
    }

    const data = await response.json();

    const results = data.d?.results as IBastebandiShodeListItem[] | undefined;
    return results && results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("خطا در دریافت آیتم:", err);
    return null;
  }
}

export async function getAllPishraftMaraheleTolidList(
  shomaresefaresh: string
): Promise<IPishraftMarahelTolidItem[]> {
  const listGuid = "66184F05-6D40-473D-AE54-7E0C029BDEB2";
  const escaped = String(shomaresefaresh).replaceAll("'", "''");
  const filter = `shomaresefaresh eq '${escaped}'`;
  const nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=${encodeURIComponent(
    filter
  )}`;

  try {
    const response = await fetch(nextUrl, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`خطای HTTP: ${response.status}`);
    }

    const data = await response.json();

    const result = data.d.results || [];

    return result;
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
        credentials: "include",
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
  const escaped = String(parentDetailCode).replaceAll("'", "''");
  const filter = `parent_ditaile_code eq '${escaped}'`;
  const nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=${encodeURIComponent(
    filter
  )}`;

  try {
    const response = await fetch(nextUrl, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "include",
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

export async function getAllSubProductionPlanList(
  shomareradiffactor: string
): Promise<IProductionPlanListItem[]> {
  const listGuid = "0F8D6219-AA01-4645-B8DE-25B796AB9C5F";
  const escaped = String(shomareradiffactor).replaceAll("'", "''");
  const filter = `shomareradiffactor eq '${escaped}'`;
  const nextUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=${encodeURIComponent(
    filter
  )}`;

  try {
    const response = await fetch(nextUrl, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`خطای HTTP: ${response.status}`);
    }

    const data = await response.json();

    const result = data.d.results || [];

    return result;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

const CUSTOMER_FACTOR_LIST_GUID = "924CB941-E9F6-44E1-B0F1-EAE7C6C6B154";
const CUSTOMER_FACTOR_BATCH_SIZE = 50;

export async function getCustomerFactorsByOrderNumbers(
  orderNumbers: string[]
): Promise<Map<string, ICustomerFactorListItem>> {
  const unique = [...new Set(orderNumbers.filter(Boolean))];
  if (unique.length === 0) return new Map();

  const chunks: string[][] = [];
  for (let i = 0; i < unique.length; i += CUSTOMER_FACTOR_BATCH_SIZE) {
    chunks.push(unique.slice(i, i + CUSTOMER_FACTOR_BATCH_SIZE));
  }

  const filterPart = (orderNumber: string) => {
    const escaped = String(orderNumber).replaceAll("'", "''");
    return `LinkTitle eq '${escaped}'`;
  };

  const fetchChunk = async (chunk: string[]) => {
    const filter =
      chunk.length === 1
        ? filterPart(chunk[0])
        : chunk.map(filterPart).join(" or ");
    const url = `${BASE_URL}/_api/web/lists(guid'${CUSTOMER_FACTOR_LIST_GUID}')/items?$filter=${encodeURIComponent(
      filter
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json;odata=verbose" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`خطا در درخواست CustomerFactor: ${response.statusText}`);
    }

    const data = await response.json();
    const results = (data.d?.results as ICustomerFactorListItem[]) ?? [];
    return results;
  };

  try {
    const resultsArrays = await Promise.all(chunks.map(fetchChunk));
    const map = new Map<string, ICustomerFactorListItem>();
    for (const results of resultsArrays) {
      for (const item of results) {
        const raw = item as { LinkTitle?: string };
        const key = raw.LinkTitle ?? item.Title ?? String(item.Id);
        map.set(key, item);
      }
    }
    return map;
  } catch (err) {
    console.error("خطا در دریافت دسته‌ای CustomerFactor:", err);
    return new Map();
  }
}

export async function getCustomerFactorByOrderNumber(
  orderNumber: string
): Promise<ICustomerFactorListItem | null> {
  const escaped = String(orderNumber).replaceAll("'", "''");
  const filter = `LinkTitle eq '${escaped}'`;
  const url = `${BASE_URL}/_api/web/lists(guid'${CUSTOMER_FACTOR_LIST_GUID}')/items?$filter=${encodeURIComponent(
    filter
  )}&$top=1`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`خطا در درخواست: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.d.results as ICustomerFactorListItem[];

    if (result.length > 0) {
      return result[0];
    }

    return null;
  } catch (err) {
    console.error("خطا در دریافت آیتم CustomerFactor:", err);
    return null;
  }
}
