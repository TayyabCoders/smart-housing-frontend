"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";

import { AlertModal } from "@/components/shared/alert-modal";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";
import UserCreateForm from "../user-forms/user-create-form";
import { UserDetailsModal } from "../user-details-modal";

import { UserModuleUser } from "@/app/[locale]/users/types/user";
import { deleteUser } from "@/redux/slices/user-slice";
import { AppDispatch, RootState } from "@/redux/store";

interface CellActionProps {
  data: UserModuleUser;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.users);

  // ✅ Confirm delete via Redux thunk
  const onConfirm = async () => {
    if (!data?.id) {
      toast.error("Invalid user data");
      return;
    }

    try {
      await dispatch(deleteUser(data.id)).unwrap();
      toast.success("User deleted successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error || "Failed to delete user");
    }
  };

  // ✅ Handlers
  const handleViewDetails = () => {
    if (!data?.id) {
      toast.error("Invalid user data");
      return;
    }
    setShowDetailsModal(true);
  };

  const handleEdit = () => {
    if (!data?.id) {
      toast.error("Invalid user data");
      return;
    }
    setShowUpdateForm(true);
  };

  const handleDelete = () => {
    if (!data?.id) {
      toast.error("Invalid user data");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      {/* Delete confirmation modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />

      {/* View details modal */}
      <UserDetailsModal
        user={data}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />

      {/* Update user modal */}
      <Modal open={showUpdateForm} onOpenChange={setShowUpdateForm}>
        <ModalContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ModalHeader>
            <ModalTitle>Edit User</ModalTitle>
          </ModalHeader>
          <UserCreateForm modalClose={() => setShowUpdateForm(false)} initialData={data} isUpdate />
        </ModalContent>
      </Modal>

      {/* Action dropdown */}
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
          <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={handleViewDetails}
            className="cursor-pointer hover:bg-accent focus:bg-accent"
          >
            <Eye className="mr-2 h-4 w-4 text-blue-500" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleEdit}
            className="cursor-pointer hover:bg-accent focus:bg-accent"
          >
            <Edit className="mr-2 h-4 w-4 text-green-500" />
            <span>Edit User</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive focus:text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
