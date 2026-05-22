"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  UserIcon,
  BarChartIcon,
  LogoutIcon,
} from "@/lib/icons/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/tailwindUtils/utils";
import { useTranslations } from "next-intl";
import { useLayout } from "@/contexts/layout-context";
import { removeAuthCookies } from "@/lib/cookie/cookie"; // New import
import { useState } from "react";
import { toast } from "sonner";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("layout.sidebar");
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar, responsive } = useLayout();
  const isCollapsed = state.sidebarCollapsed;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Responsive behavior: auto-collapse on tablet, hide collapse button on mobile
  const { isTablet, isDesktop, isLargeDesktop } = responsive;

  let navItems = t.raw("items");
  if (!Array.isArray(navItems)) navItems = [];

  const pickIcon = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes("home") || key.includes("ہوم")) return HomeIcon;
    if (key.includes("dashboard") || key.includes("ڈیش بورڈ")) return BarChartIcon;
    if (key.includes("user") || key.includes("صارف")) return UserIcon;
    return HomeIcon;
  };

  // Detect RTL (Urdu) layout (unchanged)
  const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : false;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Remove auth-related cookies (now via utility)
      removeAuthCookies();
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sidebarClasses = cn(
    "flex flex-col bg-background border-e border-border/40 h-full transition-all duration-300 ease-in-out",
    "w-full",
    // Adjust padding based on screen size for better mobile/tablet experience
    isTablet ? "text-sm" : "text-base",
    className
  );

  return (
    <aside className={sidebarClasses}>
      {/* Sidebar Header */}
      <div
        className={cn(
          "relative flex items-center justify-between border-b border-border/40 min-h-[63px]",
          isRTL ? "p-1" : "p-2"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md object-contain"
            />
            <span className={cn("font-semibold text-md", isRTL ? "mt-1" : "text-left")}>
              {t("navigationLabel")}
            </span>
          </div>
        )}

        {isCollapsed && (
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-md object-contain mx-auto"
          />
        )}

        {/* Collapse/Expand Button - Only show on desktop/large-desktop (not on tablets) */}
        {(isDesktop || isLargeDesktop) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "absolute -end-4 -bottom-1/2 -translate-y-1/2 h-9 w-9 p-0 rounded-full",
              "border border-border/60 bg-background shadow-md ring-1 ring-border/50 hover:bg-accent/60 z-9999 transition-all"
            )}
            aria-label={t(isCollapsed ? "expandLabel" : "collapseLabel")}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            ) : (
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item: any) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = pickIcon(item.title);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex rounded-lg font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                // Responsive text sizing
                isTablet ? "text-xs" : "text-sm",
                {
                  "bg-accent text-accent-foreground shadow-sm": isActive,
                  "text-muted-foreground": !isActive,
                  // Collapsed styles
                  "justify-center p-3 w-12 h-12 mx-auto": isCollapsed,
                  // Expanded styles with responsive padding
                  "justify-start items-center": !isCollapsed,
                  "gap-3 px-3 py-2.5": !isCollapsed && !isRTL && (isDesktop || isLargeDesktop),
                  "gap-2 px-2 py-2": !isCollapsed && !isRTL && isTablet,
                  "gap-2 px-3 py-2.5": !isCollapsed && isRTL,
                }
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className={cn(isTablet ? "h-3.5 w-3.5" : "h-4 w-4", "flex-shrink-0")} />
              {!isCollapsed && (
                <span
                  className={cn(
                    "whitespace-normal line-clamp-2",
                    isRTL ? "text-right w-full" : "truncate"
                  )}
                >
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-2 border-t border-border/40">
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            "w-full flex rounded-lg font-medium transition-all",
            "hover:bg-accent hover:text-accent-foreground bg-transparent text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            // Responsive text sizing
            isTablet ? "text-xs" : "text-sm",
            {
              "justify-center p-3 h-12": isCollapsed,
              "justify-start items-center": !isCollapsed,
              "gap-3 px-3 py-2.5": !isCollapsed && !isRTL && (isDesktop || isLargeDesktop),
              "gap-2 px-2 py-2": !isCollapsed && isTablet,
              "gap-2 px-3 py-2.5": !isCollapsed && isRTL,
            }
          )}
          title={isCollapsed ? t("logout") : undefined}
        >
          <LogoutIcon className={cn(isTablet ? "h-3.5 w-3.5" : "h-4 w-4", "flex-shrink-0")} />
          {!isCollapsed && (
            <span className={cn("whitespace-normal", isRTL ? "text-right w-full" : "truncate")}>
              {isLoggingOut ? t("loggingOut") : t("logout")}
            </span>
          )}
        </Button>
      </div>
    </aside>
  );
}
