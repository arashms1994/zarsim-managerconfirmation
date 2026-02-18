import type { IDetailCustomerFactorListItem } from "../../types/type";

export const PreInvoiceRowDetail: React.FC<{
  detailCustomerFactor: IDetailCustomerFactorListItem | null | undefined;
}> = ({ detailCustomerFactor }) => {
  return (
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
          <strong className="text-base">کدطرح:</strong>{" "}
          {detailCustomerFactor?.Product || "-"}
        </p>

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
  );
};
