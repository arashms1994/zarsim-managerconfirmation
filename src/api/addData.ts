import { BASE_URL } from "./base";
import { getDigest } from "../lib/getDigest";
import { Bounce, toast } from "react-toastify";

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
  const listGuid = "52c118f7-4c75-451e-80bb-850ab912ecff";
  const itemType = "SP.Data.Detail_x005f_OldListItem";

  try {
    const digest = await getDigest();

    // فقط فیلدهای ضروری و ساده رو ارسال می‌کنیم
    const newItemData = {
      __metadata: { type: itemType },
      Title: String(originalItem.Title || ""),
      Amount: String(originalItem.Amount || ""),
      Customer: String(originalItem.Customer || ""),
      CustomerCode: String(originalItem.CustomerCode || ""),
      Product: String(originalItem.Product || ""),
      Price: String(originalItem.Price || ""),
      goods_title: String(originalItem.goods_title || ""),
      goodscode: String(originalItem.goodscode || ""),
      parent_ditaile_code: String(originalItem.parent_ditaile_code || ""),
    };

    console.log("JSON ارسالی:", JSON.stringify(newItemData, null, 2));

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
        `خطای HTTP در ایجاد ردیف جدید: ${createResponse.status} - ${errorText}`
      );
    }

    console.log("ردیف جدید در OldList با موفقیت ایجاد شد");
  } catch (err) {
    console.error("خطا در ایجاد ردیف جدید در OldList:", err);
    throw err;
  }
};

export const handleApproveChangePreInvoiceRow = async (rowData: {
  Title: string;
  finalProductCode: string;
}) => {
  const listGuid = "c6636cfe-76e0-4e0f-b65f-c14893d3970e";
  const itemType = "SP.Data.Detail_x005f_customer_x005f_factorListItem";

  try {
    if (!itemType) {
      throw new Error(
        "نتوانستیم itemType لیست DetailCustomerFactor را دریافت کنیم"
      );
    }

    const searchUrl = `${BASE_URL}/_api/web/lists(guid'${listGuid}')/items?$filter=parent_ditaile_code eq '${rowData.Title}'`;

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
      throw new Error("ردیف مورد نظر یافت نشد");
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
          goodscode: rowData.finalProductCode,
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(
        `خطای HTTP در آپدیت: ${updateResponse.status} - ${errorText}`
      );
    }

    // حالا یک ردیف جدید در لیست OldList ایجاد می‌کنیم
    await createNewOldListItem(targetItem);

    // حالا وضعیت ردیف در لیست changePreInvoiceRowHistory رو هم به "1" تغییر می‌دهیم
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
    console.error("خطا در تأیید تغییرات:", err);

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
