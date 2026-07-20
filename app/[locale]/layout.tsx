import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { urduFont, arabicFont, headingFont, landingBodyFont } from "@/lib/fonts/fonts";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/providers/providers";
import Loader from "@/components/shared/loader";
import ScrollToTop from "@/components/shared/scroll-to-top";
import { Suspense } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "habbitat Type One",
  description: "Created By Muhammad Tayyab",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  // yeh message i18n k lye hain jo ka i18n folder me mojood hain
  let messages: Record<string, unknown> = {};
  try {
    messages = await getMessages({ locale });
  } catch (e) {
    messages = {};
  }

  const isRtl = locale === "ur" || locale === "ar";

  // arabic ya urdu font ka taayun karna locale ki bunyaad par
  const rtlFont = locale === "ar" ? arabicFont : urduFont;

  const bodyClasses = isRtl
    ? `${locale === "ar" ? "font-arabic" : "font-urdu"} ${rtlFont.variable} ${GeistSans.variable} ${GeistMono.variable} ${headingFont.variable} ${landingBodyFont.variable} antialiased`
    : `font-sans ${GeistSans.variable} ${GeistMono.variable} ${urduFont.variable} ${arabicFont.variable} ${headingFont.variable} ${landingBodyFont.variable} antialiased`;

  return (
    <html lang={locale} suppressHydrationWarning dir={isRtl ? "rtl" : "ltr"}>
      <body className={bodyClasses}>
        <NextIntlClientProvider messages={messages}>
          <Suspense
            fallback={<Loader isLoading text="Next Boiler..." variant="default" size="lg" />}
          >
            <Providers>{children}</Providers>
          </Suspense>
          <ScrollToTop />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
