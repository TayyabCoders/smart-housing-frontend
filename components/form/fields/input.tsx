"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { BaseField } from "../base-field";
import { FormField } from "@/components/form/types/form";
import { Eye, EyeOff } from "@/lib/icons/icons";
import { cn } from "@/lib/tailwindUtils/utils";

export const InputField = ({ field }: { field: FormField }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = field.type === "password";

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value, className, ...props }: any) => (
        <div className="relative">
          {field.icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
              {field.icon}
            </span>
          )}

          <Input
            type={isPassword && showPassword ? "text" : field.type}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value ?? ""}
            disabled={field.disabled}
            className={cn(className, isPassword && "pr-10", field.icon && "pl-10")}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      )}
    />
  );
};
