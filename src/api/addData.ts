import { BASE_URL } from "./base";
import { getDigest } from "../lib/getDigest";
import { Bounce, toast } from "react-toastify";

export const handleApproveChangePreInvoiceRow = async (rowData: {
  Title: string;
  finalProductCode: string;
}) => {
  const listGuid = "c6636cfe-76e0-4e0f-b65f-c14893d3970e";
  const itemType = "SP.Data.Detail_x005f_customer_x005f_factorListItem";

  try {
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

export const handleRejectChangePreInvoiceRow = async () => {
  try {
    toast.success("رد اصلاحات با موفقیت ثبت شد.", {
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
