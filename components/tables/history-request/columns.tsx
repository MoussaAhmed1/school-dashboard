"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { HistoryOfRequests } from "@/types/watches/requests";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { convertUtcToLocal, getCustomNameKeyLang } from "@/utils/helperFunctions";

export const columns: ColumnDef<HistoryOfRequests>[] = [
  {
    accessorKey: "user",
    header:"user",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.user?.avatar ?? ""}
          alt={row?.original?.user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.user?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p >
          {row?.original?.user?.name ?? ""}
        </p>
        <p >
          {row?.original?.is_parent ? `(${getCustomNameKeyLang("Parent","والد")})`:`(${getCustomNameKeyLang("Driver","سائق")})`}
        </p>
      </div>
    </div>),
    enableHiding: true,
  },
  {
    accessorKey: "student",
    header:"student",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.watch_user?.avatar ?? ""}
          alt={row?.original?.watch_user?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.watch_user?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.watch_user?.name}
      </p>
    </div>),
    enableHiding: true,
  },
  {
    accessorKey: "parent",
    header:"parent",
    cell: ({ row }) => (
      row?.original?.parent ?
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.parent?.avatar ?? ""}
          alt={row?.original?.parent?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.parent?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.parent?.name}
      </p>
    </div>:"-"),
    enableHiding: true,
  },
  {
    accessorKey: "driver",
    header:"driver",
    cell: ({ row }) => (
      row?.original?.driver?
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.driver?.avatar ?? ""}
          alt={row?.original?.driver?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.driver?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.driver?.name}
      </p>
    </div>:"-"),
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header:"status",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => <div className="flex items-center gap-3">
      <p className="rtl:text-right text-left" dir="ltr">
        {convertUtcToLocal(row?.original?.created_at)}
      </p>
    </div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

