import moment from "jalali-moment";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "../action-colomn/ActionCell";
import type { IChangePreInvoiceRowHistoryListItem } from "../../types/type";

export const columns: ColumnDef<IChangePreInvoiceRowHistoryListItem>[] = [
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
            <div className="w-full max-w-[800px] truncate">
                {row.getValue("preInvoiceProductTitle") || "-"}
            </div>
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
        cell: ({ row }) => <ActionsCell rowItem={row.original} />,
        enableGlobalFilter: true,
    },
];