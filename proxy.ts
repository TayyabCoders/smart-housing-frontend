import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);

  // Check if user is authenticated
  const authToken = request.cookies.get("auth_token");
  const userLoggedIn = request.cookies.get("user_logged_in");
  const isAuthenticated = authToken || userLoggedIn;

  // Public routes (accessible without authentication)
  const publicRoutes = [
    /^\/(en|ur)\/login$/,
    /^\/(en|ur)\/signup$/,
    /^\/(en|ur)\/forgot$/,
    /^\/(en|ur)\/otp$/,
    /^\/(en|ur)\/reset$/,
  ];

  const isPublicRoute = publicRoutes.some((route) => route.test(pathname));

  // Root redirect - redirect to login if not authenticated, otherwise to home
  if (pathname === "/") {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/login`, request.url));
    }
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}/`, request.url));
  }

  // Home page protection - redirect to login if not authenticated
  if (pathname.match(/^\/(en|ur)\/?$/) || pathname.match(/^\/(en|ur)\/home$/)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // OTP page protection - check auth flow
  if (pathname.match(/^\/(en|ur)\/otp$/)) {
    const authFlowData = request.cookies.get("auth_flow");
    let authFlow = null;
    try {
      authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
    } catch {
      authFlow = null;
    }

    if (!authFlow || authFlow.step !== "awaiting-otp") {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Reset password page protection - check auth flow
  if (pathname.match(/^\/(en|ur)\/reset$/)) {
    const authFlowData = request.cookies.get("auth_flow");
    let authFlow = null;
    try {
      authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
    } catch {
      authFlow = null;
    }

    if (!authFlow || authFlow.step !== "reset-password" || !authFlow.resetToken) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Private routes - require authentication (except public routes)
  if (!isPublicRoute && !isAuthenticated) {
    // Allow access to dashboard and other protected routes only if authenticated
    const protectedRoutes = [
      /^\/(en|ur)\/dashboard/,
      /^\/(en|ur)\/profile/,
      /^\/(en|ur)\/settings/,
      /^\/(en|ur)\/analytics/,
      /^\/(en|ur)\/users$/,
    ];

    const isProtectedRoute = protectedRoutes.some((route) => route.test(pathname));

    if (isProtectedRoute) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Authenticated users trying to access auth pages - redirect to home
  if (isAuthenticated && pathname.match(/^\/(en|ur)\/(login|signup|forgot)$/)) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  // Continue with intl middleware
  return intlMiddleware(request);
}

function getLocaleFromPath(pathname: string): string {
  const match = pathname.match(/^\/(en|ur)/);
  return match?.[1] || routing.defaultLocale;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|trpc|.*\\..*).*)"],
};
