"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Notification } from "@/types/notifications";
import { formatCreatedAtDateAsDateTime, shortenText } from "@/utils/helperFunctions";


export const NotificationsColumns: ColumnDef<Notification>[] = [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "text",
    header: "text",
    cell: ({ row }) => shortenText((row?.original?.text),40)
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p>
        {formatCreatedAtDateAsDateTime(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}   />,
  },
];