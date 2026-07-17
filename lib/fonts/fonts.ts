import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import {
  Noto_Nastaliq_Urdu,
  Noto_Naskh_Arabic,
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
} from "next/font/google";

// English fonts (existing)
export const geistSans = GeistSans;
export const geistMono = GeistMono;

// Urdu font - Noto Nastaliq Urdu for Urdu language
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu",
  display: "swap",
});

// Arabic font - Noto Naskh Arabic for Arabic language
export const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// Marketing/landing page fonts
export const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const landingBodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-landing-body",
  display: "swap",
});
