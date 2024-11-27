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
      <div className="flex flex-col items-start">
        <span> {row?.original?.parent?.name}</span>
      </div>
    </div>:"-"),
    enableHiding: true,
  },
  {
    accessorKey: "parentPhone",
    header:"parentPhone",
    cell: ({ row }) => (
      row?.original?.parent ?
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-start">
        <span> {row?.original?.parent?.phone}</span>
      </div>
    </div>:"-"),
    enableHiding: true,
  },
  {
    accessorKey: "parentEmail",
    header:"parentEmail",
    cell: ({ row }) => (
      row?.original?.parent ?
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-start">
        <span>{row?.original?.parent?.email}</span>
      </div>
    </div>:"-"),
    enableHiding: true,
  },
  {
    accessorKey: "driver",
    header:"driver",
    cell: ({ row }) => (
      row?.original?.drivers?
    <div className="flex items-center">
      <p className="text-center mx-5">
        {row?.original?.drivers?.length}
      </p>
    </div>:"-"),
    enableHiding: true,
  },
];

