import { useDetailCustomerFactor } from "../../hooks/useDetailCustomerFactor";
import type { IChangePreInvoiceRowHistoryListItem } from "../../types/type";
import { Skeleton } from "../ui/skeleton";

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
      <div className="w-full flex items-center justify-center flex-col gap-3 bg-white min-w-[750px] h-[650px] p-6 rounded-lg shadow-lg max-w-md relative scroll-auto">
        <div className="bg-blue-300 flex items-center justify-center rounded-lg p-4">
          <p className="text-slate-700 text-2xl font-semibold">
            جزئیات ردیف سفارش {rowData.Title}
          </p>
        </div>

        <div className="w-full space-y-2 bg-red-200 text-white p-3 rounded-lg mb-4 flex flex-col items-center justify-around gap-2">
          <p className="text-slate-700 text-2xl font-semibold mb-4">
            جزئیات در پیش‌فاکتور
          </p>
          <p className="font-medium text-slate-800 text-lg">
            <strong className="text-base">شرح کامل کالا:</strong>{" "}
            {detailCustomerFactor?.goods_title || "-"}
          </p>

          <div className="w-full p-1 flex flex-wrap items-center justify-around gap-1">
            <p className="font-medium text-slate-800 text-lg">
              <strong className="text-base">متراژ:</strong>{" "}
              {detailCustomerFactor?.Amount || "-"}
            </p>

            <p className="font-medium text-slate-800 text-lg">
              <strong className="text-base">متراژ جهت تولید:</strong>{" "}
              {detailCustomerFactor?.meghdarjahattolid || "-"}
            </p>

            <p className="font-medium text-slate-800 text-lg">
              <strong className="text-base">قیمت:</strong>{" "}
              {detailCustomerFactor?.Price || "-"}
            </p>
          </div>
        </div>

        <div className="w-full space-y-2 bg-green-200 text-white p-3 rounded-lg mb-4 flex flex-col items-center justify-around gap-2">
          <p className="text-slate-700 text-2xl font-semibold mb-4">
            جزئیات اصلاحات
          </p>

          <p className="font-medium text-slate-800 text-lg">
            <strong className="text-base">شرح کامل کالا:</strong>{" "}
            {rowData.preInvoiceProductTitle || "-"}
          </p>

          <div className="w-full p-1 flex items-center justify-around gap-1">
            <p className="font-medium text-slate-800 text-lg">
              <strong className="text-base">متراژ:</strong>{" "}
              {rowData.amount || "-"}
            </p>

            <p className="font-medium text-slate-800 text-lg">
              <strong className="text-base">متراژ جهت تولید:</strong>{" "}
              {rowData.productionAmount || "-"}
            </p>

            <p className="font-medium text-slate-800 text-lg">
              <strong className="text-base">قیمت:</strong>{" "}
              {rowData.price || "-"}
            </p>
          </div>

          <p className="font-medium text-slate-800 text-lg">
            <strong className="text-base">ثبت شده توسط:</strong>{" "}
            {rowData.Author.Title || "-"}
          </p>
        </div>
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
