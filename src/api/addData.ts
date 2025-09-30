import { BASE_URL } from "./base";
import { getDigest } from "../lib/getDigest";
import { Bounce, toast } from "react-toastify";
import { parseProductTitle } from "../lib/parseTitle";

const updateChangePreInvoiceRowStatus = async (
  title: string,
  status: string
) => {
  const listGuid = "17062ABC-325C-48D5-B1ED-6D2C9308BEDB";
  const itemType = "SP.Data.ChangePreInvoiceRowHistoryListItem";

  try {
    if (!itemType) {
      throw new Error("نتوانستیم itemType لیست را دریافت کنیم");
    }

    const searchUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=Title eq '${title}'`;

    const searchResponse = await fetch(searchUrl, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`خطای HTTP در جستجو: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const targetItem = searchData.d.results?.[0];

    if (!targetItem) {
      throw new Error(
        `ردیف با Title ${title} در لیست changePreInvoiceRowHistory یافت نشد`
      );
    }

    const digest = await getDigest();

    const updateResponse = await fetch(
      `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items(${targetItem.Id})`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "X-HTTP-Method": "MERGE",
          "IF-MATCH": "*",
        },
        body: JSON.stringify({
          __metadata: { type: itemType },
          status: status,
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(
        `خطای HTTP در آپدیت وضعیت: ${updateResponse.status} - ${errorText}`
      );
    }
  } catch (err) {
    console.error("خطا در آپدیت وضعیت changePreInvoiceRowHistory:", err);
    throw err;
  }
};

const createNewOldListItem = async (originalItem: Record<string, unknown>) => {
  const listGuid = "52C118F7-4C75-451E-80BB-850AB912ECFF";
  const itemType = "SP.Data.Detail_x005f_OldListItem";

  try {
    const digest = await getDigest();

    const safeString = (value: unknown): string => {
      if (value === null || value === undefined) return "";
      return String(value);
    };

    const safeBoolean = (value: unknown): boolean => {
      if (typeof value === "boolean") return value;
      if (typeof value === "string") return value.toLowerCase() === "true";
      return false;
    };

    const safeNumber = (value: unknown): number | null => {
      if (value === null || value === undefined) return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    };

    const newItemData = {
      __metadata: { type: itemType },
      Title: safeString(originalItem.Title),
      Amount: safeString(originalItem.Amount),
      Category: safeString(originalItem.Category),
      Color: originalItem.Color ? safeString(originalItem.Color) : null,
      Color2: originalItem.Color2 ? safeString(originalItem.Color2) : null,
      Customer: safeString(originalItem.Customer),
      CustomerCode: originalItem.CustomerCode
        ? safeString(originalItem.CustomerCode)
        : null,
      Date: safeString(originalItem.Date),
      DayDelivary: originalItem.DayDelivary
        ? safeString(originalItem.DayDelivary)
        : null,
      DelivaryDate: originalItem.DelivaryDate
        ? safeString(originalItem.DelivaryDate)
        : null,
      Description: originalItem.Description
        ? safeString(originalItem.Description)
        : null,
      GUID: safeString(originalItem.GUID),
      Grade: safeString(originalItem.Grade),
      Meter: originalItem.Meter ? safeString(originalItem.Meter) : null,
      NumberProgram: originalItem.NumberProgram
        ? safeString(originalItem.NumberProgram)
        : null,
      OData__UIVersionString: safeString(originalItem.OData__UIVersionString),
      OData__x0070_1: safeString(originalItem.OData__x0070_1),
      OData__x0070_2: originalItem.OData__x0070_2
        ? safeString(originalItem.OData__x0070_2)
        : null,
      OData__x0070_3: originalItem.OData__x0070_3
        ? safeString(originalItem.OData__x0070_3)
        : null,
      OData__x0070_4: safeString(originalItem.OData__x0070_4),
      OldCode: originalItem.OldCode ? safeString(originalItem.OldCode) : null,
      OrderNumber: safeString(originalItem.OrderNumber),
      OriginalColor: originalItem.OriginalColor
        ? safeString(originalItem.OriginalColor)
        : null,
      Packing: safeString(originalItem.Packing),
      Price: safeString(originalItem.Price),
      Print: originalItem.Print ? safeString(originalItem.Print) : null,
      Product: safeString(originalItem.Product),
      ProductDisplayName: safeString(originalItem.ProductDisplayName),
      ProductSize: safeString(originalItem.ProductSize),
      Production: originalItem.Production
        ? safeString(originalItem.Production)
        : null,
      ProductionCode: originalItem.ProductionCode
        ? safeString(originalItem.ProductionCode)
        : null,
      ProgramNumber: originalItem.ProgramNumber
        ? safeString(originalItem.ProgramNumber)
        : null,
      Ran: safeString(originalItem.Ran),
      RanMeter: originalItem.RanMeter
        ? safeString(originalItem.RanMeter)
        : null,
      Revised_Request: safeString(originalItem.Revised_Request),
      STW: safeString(originalItem.STW),
      Standard: originalItem.Standard
        ? safeString(originalItem.Standard)
        : null,
      StartDate: originalItem.StartDate
        ? safeString(originalItem.StartDate)
        : null,
      Status: originalItem.Status ? safeString(originalItem.Status) : null,
      StatusPrefactor: originalItem.StatusPrefactor
        ? safeString(originalItem.StatusPrefactor)
        : null,
      StringColor: safeString(originalItem.StringColor),
      StringColor_code: safeString(originalItem.StringColor_code),
      Structure: safeString(originalItem.Structure),
      TextPrint: safeString(originalItem.TextPrint),
      Tolerance: originalItem.Tolerance
        ? safeString(originalItem.Tolerance)
        : null,
      UnitGoods: originalItem.UnitGoods
        ? safeString(originalItem.UnitGoods)
        : null,
      Value: safeString(originalItem.Value),
      Voltage: safeString(originalItem.Voltage),
      WFCreate: originalItem.WFCreate
        ? safeString(originalItem.WFCreate)
        : null,
      add: safeBoolean(originalItem.add),
      nimesakhte: safeBoolean(originalItem.nimesakhte),
      notview: safeBoolean(originalItem.notview),
      code_15r: originalItem.code_15r
        ? safeString(originalItem.code_15r)
        : null,
      codegoods: originalItem.codegoods
        ? safeString(originalItem.codegoods)
        : null,
      codemahsolemoshtari: originalItem.codemahsolemoshtari
        ? safeString(originalItem.codemahsolemoshtari)
        : null,
      coler_final_code: originalItem.coler_final_code
        ? safeString(originalItem.coler_final_code)
        : null,
      colertitle: originalItem.colertitle
        ? safeString(originalItem.colertitle)
        : null,
      color_difaltcode: originalItem.color_difaltcode
        ? safeString(originalItem.color_difaltcode)
        : null,
      cu: safeString(originalItem.cu),
      darsad_takhfif: safeString(originalItem.darsad_takhfif),
      date_c: originalItem.date_c ? safeString(originalItem.date_c) : null,
      date_k: originalItem.date_k ? safeString(originalItem.date_k) : null,
      goods_title: originalItem.goods_title
        ? safeString(originalItem.goods_title)
        : null,
      goodscode: originalItem.goodscode
        ? safeString(originalItem.goodscode)
        : null,
      idparent: safeString(originalItem.idparent),
      marhaletolid_akharin: originalItem.marhaletolid_akharin
        ? safeString(originalItem.marhaletolid_akharin)
        : null,
      meghdarjahattolid: safeString(originalItem.meghdarjahattolid),
      namegoods: originalItem.namegoods
        ? safeString(originalItem.namegoods)
        : null,
      packing_code: originalItem.packing_code
        ? safeString(originalItem.packing_code)
        : null,
      packing_name: originalItem.packing_name
        ? safeString(originalItem.packing_name)
        : null,
      parent_code: safeString(originalItem.parent_code),
      parent_ditaile_code: safeString(originalItem.parent_ditaile_code),
      pidId: safeNumber(originalItem.pidId),
      pidroutinId: originalItem.pidroutinId
        ? safeString(originalItem.pidroutinId)
        : null,
      rang_rokesh_code: originalItem.rang_rokesh_code
        ? safeString(originalItem.rang_rokesh_code)
        : null,
      rang_rows: safeString(originalItem.rang_rows),
      rows: safeNumber(originalItem.rows),
      shomare_akharin: safeString(originalItem.shomare_akharin),
      titlefrest: originalItem.titlefrest
        ? safeString(originalItem.titlefrest)
        : null,
      tu: safeString(originalItem.tu),
    };

    const createResponse = await fetch(
      `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
        },
        body: JSON.stringify(newItemData),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(
        `خطای HTTP در ایجاد ردیف جدید در OldList: ${createResponse.status} - ${errorText}`
      );
    }
  } catch (err) {
    console.error("❌ خطا در ایجاد ردیف جدید در OldList:", err);
    throw err;
  }
};

const findDetailCustomerFactorItem = async (title: string) => {
  const listGuid = "c6636cfe-76e0-4e0f-b65f-c14893d3970e";
  const searchUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=parent_ditaile_code eq '${title}'`;

  const searchResponse = await fetch(searchUrl, {
    method: "GET",
    headers: {
      Accept: "application/json;odata=verbose",
    },
  });

  if (!searchResponse.ok) {
    throw new Error(
      `خطای HTTP در جستجوی DetailCustomerFactor: ${searchResponse.status}`
    );
  }

  const searchData = await searchResponse.json();
  const targetItem = searchData.d.results?.[0];

  if (!targetItem) {
    throw new Error(
      `ردیف با parent_ditaile_code ${title} در DetailCustomerFactor یافت نشد`
    );
  }

  return targetItem;
};

const updateOnlyGoodscode = async (itemId: number, goodscode: string) => {
  const listGuid = "c6636cfe-76e0-4e0f-b65f-c14893d3970e";
  const itemType = "SP.Data.Detail_x005f_customer_x005f_factorListItem";
  const digest = await getDigest();

  const updateResponse = await fetch(
    `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items(${itemId})`,
    {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": digest,
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*",
      },
      body: JSON.stringify({
        __metadata: { type: itemType },
        goodscode: goodscode,
      }),
    }
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(
      `خطای HTTP در آپدیت goodscode: ${updateResponse.status} - ${errorText}`
    );
  }
};

const updateAllDetailCustomerFactorFields = async (
  itemId: number,
  rowData: {
    printTitle: string;
    productTittle: string;
    colorFinalCode: string;
    colorTitle: string;
    packingTitle: string;
    preInvoiceProductTitle: string;
    finalGenerationCode: string;
    finalProductCode: string;
    packingCode: string;
    productCode: string;
    coverColor: string;
    colorString: string;
    amount: string;
    productionAmount: string;
    price: string;
    productCatgory: string;
    packingType: string;
    packingMaterial: string;
    packingSize: string;
    packingM: string;
  }
) => {
  const listGuid = "c6636cfe-76e0-4e0f-b65f-c14893d3970e";
  const itemType = "SP.Data.Detail_x005f_customer_x005f_factorListItem";
  const digest = await getDigest();

  const parsedProduct = parseProductTitle(rowData.productTittle);

  const updateResponse = await fetch(
    `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items(${itemId})`,
    {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": digest,
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*",
      },
      body: JSON.stringify({
        __metadata: { type: itemType },
        TextPrint: rowData.printTitle,
        LinkTitle: rowData.productTittle,
        coler_final_code: rowData.colorFinalCode,
        colertitle: rowData.colorTitle,
        packing_name: rowData.packingTitle,
        goods_title: rowData.preInvoiceProductTitle,
        code_15r: rowData.finalGenerationCode,
        goodscode: rowData.finalProductCode,
        packing_code: rowData.packingCode,
        Product: rowData.productCode,
        Color: rowData.coverColor,
        StringColor: rowData.colorString,
        Amount: rowData.amount,
        meghdarjahattolid: rowData.productionAmount,
        Price: rowData.price,
        Packing: rowData.packingTitle,
        Category: rowData.productCatgory,
        OData__x0070_1: rowData.packingType,
        OData__x0070_2: rowData.packingMaterial,
        OData__x0070_3: rowData.packingSize,
        OData__x0070_4: rowData.packingM,
        Title: rowData.productTittle,
        LinkTitleNoMenu: rowData.productTittle,
        titlefrest: rowData.preInvoiceProductTitle,
        Grade: parsedProduct.Grade,
        PhaseSection: parsedProduct.PhaseSection,
        ProductSize: parsedProduct.ProductSize,
      }),
    }
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(
      `خطای HTTP در آپدیت فیلدها: ${updateResponse.status} - ${errorText}`
    );
  }
};

const handleApprovalForSTWGreaterOrEqual4 = async (rowData: {
  Title: string;
  finalProductCode: string;
}) => {
  try {
    const targetItem = await findDetailCustomerFactorItem(rowData.Title);

    await updateOnlyGoodscode(targetItem.Id, rowData.finalProductCode);

    await createNewOldListItem(targetItem);
  } catch (err) {
    console.error("❌ خطا در آپدیت برای STW >= 4:", err);
    throw err;
  }
};

const handleApprovalForSTWLessThan4 = async (rowData: {
  Title: string;
  finalProductCode: string;
  printTitle: string;
  productTittle: string;
  colorFinalCode: string;
  colorTitle: string;
  packingTitle: string;
  preInvoiceProductTitle: string;
  finalGenerationCode: string;
  packingCode: string;
  productCode: string;
  coverColor: string;
  colorString: string;
  amount: string;
  productionAmount: string;
  price: string;
  productCatgory: string;
  packingType: string;
  packingMaterial: string;
  packingSize: string;
  packingM: string;
}) => {
  try {
    const targetItem = await findDetailCustomerFactorItem(rowData.Title);

    await updateAllDetailCustomerFactorFields(targetItem.Id, {
      printTitle: rowData.printTitle,
      productTittle: rowData.productTittle,
      colorFinalCode: rowData.colorFinalCode,
      colorTitle: rowData.colorTitle,
      packingTitle: rowData.packingTitle,
      preInvoiceProductTitle: rowData.preInvoiceProductTitle,
      finalGenerationCode: rowData.finalGenerationCode,
      finalProductCode: rowData.finalProductCode,
      packingCode: rowData.packingCode,
      productCode: rowData.productCode,
      coverColor: rowData.coverColor,
      colorString: rowData.colorString,
      amount: rowData.amount,
      productionAmount: rowData.productionAmount,
      price: rowData.price,
      productCatgory: rowData.productCatgory,
      packingType: rowData.packingType,
      packingMaterial: rowData.packingMaterial,
      packingSize: rowData.packingSize,
      packingM: rowData.packingM,
    });
  } catch (err) {
    console.error("❌ خطا در آپدیت کامل برای STW < 4:", err);
    throw err;
  }
};

export const handleApproveChangePreInvoiceRow = async (rowData: {
  Title: string;
  finalProductCode: string;
  STW: string;
  printTitle: string;
  productTittle: string;
  colorFinalCode: string;
  colorTitle: string;
  packingTitle: string;
  preInvoiceProductTitle: string;
  finalGenerationCode: string;
  packingCode: string;
  productCode: string;
  coverColor: string;
  colorString: string;
  amount: string;
  productionAmount: string;
  price: string;
  productCatgory: string;
  packingType: string;
  packingMaterial: string;
  packingSize: string;
  packingM: string;
}) => {
  try {
    const stwValue = parseInt(rowData.STW);

    if (stwValue >= 4) {
      await handleApprovalForSTWGreaterOrEqual4({
        Title: rowData.Title,
        finalProductCode: rowData.finalProductCode,
      });
    } else {
      await handleApprovalForSTWLessThan4(rowData);
    }

    await updateChangePreInvoiceRowStatus(rowData.Title, "1");

    toast.success(`ردیف ${rowData.Title} با موفقیت تأیید و آپدیت شد.`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    return { success: true, message: "تأیید با موفقیت انجام شد" };
  } catch (err) {
    console.error("❌ خطا در تأیید تغییرات:", err);

    const errorMessage = err instanceof Error ? err.message : "خطای ناشناس";

    toast.error(`خطا در تأیید تغییرات: ${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    throw err;
  }
};

export const handleRejectChangePreInvoiceRow = async (rowData: {
  Title: string;
}) => {
  try {
    await updateChangePreInvoiceRowStatus(rowData.Title, "2");

    toast.success(`ردیف ${rowData.Title} با موفقیت رد شد.`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    return { success: true, message: "رد با موفقیت انجام شد" };
  } catch (err) {
    console.error("خطا در رد تغییرات:", err);

    const errorMessage = err instanceof Error ? err.message : "خطای ناشناس";

    toast.error(`خطا در رد تغییرات: ${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    throw err;
  }
};
