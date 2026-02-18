import type { IChangePreInvoiceRowHistoryListItem } from "../../types/type";

export const EditedPreInvoiceRowDetail: React.FC<{
  rowData: IChangePreInvoiceRowHistoryListItem;
}> = ({ rowData }) => {
  return (
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
          <strong className="text-base">کدطرح:</strong>{" "}
          {rowData.productCode || "-"}
        </p>

        <p className="font-medium text-slate-800 text-lg">
          <strong className="text-base">متراژ:</strong> {rowData.amount || "-"}
        </p>

        <p className="font-medium text-slate-800 text-lg">
          <strong className="text-base">متراژ جهت تولید:</strong>{" "}
          {rowData.productionAmount || "-"}
        </p>

        <p className="font-medium text-slate-800 text-lg">
          <strong className="text-base">قیمت:</strong> {rowData.price || "-"}
        </p>
      </div>

      <p className="font-medium text-slate-800 text-lg">
        <strong className="text-base">ثبت شده توسط:</strong>{" "}
        {rowData.Author?.Title || "-"}
      </p>
    </div>
  );
};
