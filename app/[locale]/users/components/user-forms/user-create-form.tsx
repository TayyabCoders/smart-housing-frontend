"use client";

import { BaseForm } from "@/components/form/base-form";
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { UserModuleUser } from "@/app/[locale]/users/types/user";
import { createUserSchema, updateUserSchema } from "@/validations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createUser as createUserAction,
  updateUser as updateUserAction,
} from "@/redux/slices/user-slice";
import { FormField } from "@/components/form/types/form";

interface UserFormProps {
  modalClose: () => void;
  initialData?: UserModuleUser;
  isUpdate?: boolean;
}

const UserCreateForm = ({ modalClose, initialData, isUpdate }: UserFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.users);

  // ✅ Choose schema dynamically (call the function)
  const validationSchema = isUpdate ? updateUserSchema() : createUserSchema();
  type UserFormData = z.infer<typeof validationSchema>;

  // ✅ Handle submit
  const onSubmit = async (values: UserFormData) => {
    try {
      if (isUpdate && initialData) {
        await dispatch(
          updateUserAction({
            id: initialData._id,
            userData: values,
          })
        ).unwrap();
        toast.success("User updated successfully");
      } else {
        await dispatch(createUserAction(values as any)).unwrap();
        toast.success("User created successfully");
      }
      modalClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  // ✅ Define form fields
  const userFormFields: FormField[] = [
    {
      id: "user-info",
      name: "user-info",
      type: "section",
      label: "User Information",
      defaultOpen: true,
      collapsible: false,
      grid: { columns: { sm: 1, md: 2, lg: 2 }, gap: 4 },
      fields: [
        {
          id: "username",
          name: "username",
          type: "text",
          label: "Username",
          required: true,
          placeholder: "Enter username",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "email",
          name: "email",
          type: "email",
          label: "Email",
          required: true,
          placeholder: "Enter email address",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "password",
          name: "password",
          type: "password",
          label: "Password",
          required: true,
          placeholder: "Enter password",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "role",
          name: "role",
          type: "select",
          label: "Role",
          placeholder: "Select role",
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ],
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "phone_number",
          name: "phone_number",
          type: "text",
          label: "Phone Number",
          placeholder: "+1234567890",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "age",
          name: "age",
          type: "number",
          label: "Age",
          placeholder: "Enter age",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "gender",
          name: "gender",
          type: "select",
          label: "Gender",
          placeholder: "Select gender",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ],
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "address",
          name: "address",
          type: "text",
          label: "Address",
          placeholder: "Enter address",
          span: { sm: 1, md: 2, lg: 2 },
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "city",
          name: "city",
          type: "text",
          label: "City",
          placeholder: "Enter city",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "country",
          name: "country",
          type: "text",
          label: "Country",
          placeholder: "Enter country",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "zip_code",
          name: "zip_code",
          type: "text",
          label: "Zip Code",
          placeholder: "Enter zip code",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
      ],
    },
  ];

  // ✅ Default values for form
  const defaultValues =
    isUpdate && initialData
      ? {
          username: initialData.username || "",
          email: initialData.email || "",
          phone_number: initialData.phone_number || "",
          age: initialData.age || undefined,
          role: initialData.role || "",
          gender: initialData.gender || "",
          address: initialData.address || "",
          city: initialData.city || "",
          country: initialData.country || "",
          zip_code: initialData.zip_code || "",
        }
      : {};

  const isPending = loading;

  return (
    <div className="space-y-6">
      <Heading
        title={isUpdate ? "Edit User" : "New User"}
        description={isUpdate ? `Update user: ${initialData?.email}` : "Add a new user"}
        className="text-center"
      />

      <BaseForm
        fields={userFormFields}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        submitText={isUpdate ? "Update User" : "Create User"}
        renderSubmitButton={() => (
          <div className="mt-6 flex justify-end gap-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={modalClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUpdate ? "Updating..." : "Creating..."}
                </>
              ) : isUpdate ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        )}
        loading={isPending}
      />
    </div>
  );
};

export default UserCreateForm;
