import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/content/dictionary";
import { isLocale } from "@/lib/i18n";
import { getInsightBySlug, getPublishedInsights } from "@/lib/insights";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const insight = await getInsightBySlug(locale, slug);
  return insight ? { title: insight.title, description: insight.excerpt } : {};
}

export default async function InsightDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [insight, allInsights] = await Promise.all([getInsightBySlug(locale, slug), getPublishedInsights(locale)]);
  if (!insight) notFound();
  const copy = getDictionary(locale).insightsCms;
  const sections = insight.body.split(/\n{2,}/).filter(Boolean);
  const related = allInsights.filter((item) => item.slug !== slug).slice(0, 3);
  const date = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${insight.publishedAt}T12:00:00Z`));

  return <main dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-clip bg-white text-copad-deep">
    <SiteHeader locale={locale} />
    <article className="px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <Link href={`/${locale}/insights`} className="inline-flex items-center gap-2 text-sm font-black text-copad-green transition hover:text-copad-deep"><ArrowLeftIcon className="rtl:rotate-180" />{copy.back}</Link>
        <div className="mt-12 grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <aside className="space-y-6 border-t border-copad-green/45 pt-5 text-xs lg:sticky lg:top-32 lg:self-start"><div><p className="font-black uppercase tracking-wider text-copad-deep/38">{copy.published}</p><p className="mt-2 font-bold">{date}</p></div><div className="border-t border-copad-deep/10 pt-5"><p className="font-black uppercase tracking-wider text-copad-deep/38">{copy.categories[insight.category]}</p><p className="mt-2 font-bold text-copad-green">{insight.readingMinutes} {copy.readingTime}</p></div></aside>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-copad-green">{copy.categories[insight.category]}</p>
            <h1 className="mt-5 max-w-[18ch] text-pretty font-display text-[clamp(3rem,6vw,6.5rem)] leading-[1.01] tracking-[-.055em]">{insight.title}</h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-copad-deep/60 sm:text-lg sm:leading-9">{insight.excerpt}</p>
            <div className="relative mt-10 aspect-[16/8.5] overflow-hidden rounded-[1.75rem] bg-copad-sand"><Image src={insight.coverImage} alt="" fill priority unoptimized={insight.coverImage.startsWith("data:")} sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" /></div>
            <div className="mx-auto mt-12 max-w-[760px]">{sections.map((section, index) => index % 2 === 0 ? <h2 key={index} className="mt-12 border-t border-copad-green/35 pt-8 font-display text-2xl leading-tight tracking-[-.025em] sm:text-3xl">{section}</h2> : <p key={index} className="mt-5 whitespace-pre-line text-base leading-8 text-copad-deep/70 sm:text-lg sm:leading-9">{section}</p>)}</div>
          </div>
        </div>
      </div>
    </article>
    {related.length ? <section className="border-t border-copad-deep/10 bg-copad-sand/45 px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1280px]"><div className="flex items-end justify-between"><h2 className="font-display text-3xl tracking-[-.035em] sm:text-4xl">{copy.related}</h2><Link href={`/${locale}/insights`} className="text-sm font-black text-copad-green">{copy.back}</Link></div><div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/${locale}/insights/${item.slug}`} className="group border-t border-copad-green/35 pt-5"><div className="relative aspect-[16/8] overflow-hidden rounded-xl"><Image src={item.coverImage} alt="" fill unoptimized={item.coverImage.startsWith("data:")} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><p className="mt-4 text-[9px] font-black uppercase tracking-wider text-copad-green">{copy.categories[item.category]}</p><h3 className="mt-2 font-display text-xl leading-tight tracking-[-.025em]">{item.title}</h3></Link>)}</div></div></section> : null}
    <SiteFooter locale={locale} />
  </main>;
}

