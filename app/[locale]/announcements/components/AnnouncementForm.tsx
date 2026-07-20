"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { BaseForm } from "@/components/form/base-form";
import { Button } from "@/components/ui/button/button";
import { FormField } from "@/components/form/types/form";
import { createAnnouncementSchema, updateAnnouncementSchema } from "@/validations";
import { createAnnouncement, updateAnnouncement } from "@/redux/slices/announcement-slice";
import { useAppDispatch } from "@/redux/store";
import { Announcement } from "../types";

interface AnnouncementFormProps {
  modalClose: () => void;
  initialData?: Announcement;
  isUpdate?: boolean;
}

export default function AnnouncementForm({
  modalClose,
  initialData,
  isUpdate,
}: AnnouncementFormProps) {
  const dispatch = useAppDispatch();
  const validationSchema = isUpdate ? updateAnnouncementSchema() : createAnnouncementSchema();
  type AnnouncementFormData = z.infer<typeof validationSchema>;

  const onSubmit = async (values: AnnouncementFormData) => {
    try {
      if (isUpdate && initialData) {
        await dispatch(updateAnnouncement({ id: initialData.id, data: values })).unwrap();
        toast.success("Announcement updated successfully");
      } else {
        await dispatch(createAnnouncement(values as any)).unwrap();
        toast.success("Announcement created successfully");
      }
      modalClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const announcementFormFields: FormField[] = [
    {
      id: "title",
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      placeholder: "Announcement title",
    },
    {
      id: "summary",
      name: "summary",
      type: "textarea",
      label: "Summary",
      required: true,
      placeholder: "Short summary shown on the card",
    },
    {
      id: "description",
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
      placeholder: "Full announcement details",
    },
  ];

  const defaultValues =
    isUpdate && initialData
      ? {
          title: initialData.title,
          summary: initialData.summary,
          description: initialData.description,
        }
      : {};

  return (
    <BaseForm
      fields={announcementFormFields}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      submitText={isUpdate ? "Update Announcement" : "Create Announcement"}
      renderSubmitButton={({ isSubmitting }) => (
        <div className="mt-6 flex justify-end gap-4 border-t pt-4">
          <Button type="button" variant="outline" onClick={modalClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isUpdate ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      )}
    />
  );
}
