import { useState } from "react";
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
import { getStatusLabel } from "../../lib/getStatusLabel";
import { useChangePreInvoiceRow } from "../../hooks/useChangePreInvoiceRow";
import { Modal } from "../modal/Modal";

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
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => (
      <div>{getStatusLabel(row.getValue("status")) || "-"}</div>
    ),
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
    cell: ({ row }) => <div>{row.getValue("editorTitle") || "-"}</div>,
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

  const table = useReactTable({
    data: preInvoiceRows,
    columns,
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
    <div className="w-full">
      <Input
        placeholder="جست‌وجو در همه ستون‌ها ..."
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="max-w-sm px-2 mb-3 border-2 rounded-xl text-base"
      />

      <div className="overflow-hidden rounded-md border my-3">
        <Table>
          <TableHeader className="bg-slate-300">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2 flex items-center justify-center">
          <div
            className="flex items-center justify-center p-2 rounded-full hover:bg-slate-300 transition-all duration-300"
            onClick={() => table.nextPage()}
          >
            <CircleChevronRight color="black" />
          </div>
          <div
            className="flex items-center justify-center p-2 rounded-full hover:bg-slate-300 transition-all duration-300"
            onClick={() => table.previousPage()}
          >
            <CircleChevronLeft color="black" />
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
