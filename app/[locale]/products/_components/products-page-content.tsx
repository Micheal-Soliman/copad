import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { ProductPortfolioArchive } from "./product-portfolio-archive";
import { ProductsHero } from "./products-hero";
import { ProductsNextChapter } from "./products-next-chapter";

export function ProductsPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections.products;
  const isArabic = locale === "ar";
  const navigation = [
    { id: "home", label: isArabic ? "نظرة عامة" : "Overview" },
    { id: "portfolio", label: isArabic ? "المحفظة" : "Portfolio" },
    { id: "manufacturing-next", label: isArabic ? "التصنيع" : "Manufacturing" },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <ProductsHero locale={locale} content={content} />
      <ProductPortfolioArchive locale={locale} blocks={content.blocks} />
      <ProductsNextChapter locale={locale} />
      <HomeSectionNavigator label={isArabic ? "أقسام صفحة المنتجات" : "Products page sections"} items={navigation} />
      <SiteFooter locale={locale} />
    </main>
  );
}
