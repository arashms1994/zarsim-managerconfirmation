import { Skeleton } from "../ui/skeleton";
import { PreInvoiceRowDetail } from "./PreInvoiceRowDetail";
import { EditedPreInvoiceRowDetail } from "./EditedPreInvoiceRowDetail";
import type { IChangePreInvoiceRowHistoryListItem } from "../../types/type";
import { useDetailCustomerFactor } from "../../hooks/useDetailCustomerFactor";

export const Modal = ({
  isOpen,
  onClose,
  rowData,
}: {
  isOpen: boolean;
  onClose: () => void;
  rowData: IChangePreInvoiceRowHistoryListItem | null;
}) => {
  const { data: detailCustomerFactor, isLoading } = useDetailCustomerFactor(
    rowData?.Title || ""
  );

  if (!isOpen || !rowData) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full flex items-center justify-center flex-col gap-3 bg-white min-w-[750px] min-h-[650px] p-6 rounded-lg shadow-lg max-w-md relative scroll-auto">
        <div dir="rtl" lang="fa" className="bg-blue-300 flex items-center justify-center rounded-lg p-4">
          <span className="text-slate-700 text-2xl font-semibold">
            جزئیات ردیف سفارش {rowData.Title}
          </span>
        </div>

        <PreInvoiceRowDetail detailCustomerFactor={detailCustomerFactor} />

        <EditedPreInvoiceRowDetail rowData={rowData} />

        <div
          className="absolute top-2.5 left-2.5 max-w-20 p-2.5 rounded-xl bg-red-400 hover:bg-red-700 transition-all duration-300 text-center cursor-pointer"
          onClick={onClose}
        >
          <span className="font-semibold text-base text-white m-0">بستن</span>
        </div>
      </div>
    </div>
  );
};
