import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localeDirection, locales } from "@/lib/i18n";
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
      <body>{children}</body>
    </html>
  );
}
