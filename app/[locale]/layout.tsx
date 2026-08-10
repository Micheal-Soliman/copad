import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteractiveCursor } from "@/components/motion/interactive-cursor";
import { MagneticInteractions } from "@/components/motion/magnetic-interactions";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { isLocale, localeDirection, locales } from "@/lib/i18n";
import "lenis/dist/lenis.css";
import "../globals.css";

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
    <html lang={locale} dir={localeDirection(locale)}>
      <body>
        <SmoothScroll />
        <MagneticInteractions />
        {children}
        <InteractiveCursor />
      </body>
    </html>
  );
}
