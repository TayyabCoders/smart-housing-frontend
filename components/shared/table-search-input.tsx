import React, { useCallback } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";

export default function TableSearchInput({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamsRef = React.useRef(searchParams);
  const search = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = React.useState(search);
  const isUpdatingUrlRef = React.useRef(false);
  const hasMountedRef = React.useRef(false);
  // debounce the search input
  const [debouncedValue] = useDebounce(searchTerm, 1000);

  // Update ref when searchParams changes
  React.useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const handleSettingSearchParams = useCallback(
    (newSearchValue: string) => {
      if (isUpdatingUrlRef.current) return;
      
      const currentSearch = searchParamsRef.current.get("search") || "";
      
      // Skip if value hasn't changed
      if (currentSearch === newSearchValue) return;

      isUpdatingUrlRef.current = true;
      const params = new URLSearchParams(searchParamsRef.current);

      // Update the URL with the new search value
      if (newSearchValue === "" || newSearchValue === undefined || !newSearchValue) {
        params.delete("search");
      } else {
        params.set("page", "1"); // Reset to first page
        params.set("search", newSearchValue);
      }

      router.push(`?${params.toString()}`);
      
      // Reset flag after a short delay
      setTimeout(() => {
        isUpdatingUrlRef.current = false;
      }, 100);
    },
    [router]
  );

  React.useEffect(() => {
    // Skip on initial mount to prevent unnecessary URL update
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    handleSettingSearchParams(debouncedValue);
  }, [debouncedValue, handleSettingSearchParams]);

  // Sync search term when URL changes (only if not updating URL ourselves)
  React.useEffect(() => {
    if (!isUpdatingUrlRef.current && searchTerm !== search) {
      setSearchTerm(search);
    }
  }, [search]);
  return (
    <Input
      placeholder={placeholder || `Search...`}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
    />
  );
}
