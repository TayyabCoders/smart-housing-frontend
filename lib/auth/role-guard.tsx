"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getToken } from "@/lib/cookie/cookie";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const { isAuthenticated, user } = useSelector((state: RootState) => state.login);
  const token = getToken();

  const locale = pathname.match(/^\/(en|ur|ar)/)?.[1] ?? "en";

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push(`/${locale}/login`);
      return;
    }
    if (user && !allowedRoles.includes(user.role)) {
      router.push(`/${locale}/chat`);
    }
  }, [isAuthenticated, token, user, router, locale, allowedRoles]);

  if (!isAuthenticated && !token) return null;
  if (user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
