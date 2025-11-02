import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  ArrowUpDown,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { IChangePreInvoiceRowHistoryListItem } from "../../types/type";
import moment from "jalali-moment";
import { useChangePreInvoiceRow } from "../../hooks/useChangePreInvoiceRow";
import { Modal } from "../modal/Modal";
import { ActionsCell } from "../action-colomn/ActionCell";
import {
  getCurrentUser,
  getCustomerFactorByOrderNumber,
} from "../../api/getData";

const columns: ColumnDef<IChangePreInvoiceRowHistoryListItem>[] = [
  {
    accessorKey: "Title",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        شماره ردیف در پیش‌فاکتور
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("Title")}</div>,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "preInvoiceProductTitle",
    header: "شرح محصول",
    cell: ({ row }) => (
      <div>{row.getValue("preInvoiceProductTitle") || "-"}</div>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: "customerName",
    header: "نام مشتری",
    cell: ({ row }) => <div>{row.getValue("customerName") || "-"}</div>,
    enableGlobalFilter: true,
  },
  {
    accessorFn: (row) => row.Created || "-",
    id: "Created",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        تاریخ درخواست
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const createdDate = row.getValue("Created");
      const jalaliDate =
        createdDate && createdDate !== "-"
          ? moment(createdDate).locale("fa").format("YYYY/MM/DD")
          : "-";
      return <div>{jalaliDate}</div>;
    },
    enableGlobalFilter: true,
  },
  {
    accessorFn: (row) => row.Editor?.Title || "-",
    id: "editorTitle",
    header: "عملیات",
    cell: ({ row }) => <ActionsCell rowItem={row.original} />,
    enableGlobalFilter: true,
  },
];

export function ChangeHistoryTable() {
  const { data: preInvoiceRows = [], isLoading } = useChangePreInvoiceRow();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<IChangePreInvoiceRowHistoryListItem | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<
    IChangePreInvoiceRowHistoryListItem[]
  >([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const filterDataByUser = async () => {
      if (!currentUser || !preInvoiceRows.length) {
        setFilteredData(preInvoiceRows);
        return;
      }

      setIsFiltering(true);

      try {
        const filteredItems: IChangePreInvoiceRowHistoryListItem[] = [];

        if (currentUser === "i:0#.w|zarsim\\Rashaadmin") {
          setFilteredData(preInvoiceRows);
          setIsFiltering(false);
          return;
        }

        for (const row of preInvoiceRows) {
          try {
            const customerFactor = await getCustomerFactorByOrderNumber(
              row.orderNumber
            );

            if (customerFactor) {
              const isAuthorized =
                customerFactor.FirstUser === currentUser ||
                customerFactor.managertext === currentUser;

              if (isAuthorized) {
                filteredItems.push(row);
              }
            }
          } catch (error) {
            console.error(
              `خطا در بررسی دسترسی برای orderNumber ${row.orderNumber}:`,
              error
            );
          }
        }

        setFilteredData(filteredItems);
      } catch (error) {
        console.error("خطا در فیلتر کردن داده‌ها:", error);
        setFilteredData(preInvoiceRows);
      } finally {
        setIsFiltering(false);
      }
    };

    filterDataByUser();
  }, [currentUser, preInvoiceRows]);

  const table = useReactTable({
    data: filteredData,
    columns,
    // استفاده از ID به عنوان شناسه منحصر به فرد هر ردیف
    getRowId: (row) => row.ID.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const handleRowClick = (row: IChangePreInvoiceRowHistoryListItem) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  if (isLoading || isFiltering) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        {isFiltering && (
          <div className="text-center text-blue-600">
            در حال فیلتر کردن داده‌ها بر اساس دسترسی کاربر...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="bg-blue-300 flex items-center justify-center rounded-lg p-4 max-w-fit w-full">
          <span className="text-slate-700 text-2xl font-semibold">
            مدیریت اصلاحات پیش‌فاکتورها
          </span>
        </div>

        <div className="flex items-center justify-start gap-2 w-full max-w-[500px]">
          <div className="bg-red-300 rounded-lg max-w-fit p-1">
            <span className="text-lg font font-medium">جست و جو:</span>
          </div>
          <Input
            placeholder="جست‌وجو در همه ستون‌ها ..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border my-3">
        <Table>
          <TableHeader className="bg-green-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original)}
                  className="hover:bg-slate-300 transition-all duration-300 cursor-pointer h-10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  هیچ داده‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-600">
          نمایش{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          تا{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          از {table.getFilteredRowModel().rows.length} رکورد
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
              !table.getCanPreviousPage()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slate-300 cursor-pointer"
            }`}
            onClick={() => table.getCanPreviousPage() && table.previousPage()}
          >
            <CircleChevronRight
              color={table.getCanPreviousPage() ? "black" : "gray"}
            />
          </div>
          <div
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
              !table.getCanNextPage()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slate-300 cursor-pointer"
            }`}
            onClick={() => table.getCanNextPage() && table.nextPage()}
          >
            <CircleChevronLeft
              color={table.getCanNextPage() ? "black" : "gray"}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRowData}
      />
    </div>
  );
}
