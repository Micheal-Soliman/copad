import { notFound } from "next/navigation";
import { ProductsPageContent } from "./_components/products-page-content";
import { isLocale } from "@/lib/i18n";

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductsPageContent locale={locale} />;
}
