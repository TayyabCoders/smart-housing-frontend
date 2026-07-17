"use client";
import { useEffect, useRef, useMemo } from "react";
import { useLayoutActions } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { RoleGuard } from "@/lib/auth/role-guard";
import PageHead from "@/components/shared/page-head";
import UserTable from "./components/user-table";
import { DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useSearchParams } from "next/navigation";
import { fetchUsers, setFilters } from "@/redux/slices/user-slice";
import { UserListParams } from "@/app/[locale]/users/types/user";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function UserPage() {
  const { setLayoutType } = useLayoutActions();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const layoutSetRef = useRef(false);
  const prevFiltersRef = useRef<string>("");

  // Set dashboard layout
  useEffect(() => {
    if (!layoutSetRef.current) {
      setLayoutType("dashboard");
      layoutSetRef.current = true;
    }
  }, [setLayoutType]);

  // Get state from Redux store
  const { users, loading, error, pagination, filters } = useAppSelector((state) => state.users);

  // Extract filter parameters from URL
  const search = searchParams.get("search") || undefined;
  const cityParam = searchParams.get("city");
  const city = cityParam || undefined;
  const countryParam = searchParams.get("country");
  const country = countryParam || undefined;
  const genderParam = searchParams.get("gender");
  const gender = (genderParam as "Male" | "Female" | "Other") || undefined;
  const isActiveParam = searchParams.get("isActive");
  const isActive = isActiveParam ? isActiveParam === "true" : undefined;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const sort = searchParams.get("sort") || "-createdAt";

  // Build filters object
  const currentFilters: UserListParams = useMemo(
    () => ({
      search,
      city,
      country,
      gender,
      isActive,
      page,
      limit,
      sort,
    }),
    [search, city, country, gender, isActive, page, limit, sort]
  );

  // Fetch users when filters change
  useEffect(() => {
    const filtersString = JSON.stringify(currentFilters);
    
    // Only fetch if filters have actually changed
    if (prevFiltersRef.current === filtersString) return;
    
    prevFiltersRef.current = filtersString;
    dispatch(setFilters(currentFilters));
    dispatch(fetchUsers(currentFilters));
  }, [dispatch, currentFilters]);

  const isLoading = loading;

  // Show skeleton only on initial load
  if (isLoading && users.length === 0 && !error) {
    return (
      <RoleGuard allowedRoles={["admin"]}>
        <DynamicLayout>
          <div className="pt-4 sm:pt-6 md:pt-12">
            <PageHead title="User Management | Next Starter" />
            <Breadcrumbs
              items={[
                { title: "Dashboard", link: "/dashboard" },
                { title: "Users", link: "/users" },
              ]}
            />
            <DataTableSkeleton columnCount={11} />
          </div>
        </DynamicLayout>
      </RoleGuard>
    );
  }
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DynamicLayout>
        <div className="pt-4 sm:pt-6 md:pt-12">
          <PageHead title="User Management | Next Starter" />
          <Breadcrumbs
            items={[
              { title: "Dashboard", link: "/dashboard" },
              { title: "Users", link: "/users" },
            ]}
          />
          <UserTable
            users={users}
            page={pagination.page}
            totalUsers={pagination.total}
            pageCount={pagination.pages}
          />
        </div>
      </DynamicLayout>
    </RoleGuard>
  );
}
