import { useState } from "react";
import { Check, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { IChangePreInvoiceRowHistoryListItem } from "../../types/type";
import {
  handleApproveChangePreInvoiceRow,
  handleRejectChangePreInvoiceRow,
} from "../../api/addData";

export const ActionsCell: React.FC<{
  rowItem: IChangePreInvoiceRowHistoryListItem;
}> = ({ rowItem }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    const startTime = Date.now();

    try {
      await handleApproveChangePreInvoiceRow({
        ID: rowItem.ID,
        Title: rowItem.Title,
        finalProductCode: rowItem.finalProductCode || "",
        STW: rowItem.STW || "",
        printTitle: rowItem.printTitle || "",
        productTittle: rowItem.productTittle || "",
        colorFinalCode: rowItem.colorFinalCode || "",
        colorTitle: rowItem.colorTitle || "",
        packingTitle: rowItem.packingTitle || "",
        preInvoiceProductTitle: rowItem.preInvoiceProductTitle || "",
        finalGenerationCode: rowItem.finalGenerationCode || "",
        packingCode: rowItem.packingCode || "",
        productCode: rowItem.productCode || "",
        coverColor: rowItem.coverColor || "",
        colorString: rowItem.colorString || "",
        amount: rowItem.amount || "",
        productionAmount: rowItem.productionAmount || "",
        price: rowItem.price || "",
        productCatgory: rowItem.productCatgory || "",
        packingType: rowItem.packingType || "",
        packingMaterial: rowItem.packingMaterial || "",
        packingSize: rowItem.packingSize || "",
        packingM: rowItem.packingM || "",
        shomarefactor: rowItem.orderNumber || "",
        shomaresefaresh: rowItem.orderNumber || "",
        shomareradiffactor: rowItem.Title || "",
      });

      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        await new Promise((r) => setTimeout(r, 3000 - elapsed));
      }

      await queryClient.invalidateQueries({
        queryKey: ["changePreInvoiceRowHistory"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["detailCustomerFactor", rowItem.parent_ditaile_code],
      });
    } catch (error) {
      console.error("خطا در تأیید:", error);
      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        await new Promise((r) => setTimeout(r, 3000 - elapsed));
      }
      queryClient.invalidateQueries({
        queryKey: ["changePreInvoiceRowHistory"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    const startTime = Date.now();

    try {
      await handleRejectChangePreInvoiceRow({
        ID: rowItem.ID,
        Title: rowItem.Title,
      });

      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        await new Promise((r) => setTimeout(r, 3000 - elapsed));
      }

      await queryClient.invalidateQueries({
        queryKey: ["changePreInvoiceRowHistory"],
      });
    } catch (error) {
      console.error("خطا در رد:", error);
      const elapsed = Date.now() - startTime;
      if (elapsed < 3000) {
        await new Promise((r) => setTimeout(r, 3000 - elapsed));
      }
      queryClient.invalidateQueries({
        queryKey: ["changePreInvoiceRowHistory"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (rowItem.status === "1") {
    return <div className="text-green-600 font-semibold">تأیید شده</div>;
  }

  if (rowItem.status === "2") {
    return <div className="text-red-600 font-semibold">رد شده</div>;
  }

  if (rowItem.status === "" || rowItem.status === "0") {
    return (
      <div className="space-x-2 flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm font-medium text-[#1e7677]">
            <div className="h-4 w-4 rounded-full border-2 border-[#1e7677] border-t-transparent animate-spin" />
            <span>در حال پردازش...</span>
          </div>
        ) : (
          <>
            <div
              title="تأیید"
              onClick={handleApprove}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer transition-all duration-300 bg-green-400 hover:bg-green-600"
            >
              <Check color="black" size={20} />
            </div>

            <div
              title="رد"
              onClick={handleReject}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer transition-all duration-300 bg-red-400 hover:bg-red-700"
            >
              <X color="black" size={20} />
            </div>
          </>
        )}
      </div>
    );
  }

  return <div className="text-gray-500">وضعیت نامعتبر</div>;
};
