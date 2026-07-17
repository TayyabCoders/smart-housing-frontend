"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { logger } from "@/logger/logger";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/tailwindUtils/utils";
import { getUserFromCookies, removeAuthCookies } from "@/lib/cookie/cookie";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, SettingsIcon, HelpIcon, LogoutIcon } from "@/lib/icons/icons";

interface UserProfileProps {
  className?: string;
}

// Helper function to generate user initials (unchanged)
const getUserInitials = (name?: string, email?: string): string => {
  if (name) {
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) {
    return email.substring(0, 2).toUpperCase();
  }
  return "U";
};

export function UserProfile({ className }: UserProfileProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const t = useTranslations("layout.profile");
  const router = useRouter();

  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();

  // Local fallback user state: use auth user if available, otherwise try cookies (now via utility)
  const [localUser, setLocalUser] = useState<UserModuleUser | null>(() => {
    if (user) return user as UserModuleUser;
    return getUserFromCookies() as UserModuleUser | null;
  });

  // Sync fallback when auth hook provides a user later (unchanged)
  useEffect(() => {
    if (user && (!localUser || localUser._id !== user._id)) {
      setLocalUser(user as any);
    }
  }, [user]);

  // Render only when we either have auth or the cookie fallback user (unchanged)
  if (!isAuthenticated && !localUser) {
    return null;
  }

  const activeUser = user ?? localUser;
  const userInitials = getUserInitials(activeUser?.name, activeUser?.email);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Remove auth-related cookies (now via utility)
      removeAuthCookies();

      logger.info(
        { userId: activeUser?._id, email: activeUser?.email },
        "User logged out successfully"
      );

      // Clear fallback local user (unchanged)
      setLocalUser(null);

      // Redirect to login page (unchanged)
      router.push("/login");
    } catch (error) {
      logger.error(
        { error: error instanceof Error ? error.message : String(error), userId: activeUser?._id },
        "User logout failed"
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfileClick = () => router.push(`/${locale}/profile`);
  const handleSettingsClick = () => router.push("/dashboard/settings");
  const handleHelpClick = () => router.push("/help");

  return (
    <div className={cn("inline-flex items-center", className)}>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "relative rounded-full transition-all duration-200 ease-in-out",
                    "hover:ring-2 hover:ring-primary/20 hover:ring-offset-2 hover:ring-offset-background",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
                    "active:scale-95",
                    className
                  )}
                  aria-label={t("clickForOptions")}
                >
                  <Avatar className="h-9 w-9 border-2 border-border/50 shadow-sm">
                    {activeUser?.avatar && (
                      <AvatarImage
                        src={activeUser.avatar}
                        alt={activeUser.name ?? activeUser.email ?? "User avatar"}
                        className="object-cover"
                      />
                    )}
                    <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-slate-700 to-slate-600 text-white dark:from-slate-600 dark:to-slate-500 border-0">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>

            <TooltipContent side="bottom" align="center">
              <p className="text-sm">
                {activeUser?.name ?? activeUser?.email} • {t("clickForOptions")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
          <DropdownMenuLabel className="font-normal p-3 pb-2">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border border-border/50">
                {activeUser?.avatar && (
                  <AvatarImage
                    src={activeUser.avatar}
                    alt={activeUser.name ?? activeUser.email ?? "User avatar"}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-slate-700 to-slate-600 text-white dark:from-slate-600 dark:to-slate-500">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">
                  {activeUser?.name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {activeUser?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleProfileClick}
            className="cursor-pointer rounded-md mx-1 py-2.5 px-3 transition-colors hover:bg-accent/50"
          >
            <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t("profile")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSettingsClick}
            className="cursor-pointer rounded-md mx-1 py-2.5 px-3 transition-colors hover:bg-accent/50"
          >
            <SettingsIcon className="mr-3 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t("settings")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleHelpClick}
            className="cursor-pointer rounded-md mx-1 py-2.5 px-3 transition-colors hover:bg-accent/50"
          >
            <HelpIcon className="mr-3 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t("help")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2" />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer rounded-md mx-1 py-2.5 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/20 transition-colors"
          >
            <LogoutIcon className="mr-3 h-4 w-4" />
            <span className="font-medium">{isLoggingOut ? t("loggingOut") : t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfile;
