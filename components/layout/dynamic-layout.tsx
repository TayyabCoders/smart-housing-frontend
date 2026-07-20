"use client";

import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import MobileHamburgerMenu from "./mobile-hamburger-menu";
import { cn } from "@/lib/tailwindUtils/utils";
import { Footer } from "./footer/index";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/components/layout/types/layout";
import { Header as WebsiteHeader } from "@/app/[locale]/home/components/header";

interface DynamicLayoutProps extends PropsWithChildren {
  className?: string;
}

export function DynamicLayout({ children, className }: DynamicLayoutProps) {
  const { config, state, isMobile, responsive, closeMobileMenu } = useLayout();
  const { isTablet, width } = responsive;

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (state.mobileMenuOpen && !isMobile) {
      closeMobileMenu();
    }
  }, [isMobile, state.mobileMenuOpen, closeMobileMenu]);

  // Dashboard Layout - with RTL support via grid
  if (config.type === "dashboard") {
    const showSidebar = config.showSidebar && !isMobile;

    return (
      <div className={cn("min-h-screen bg-background", className)}>
        {showSidebar && (
          <aside
            className={cn(
              "fixed start-0 top-0 h-screen bg-background border-e border-border transition-all duration-300 ease-in-out z-30",
              state.sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
              "transform-gpu will-change-[width,transform]"
            )}
          >
            <Sidebar />
          </aside>
        )}
        {config.showHeader && (
          <div
            className={cn(
              "fixed top-0 end-0 z-20 transition-all duration-300 ease-in-out",
              showSidebar && !state.sidebarCollapsed && "w-[calc(100%-16rem)]",
              showSidebar && state.sidebarCollapsed && "w-[calc(100%-4rem)]",
              !showSidebar && "w-full",
              "transform-gpu will-change-[width]"
            )}
          >
            <Header />
          </div>
        )}
        <main
          className={cn(
            "min-h-screen transition-all duration-300 ease-in-out",
            width < 640 ? "p-3" : isTablet ? "p-4" : "p-6",
            "pt-16", // must come after the responsive p-* class so twMerge keeps this override
            showSidebar && !state.sidebarCollapsed && "ms-64", // margin-inline-start for RTL
            showSidebar && state.sidebarCollapsed && "ms-16",
            "transform-gpu will-change-[margin]"
          )}
        >
          {children}
        </main>

        {config.showFooter && (
          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              showSidebar && !state.sidebarCollapsed && "ms-64",
              showSidebar && state.sidebarCollapsed && "ms-16",
              "transform-gpu will-change-[margin]"
            )}
          >
            <Footer />
          </div>
        )}
        {isMobile && state.mobileMenuOpen && (
          <>
            <MobileHamburgerMenu onClose={closeMobileMenu} />
            <div
              className={cn(
                "fixed inset-0 bg-black/50 z-40 transition-opacity duration-200",
                "backdrop-blur-sm"
              )}
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            />
          </>
        )}
      </div>
    );
  }

  // Website Layout - RTL automatically supported
  return (
    <div className={cn("min-h-screen bg-background flex flex-col", className)}>
      {config.showHeader && <WebsiteHeader />}
      <main className="flex-1">{children}</main>
      {config.showFooter && <Footer />}
    </div>
  );
}

export default DynamicLayout;
