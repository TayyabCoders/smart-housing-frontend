"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HomeIcon,
  UserIcon,
  BarChartIcon,
  LogoutIcon,
  CameraIcon,
  VideoIcon,
  CarIcon,
  ScanFaceIcon,
  ShieldAlertIcon,
  ActivityIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  UsersIcon,
  ChatIcon,
  VoteIcon,
  ChatbotIcon,
} from "@/lib/icons/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/tailwindUtils/utils";
import { useTranslations } from "next-intl";
import { useLayout } from "@/contexts/layout-context";
import { removeAuthCookies } from "@/lib/cookie/cookie"; // New import
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [manuallyClosed, setManuallyClosed] = useState<string | null>(null);
  const { user } = useAuth();

  // Responsive behavior: auto-collapse on tablet, hide collapse button on mobile
  const { isTablet, isDesktop, isLargeDesktop } = responsive;

  const ADMIN_ONLY_HREFS = new Set(["/", "/dashboard", "/users", "/surveillance"]);
  const isAdmin = user?.role === "admin";

  let allNavItems = t.raw("items");
  if (!Array.isArray(allNavItems)) allNavItems = [];
  const navItems = allNavItems.filter((item: any) => isAdmin || !ADMIN_ONLY_HREFS.has(item.href));

  const pickIcon = (href: string, title: string) => {
    if (href === "/") return HomeIcon;
    if (href === "/dashboard") return BarChartIcon;
    if (href === "/users") return UsersIcon;
    if (href === "/chat") return ChatIcon;
    if (href === "/voting") return VoteIcon;
    if (href === "/complaints") return FileTextIcon;
    if (href === "/surveillance") return CameraIcon;
    if (href === "/chatbot") return ChatbotIcon;

    const key = title.toLowerCase();
    if (key.includes("home") || key.includes("ہوم")) return HomeIcon;
    if (key.includes("dashboard") || key.includes("ڈیش بورڈ")) return BarChartIcon;
    if (key.includes("user") || key.includes("صارف")) return UserIcon;
    if (key.includes("surveillance") || key.includes("سريلينس")) return CameraIcon;
    return HomeIcon;
  };

  const pickChildIcon = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes("overview") || key.includes("جائزہ") || key.includes("نظرة عامة"))
      return LayoutDashboardIcon;
    if (key.includes("live") || key.includes("لائیو") || key.includes("مباشرة")) return VideoIcon;
    if (key.includes("vehicle") || key.includes("گاڑی") || key.includes("مركبات")) return CarIcon;
    if (
      key.includes("facial") ||
      key.includes("face") ||
      key.includes("چہرے") ||
      key.includes("وجوه")
    )
      return ScanFaceIcon;
    if (key.includes("alert") || key.includes("الرٹس") || key.includes("تنبيهات"))
      return ShieldAlertIcon;
    if (key.includes("log") || key.includes("لاگز") || key.includes("سجلات")) return FileTextIcon;
    return BarChartIcon;
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
          const hasChildren = item.children && Array.isArray(item.children);
          const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
          const Icon = pickIcon(item.href, item.title);
          const isPathMatch = pathname.startsWith(`${item.href}/`);
          const isOpen =
            (openDropdown === item.href || isPathMatch) && manuallyClosed !== item.href;

          if (hasChildren) {
            return (
              <div key={item.href}>
                <button
                  onClick={() => {
                    if (isOpen) {
                      setOpenDropdown(null);
                      setManuallyClosed(item.href);
                    } else {
                      setOpenDropdown(item.href);
                      setManuallyClosed(null);
                    }
                  }}
                  className={cn(
                    "w-full flex rounded-lg font-medium transition-all group",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    isTablet ? "text-xs" : "text-sm",
                    {
                      "bg-accent text-accent-foreground shadow-sm": isActive,
                      "text-muted-foreground": !isActive,
                      "justify-center p-3 w-12 h-12 mx-auto": isCollapsed,
                      "justify-between items-center": !isCollapsed,
                      "gap-3 px-3 py-2.5": !isCollapsed && !isRTL && (isDesktop || isLargeDesktop),
                      "gap-2 px-2 py-2": !isCollapsed && !isRTL && isTablet,
                      "gap-2 px-3 py-2.5": !isCollapsed && isRTL,
                    }
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <Icon
                        className={cn(
                          isTablet ? "h-3.5 w-3.5" : "h-4 w-4",
                          "flex-shrink-0 transition-opacity group-hover:opacity-0"
                        )}
                      />
                      {!isCollapsed && (
                        <ChevronRight
                          className={cn(
                            "absolute transition-opacity opacity-0 group-hover:opacity-100",
                            isOpen ? "rotate-90" : ""
                          )}
                        />
                      )}
                    </div>
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
                  </div>
                </button>
                {!isCollapsed && isOpen && (
                  <div className="mt-1 ml-4 space-y-1">
                    {item.children.map((child: any) => {
                      const isChildActive = pathname === child.href;
                      const ChildIcon = pickChildIcon(child.title);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex rounded-lg font-medium transition-all",
                            "hover:bg-accent hover:text-accent-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            isTablet ? "text-xs" : "text-sm",
                            {
                              "bg-accent text-accent-foreground shadow-sm": isChildActive,
                              "text-muted-foreground": !isChildActive,
                              "justify-start items-center gap-3 px-3 py-2": !isRTL,
                              "justify-end items-center gap-3 px-3 py-2": isRTL,
                            }
                          )}
                        >
                          <ChildIcon
                            className={cn(isTablet ? "h-3.5 w-3.5" : "h-4 w-4", "flex-shrink-0")}
                          />
                          <span className="whitespace-normal line-clamp-2">{child.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex rounded-lg font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isTablet ? "text-xs" : "text-sm",
                {
                  "bg-accent text-accent-foreground shadow-sm": isActive,
                  "text-muted-foreground": !isActive,
                  "justify-center p-3 w-12 h-12 mx-auto": isCollapsed,
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
