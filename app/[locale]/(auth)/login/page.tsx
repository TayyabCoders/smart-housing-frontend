"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { createLoginSchema, type LoginFormValues } from "@/validations/authValidation";
import { BaseForm } from "@/components/form/base-form";
import type { FormField } from "@/components/form/types/form";
import { useAppDispatch } from "@/redux/store";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import { loginUser } from "@/redux/slices/login-slice";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const vt = useTranslations("auth.validation");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useCurrentLocale();

  const [isLoading, setIsLoading] = useState(false); // classic login
  const loginSchema = useMemo(() => createLoginSchema(vt), [vt]);

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();

      toast.success(t("success") || "Logged in");
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      const msg = typeof err === "string" ? err : err?.message || "Login failed";
      toast.error(t("error") || "Login failed", { description: msg });
    } finally {
      setIsLoading(false);
    }
  }

  const formFields: FormField[] = [
    {
      id: "email",
      name: "email",
      label: t("emailLabel"),
      type: "email",
      placeholder: t("emailLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
    {
      id: "password",
      name: "password",
      label: t("passwordLabel"),
      type: "password",
      placeholder: t("passwordLabel"),
      required: true,
      className: "text-sm md:text-base",
    },
  ];

  return (
    <div className="relative space-y-6">
      <div className="flex justify-center mb-2">
        <Image
          src="/logo.png"
          alt="Residora Logo"
          width={280}
          height={187}
          className="object-contain"
          priority
        />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm md:text-base">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        <BaseForm
          fields={formFields}
          onSubmit={onSubmit}
          defaultValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          submitText={t("submitButton")}
          renderSubmitButton={({ isSubmitting }) => (
            <button
              type="submit"
              className="w-full cursor-pointer text-sm md:text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading || isSubmitting} // block while login is in progress
            >
              {isLoading || isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  {t("submittingButton")}
                </div>
              ) : (
                t("submitButton")
              )}
            </button>
          )}
        />
      </div>
    </div>
  );
}
