"use client";

import { Complaint } from "../../types";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/shared/data-table";
import { useTranslations } from "next-intl";
import { CellAction } from "./cell-action";

interface ComplaintManagementTableProps {
  data?: Complaint[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function ComplaintManagementTable({ data = [], isLoading = false, onRefresh }: ComplaintManagementTableProps) {
  const t = useTranslations("dashboard");

  const columns: ColumnDef<Complaint>[] = [
    {
      accessorKey: "fullname",
      header: t("complaints.table.username"),
      cell: ({ row }) => <div className="font-medium">{row.getValue("fullname")}</div>,
    },
    {
      accessorKey: "gender",
      header: t("complaints.table.gender"),
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string;
        const genderMap: Record<string, string> = {
          male: t("complaints.gender.male"),
          female: t("complaints.gender.female"),
          other: t("complaints.gender.other"),
        };
        return <div>{genderMap[gender] || gender}</div>;
      },
    },
    {
      accessorKey: "complaint_detail",
      header: t("complaints.table.complaintDetail"),
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate" title={row.getValue("complaint_detail")}>
          {row.getValue("complaint_detail")}
        </div>
      ),
    },
    {
      accessorKey: "tracking_id",
      header: t("complaints.table.trackingId"),
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("tracking_id")}</div>,
    },
    {
      accessorKey: "status",
      header: t("complaints.table.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        // Normalize status to snake_case for consistent styling
        // Handle: snake_case (in_progress), PascalCase (In_Progress), and camelCase (InProgress)
        const normalizedStatus = status
          .toLowerCase()
          .replace(/_/g, '_')
          .replace(/inprogress/g, 'in_progress')
          .replace(/resolved/g, 'resolved')
          .replace(/pending/g, 'pending')
          .replace(/rejected/g, 'rejected');
        
        const statusStyles: Record<string, string> = {
          pending: "bg-yellow-100 text-yellow-800",
          in_progress: "bg-blue-100 text-blue-800",
          resolved: "bg-green-100 text-green-800",
          rejected: "bg-red-100 text-red-800",
        };
        const statusLabels: Record<string, string> = {
          pending: t("complaints.status.pending"),
          in_progress: t("complaints.status.inProgress"),
          resolved: t("complaints.status.resolved"),
          rejected: t("complaints.status.rejected"),
        };
        return (
          <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[normalizedStatus] || "bg-gray-100 text-gray-800"}`}>
            {statusLabels[normalizedStatus] || status}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: t("complaints.table.createdAt"),
      cell: ({ row }) =>
        row.original.created_at ? new Date(row.original.created_at).toLocaleString() : "N/A",
    },
    {
      accessorKey: "updated_at",
      header: t("complaints.table.updatedAt"),
      cell: ({ row }) =>
        row.original.updated_at ? new Date(row.original.updated_at).toLocaleString() : "N/A",
    },
    {
      id: "actions",
      header: t("complaints.table.actions"),
      cell: ({ row }) => <CellAction data={row.original} onStatusUpdate={onRefresh} />,
    },
  ];

  // Mock data for demonstration
  const mockData: Complaint[] = [
    {
      id: "1",
      fullname: "John Doe",
      gender: "male",
      complaint_detail: "Water supply issue in Block A",
      tracking_id: "CMP-2024-001",
      status: "pending",
      date: "2024-01-15",
      created_at: "2024-01-15T10:30:00",
      updated_at: "2024-01-15T10:30:00",
    },
    {
      id: "2",
      fullname: "Jane Smith",
      gender: "female",
      complaint_detail: "Street light not working",
      tracking_id: "CMP-2024-002",
      status: "in_progress",
      date: "2024-01-14",
      created_at: "2024-01-14T14:20:00",
      updated_at: "2024-01-15T09:15:00",
    },
    {
      id: "3",
      fullname: "Bob Johnson",
      gender: "male",
      complaint_detail: "Garbage collection delay",
      tracking_id: "CMP-2024-003",
      status: "resolved",
      date: "2024-01-13",
      created_at: "2024-01-13T08:45:00",
      updated_at: "2024-01-14T16:30:00",
    },
    {
      id: "4",
      fullname: "Alice Brown",
      gender: "female",
      complaint_detail: "Road damage near main gate",
      tracking_id: "CMP-2024-004",
      status: "pending",
      date: "2024-01-12",
      created_at: "2024-01-12T11:00:00",
      updated_at: "2024-01-12T11:00:00",
    },
    {
      id: "5",
      fullname: "Charlie Wilson",
      gender: "male",
      complaint_detail: "Noise complaint from neighbor",
      tracking_id: "CMP-2024-005",
      status: "rejected",
      date: "2024-01-11",
      created_at: "2024-01-11T15:30:00",
      updated_at: "2024-01-12T10:00:00",
    },
  ];

  const tableData = data.length > 0 ? data : mockData;

  return (
    <section className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{t("complaints.title")}</h2>
        <p className="text-muted-foreground">{t("complaints.description")}</p>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        pageCount={1}
        emptyMessage={t("complaints.noData")}
      />
    </section>
  );
}
