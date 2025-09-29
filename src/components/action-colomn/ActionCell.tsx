import { Check, X } from "lucide-react";
import { useState } from "react";
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
    try {
      await handleApproveChangePreInvoiceRow({
        Title: rowItem.Title,
        finalProductCode: rowItem.finalProductCode || "",
      });

      await queryClient.invalidateQueries({
        queryKey: ["detailCustomerFactor", rowItem.parent_ditaile_code],
      });
    } catch (error) {
      console.error("خطا در تأیید:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await handleRejectChangePreInvoiceRow({
        Title: rowItem.Title,
      });

      await queryClient.invalidateQueries({
        queryKey: ["changePreInvoiceRowHistory"],
      });
    } catch (error) {
      console.error("خطا در رد:", error);
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
          <div className="text-blue-600 text-sm font-medium">
            در حال پردازش...
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
