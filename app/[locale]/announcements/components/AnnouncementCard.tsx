"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button/button";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { AlertModal } from "@/components/shared/alert-modal";
import { EditIcon, DeleteIcon, ExpandIcon, CollapseIcon } from "@/lib/icons/icons";
import { deleteAnnouncement } from "@/redux/slices/announcement-slice";
import { useAppDispatch } from "@/redux/store";
import AnnouncementForm from "./AnnouncementForm";
import { Announcement } from "../types";

interface AnnouncementCardProps {
  announcement: Announcement;
  isAdmin: boolean;
}

export default function AnnouncementCard({ announcement, isAdmin }: AnnouncementCardProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onConfirmDelete = async () => {
    try {
      setDeleting(true);
      await dispatch(deleteAnnouncement(announcement.id)).unwrap();
      toast.success("Announcement deleted");
      setShowDeleteConfirm(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete announcement");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <CollapsibleTrigger asChild>
            <button className="flex-1 cursor-pointer space-y-2 text-left" aria-expanded={open}>
              <CardTitle className="flex items-center gap-2 text-base">
                <span>{announcement.title}</span>
                {open ? (
                  <CollapseIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ExpandIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </CardTitle>
              <CardDescription>{announcement.summary}</CardDescription>
            </button>
          </CollapsibleTrigger>

          {isAdmin && (
            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEdit(true)}
                aria-label="Edit announcement"
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Delete announcement"
              >
                <DeleteIcon className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="mt-3 whitespace-pre-wrap border-t pt-4 text-sm leading-relaxed text-muted-foreground">
            {announcement.description}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      {isAdmin && (
        <>
          <Modal open={showEdit} onOpenChange={setShowEdit}>
            <ModalContent className="max-w-2xl">
              <ModalHeader>
                <ModalTitle>Edit Announcement</ModalTitle>
              </ModalHeader>
              <AnnouncementForm
                modalClose={() => setShowEdit(false)}
                initialData={announcement}
                isUpdate
              />
            </ModalContent>
          </Modal>

          <AlertModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={onConfirmDelete}
            loading={deleting}
            title="Delete Announcement"
            description="Are you sure you want to delete this announcement? This action cannot be undone."
          />
        </>
      )}
    </Card>
  );
}
