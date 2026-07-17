"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserProfile } from "@/components/layout/user-profile";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/tailwindUtils/utils";
import { MenuIcon, CloseIcon } from "@/lib/icons/icons";

const NAV_LINKS = ["features", "dashboard", "pricing"] as const;

export function Header() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const isUrdu = locale === "ur";
  const { isAuthenticated } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NextLink
          href={`/${locale}`}
          className={cn("flex items-center gap-2.5 flex-shrink-0", isUrdu && "mt-6")}
        >
          <div
            className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: "#111111" }}
          >
            <Image src="/logo.png" alt="" width={20} height={20} className="object-contain" />
          </div>
          <span
            className="font-bold text-base font-[family-name:var(--font-heading)]"
            style={{ color: scrolled ? undefined : "#ffffff" }}
          >
            {t("brand")}
          </span>
        </NextLink>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: scrolled ? undefined : "rgba(255,255,255,0.75)" }}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div
          className={cn(
            "flex items-center gap-3",
            !scrolled && "[&_button]:!text-white [&_svg]:!text-white [&_span]:!text-white"
          )}
        >
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <NextLink
                href={`/${locale}/login`}
                className="text-sm font-medium px-4 py-2 transition-colors"
                style={{ color: scrolled ? undefined : "rgba(255,255,255,0.75)" }}
              >
                {t("nav.signIn")}
              </NextLink>
              <NextLink
                href={`/${locale}/signup`}
                className="text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
                style={{
                  background: scrolled ? "#111111" : "#ffffff",
                  color: scrolled ? "#ffffff" : "#111111",
                }}
              >
                {t("nav.getStarted")}
              </NextLink>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("nav.toggleMenu")}
            style={{ color: scrolled ? undefined : "#ffffff" }}
          >
            {open ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border/60 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm font-medium text-foreground"
              onClick={() => setOpen(false)}
            >
              {t(`nav.${key}`)}
            </a>
          ))}

          <div className="flex items-center gap-3 pt-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <>
              <NextLink
                href={`/${locale}/login`}
                className="text-sm font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {t("nav.signIn")}
              </NextLink>
              <NextLink
                href={`/${locale}/signup`}
                onClick={() => setOpen(false)}
                className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-lg text-center"
              >
                {t("nav.getStarted")}
              </NextLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
