import { notFound } from "next/navigation";
import { ContactPageContent } from "./_components/contact-page-content";
import { isLocale } from "@/lib/i18n";

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPageContent locale={locale} />;
}
