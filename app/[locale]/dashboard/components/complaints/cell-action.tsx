"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Complaint } from "../../types";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/redux/store";
import { updateComplaintStatus } from "@/redux/slices/complaint-slice";

interface CellActionProps {
  data: Complaint;
  onStatusUpdate?: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onStatusUpdate }) => {
  const t = useTranslations("dashboard");
  const dispatch = useAppDispatch();

  const handleStatusChange = async (newStatus: "pending" | "in_progress" | "resolved" | "rejected") => {
    try {
      await dispatch(updateComplaintStatus({ id: data.id, status: newStatus }));
      
      // Trigger refresh of the complaint list
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error(`Failed to update status for complaint ${data.id}`, { error });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-accent"
          aria-label="Open actions menu"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-semibold">{t("complaints.actions.changeStatus")}</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => handleStatusChange("pending")}
          className="cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
          <span>{t("complaints.status.pending")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusChange("in_progress")}
          className="cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
          <span>{t("complaints.status.inProgress")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusChange("resolved")}
          className="cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
          <span>{t("complaints.status.resolved")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusChange("rejected")}
          className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive focus:text-destructive"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />
          <span>{t("complaints.status.rejected")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
