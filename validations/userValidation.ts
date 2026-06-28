// ✅ src/schemas/user-schema.ts
import { z } from "zod";

const translate =
  (t?: (key: string) => string) =>
  (key: string, fallback: string): string =>
    t ? t(key) : fallback;

// ✅ CREATE USER SCHEMA
export const createUserSchema = (t?: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .min(1, { message: translate(t)("usernameRequired", "Username is required") })
      .min(2, {
        message: translate(t)("usernameMinLength", "Username must be at least 2 characters"),
      }),
    email: z
      .string()
      .min(1, { message: translate(t)("emailRequired", "Email is required") })
      .email({ message: translate(t)("emailInvalid", "Please enter a valid email") }),
    password: z
      .string()
      .min(1, { message: translate(t)("passwordRequired", "Password is required") })
      .min(6, { message: translate(t)("passwordMinLength", "Password must be at least 6 characters") }),
    phone_number: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[0-9+\-() ]{6,20}$/.test(val),
        "Please enter a valid phone number"
      ),
    age: z
      .coerce
      .number({
        invalid_type_error: "Age must be a number",
      })
      .min(1, { message: translate(t)("ageMin", "Age must be at least 1") })
      .max(150, { message: translate(t)("ageMax", "Age must be less than 150") })
      .optional(),
    role: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    zip_code: z.string().optional(),
  });

// ✅ UPDATE USER SCHEMA (partial)
export const updateUserSchema = (t?: (key: string) => string) => createUserSchema(t).partial();

// ✅ USER SEARCH + FILTER SCHEMA
export const userSearchSchema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  isActive: z.boolean().optional(),
  sort: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// ✅ Export default schemas for use in forms
export const userSchema = createUserSchema();
export const userUpdateSchema = updateUserSchema();

// ✅ Type exports
export type CreateUserFormValues = z.infer<ReturnType<typeof createUserSchema>>;
export type UpdateUserFormValues = z.infer<ReturnType<typeof updateUserSchema>>;
export type UserSearchParams = z.infer<typeof userSearchSchema>;
