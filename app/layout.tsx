import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/seo/site";
import "./globals.css";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Canadian Wealth Lab",
    template: "%s | Canadian Wealth Lab",
  },
  description:
    "Data-driven calculators and guides that help Canadians make smarter financial decisions.",
  applicationName: "Canadian Wealth Lab",
  authors: [{ name: "Canadian Wealth Lab" }],
  creator: "Canadian Wealth Lab",
  publisher: "Canadian Wealth Lab",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Canadian Wealth Lab",
    title: "Make smarter money decisions in Canada.",
    description:
      "Data-driven calculators, guides, and tools to help Canadians build wealth with confidence.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Canadian Wealth Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Make smarter money decisions in Canada.",
    description:
      "Data-driven calculators, guides, and tools for Canadians.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0e7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className={`${display.variable} ${body.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
