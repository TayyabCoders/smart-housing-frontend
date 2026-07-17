/**
 * Simplified Layout System
 *
 * This layout system supports two types of layouts:
 * 1. Website - Header + Footer (no sidebar)
 * 2. Dashboard - Header + Sidebar + Footer (footer commented out by default)
 */

import type { ResponsiveState } from "@/hooks/use-mobile";

// Layout types
export type LayoutType = "website" | "dashboard";

// Layout configuration interface
export interface LayoutConfig {
  type: LayoutType;
  showHeader: boolean;
  showSidebar: boolean;
  showFooter: boolean;
}

// Runtime state for interactive elements
export interface LayoutState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
}

// Layout context value interface
export interface LayoutContextValue {
  config: LayoutConfig;
  state: LayoutState;
  isMobile: boolean;
  responsive: ResponsiveState; // Full responsive state
  setLayoutType: (type: LayoutType) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// Navigation item interface
export interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

// Predefined layout configurations
export const LAYOUT_CONFIGS: Record<LayoutType, LayoutConfig> = {
  website: {
    type: "website",
    showHeader: true,
    showSidebar: false,
    // The home page brings its own branded Footer; DynamicLayout's generic
    // SimpleFooter would otherwise render underneath it.
    showFooter: false,
  },
  dashboard: {
    type: "dashboard",
    showHeader: true,
    showSidebar: true,
    showFooter: false, // Comment out for now, set to true if needed
  },
};

// Constants
export const SIDEBAR_WIDTH = "w-64"; // 256px
export const SIDEBAR_COLLAPSED_WIDTH = "w-16"; // 64px
export const HEADER_HEIGHT = "h-16"; // 64px
