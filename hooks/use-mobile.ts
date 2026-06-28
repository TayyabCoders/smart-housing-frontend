"use client";

import * as React from "react";

/**
 * Standard breakpoints for responsive design
 * Covers devices from 400px (small mobile) to 1500px+ (large desktop)
 */
export const BREAKPOINTS = {
  xs: 400, // Extra small mobile (iPhone SE, small Android)
  sm: 640, // Small mobile (standard phones)
  md: 768, // Tablets (iPad mini, portrait)
  lg: 1024, // Laptops (small laptops, iPad landscape)
  xl: 1280, // Desktop (standard desktop)
  "2xl": 1536, // Large desktop (1080p+ monitors)
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
export type DeviceType = "mobile" | "tablet" | "desktop" | "large-desktop";
export type Orientation = "portrait" | "landscape";

/**
 * Enhanced responsive state with detailed device information
 */
export interface ResponsiveState {
  width: number;
  height: number;
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  orientation: Orientation;
  isTouchDevice: boolean;
  breakpoint: BreakpointKey;
}

/**
 * Get device type based on screen width
 */
function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.md) return "mobile";
  if (width < BREAKPOINTS.lg) return "tablet";
  if (width < BREAKPOINTS["2xl"]) return "desktop";
  return "large-desktop";
}

/**
 * Get current breakpoint based on screen width
 */
function getCurrentBreakpoint(width: number): BreakpointKey {
  if (width < BREAKPOINTS.xs) return "xs";
  if (width < BREAKPOINTS.sm) return "xs";
  if (width < BREAKPOINTS.md) return "sm";
  if (width < BREAKPOINTS.lg) return "md";
  if (width < BREAKPOINTS.xl) return "lg";
  if (width < BREAKPOINTS["2xl"]) return "xl";
  return "2xl";
}

/**
 * Check if device supports touch
 */
function checkIsTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Main hook: Enhanced responsive detection with comprehensive device info
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, deviceType, breakpoint } = useResponsive();
 *
 * if (isMobile) {
 *   return <MobileView />;
 * }
 * ```
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = React.useState<ResponsiveState>(() => {
    // SSR-safe initial state
    if (typeof window === "undefined") {
      return {
        width: 0,
        height: 0,
        deviceType: "desktop",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        orientation: "portrait",
        isTouchDevice: false,
        breakpoint: "lg",
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = getDeviceType(width);
    const isTouchDevice = checkIsTouchDevice();

    return {
      width,
      height,
      deviceType,
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "desktop",
      isLargeDesktop: deviceType === "large-desktop",
      orientation: height > width ? "portrait" : "landscape",
      isTouchDevice,
      breakpoint: getCurrentBreakpoint(width),
    };
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Use matchMedia for efficient change detection
    const mediaQueries = Object.entries(BREAKPOINTS).map(([key, value]) => ({
      key: key as BreakpointKey,
      mql: window.matchMedia(`(min-width: ${value}px)`),
    }));

    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const deviceType = getDeviceType(width);
      const isTouchDevice = checkIsTouchDevice();

      setState((prev) => {
        // Skip update if nothing changed
        if (
          prev.width === width &&
          prev.height === height &&
          prev.deviceType === deviceType &&
          prev.isTouchDevice === isTouchDevice
        ) {
          return prev;
        }

        return {
          width,
          height,
          deviceType,
          isMobile: deviceType === "mobile",
          isTablet: deviceType === "tablet",
          isDesktop: deviceType === "desktop",
          isLargeDesktop: deviceType === "large-desktop",
          orientation: height > width ? "portrait" : "landscape",
          isTouchDevice,
          breakpoint: getCurrentBreakpoint(width),
        };
      });
    };

    // Add listeners to all media queries
    mediaQueries.forEach(({ mql }) => {
      mql.addEventListener("change", updateState);
    });

    // Also listen to resize and orientation change
    window.addEventListener("resize", updateState);
    window.addEventListener("orientationchange", updateState);

    // Cleanup
    return () => {
      mediaQueries.forEach(({ mql }) => {
        mql.removeEventListener("change", updateState);
      });
      window.removeEventListener("resize", updateState);
      window.removeEventListener("orientationchange", updateState);
    };
  }, []);

  return state;
}

/**
 * Simple hook: Check if current screen is mobile (< 768px)
 * Backward compatible with existing code
 *
 * @param breakpoint - Custom breakpoint in pixels (default: 768)
 * @example
 * ```tsx
 * const isMobile = useIsMobile(); // Uses 768px
 * const isSmallScreen = useIsMobile(640); // Custom breakpoint
 * ```
 */
export function useIsMobile(breakpoint: number = BREAKPOINTS.md): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpoint);

    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook: Detect device orientation
 *
 * @example
 * ```tsx
 * const orientation = useOrientation();
 * if (orientation === 'landscape') {
 *   return <LandscapeLayout />;
 * }
 * ```
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = React.useState<Orientation>(() => {
    if (typeof window === "undefined") return "portrait";
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");
    };

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return orientation;
}

/**
 * Hook: Detect if device supports touch
 *
 * @example
 * ```tsx
 * const isTouchDevice = useIsTouchDevice();
 * if (isTouchDevice) {
 *   return <TouchOptimizedUI />;
 * }
 * ```
 */
export function useIsTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return checkIsTouchDevice();
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouchDevice(checkIsTouchDevice());
  }, []);

  return isTouchDevice;
}

/**
 * Hook: Check if screen matches a specific breakpoint or range
 *
 * @param min - Minimum breakpoint (inclusive)
 * @param max - Maximum breakpoint (exclusive)
 * @example
 * ```tsx
 * const isTabletOnly = useBreakpoint('md', 'lg'); // 768px - 1023px
 * const isDesktopOrLarger = useBreakpoint('lg'); // >= 1024px
 * ```
 */
export function useBreakpoint(min: BreakpointKey, max?: BreakpointKey): boolean {
  const minWidth = BREAKPOINTS[min];
  const maxWidth = max ? BREAKPOINTS[max] : null;

  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const width = window.innerWidth;
    if (maxWidth) {
      return width >= minWidth && width < maxWidth;
    }
    return width >= minWidth;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = maxWidth
      ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px)`
      : `(min-width: ${minWidth}px)`;

    const mql = window.matchMedia(mediaQuery);
    const onChange = () => {
      setMatches(mql.matches);
    };

    mql.addEventListener("change", onChange);
    setMatches(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, [minWidth, maxWidth]);

  return matches;
}

/**
 * Utility: Get device type from width (can be used outside React)
 */
export { getDeviceType, getCurrentBreakpoint };

// Default export for backward compatibility
export default useIsMobile;
