import axios from "axios";
import { getToken } from "@/lib//cookie/cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://next-boiler-backend-jffr-611rh8w6g.vercel.app/api/";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable sending cookies with cross-origin requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear and redirect
      if (typeof window !== "undefined") {
        // Get current locale from URL
        const currentPath = window.location.pathname;
        const locale = currentPath.split("/")[1] || "en";

        // Don't redirect if already on login/signup pages or on public routes
        const publicRoutes = ["/login", "/signup", "/users", "/forgot", "/reset", "/otp"];
        const isPublicRoute = publicRoutes.some((route) => currentPath.includes(route));

        // Also don't redirect if on home page
        const isHomePage =
          currentPath === `/${locale}` ||
          currentPath === `/${locale}/` ||
          currentPath === `/${locale}/home`;

        if (!isPublicRoute && !isHomePage) {
          // Clear token and redirect to login with proper locale
          import("@/lib/cookie/cookie").then(({ removeToken }) => {
            removeToken();
            window.location.href = `/${locale}/login`;
          });
        }
      }
    }
    return Promise.reject(error);
  }
);
