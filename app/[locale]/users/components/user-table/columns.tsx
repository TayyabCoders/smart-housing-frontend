"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

export const columns: ColumnDef<UserModuleUser>[] = [
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }) => row.original.username || "N/A",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || "N/A",
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => row.original.phone_number || "N/A",
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (row.original.age !== undefined && row.original.age !== null ? row.original.age : "N/A"),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => row.original.gender || "N/A",
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => row.original.city || "N/A",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => row.original.country || "N/A",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) =>
      row.original.created_at ? new Date(row.original.created_at).toLocaleString() : "N/A",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) =>
      row.original.updated_at ? new Date(row.original.updated_at).toLocaleString() : "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
