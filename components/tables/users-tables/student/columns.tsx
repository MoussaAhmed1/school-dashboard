"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IStudent } from "@/types/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const columns: ColumnDef<IStudent>[] = [
  {
    accessorKey: "name",
    header:"name",
    cell: ({ row }) => (<div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={row?.original?.avatar ?? ""}
          alt={row?.original?.name ?? ""}
        />
        <AvatarFallback>{row?.original?.name[0]}</AvatarFallback>
      </Avatar>
      <p >
        {row?.original?.name}
      </p>
    </div>),
    enableHiding: false,
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
  // {
  //   accessorKey: "phone",
  //   header: "phone",
  //   cell: ({ row }) => <p className="rtl:text-right text-left" dir="ltr">{row?.original?.phone}</p> 
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];

