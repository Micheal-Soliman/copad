import { notFound } from "next/navigation";
import { AboutPageContent } from "./_components/about-page-content";
import { isLocale } from "@/lib/i18n";

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AboutPageContent locale={locale} />;
}
