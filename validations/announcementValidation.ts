import { z } from "zod";

const translate =
  (t?: (key: string) => string) =>
  (key: string, fallback: string): string =>
    t ? t(key) : fallback;

export const createAnnouncementSchema = (t?: (key: string) => string) =>
  z.object({
    title: z
      .string()
      .min(1, { message: translate(t)("titleRequired", "Title is required") })
      .max(255, {
        message: translate(t)("titleMaxLength", "Title must be 255 characters or fewer"),
      }),
    summary: z
      .string()
      .min(1, { message: translate(t)("summaryRequired", "Summary is required") })
      .max(500, {
        message: translate(t)("summaryMaxLength", "Summary must be 500 characters or fewer"),
      }),
    description: z
      .string()
      .min(1, { message: translate(t)("descriptionRequired", "Description is required") }),
  });

export const updateAnnouncementSchema = (t?: (key: string) => string) =>
  createAnnouncementSchema(t).partial();

export type CreateAnnouncementFormValues = z.infer<ReturnType<typeof createAnnouncementSchema>>;
export type UpdateAnnouncementFormValues = z.infer<ReturnType<typeof updateAnnouncementSchema>>;
