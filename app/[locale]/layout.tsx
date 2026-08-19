import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { InteractiveCursor } from "@/components/motion/interactive-cursor";
import { MagneticInteractions } from "@/components/motion/magnetic-interactions";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { isLocale, localeDirection, locales } from "@/lib/i18n";
import "lenis/dist/lenis.css";
import "../globals.css";

const bukra = localFont({
  src: [
    {
      path: "../../public/29ltbukra- 7ROOF.COM/29ltbukralight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/29ltbukra- 7ROOF.COM/29ltbukraregular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/29ltbukra- 7ROOF.COM/29ltbukrabold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/29ltbukra- 7ROOF.COM/29ltbukrabolditalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-bukra",
  display: "swap",
  fallback: ["Arial", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: { default: "COPAD Pharma Egypt", template: "%s | COPAD Pharma Egypt" },
  description: "COPAD Pharma Egypt corporate website.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={localeDirection(locale)} className={bukra.variable}>
      <body>
        <SmoothScroll />
        <MagneticInteractions />
        {children}
        <InteractiveCursor />
      </body>
    </html>
  );
}
