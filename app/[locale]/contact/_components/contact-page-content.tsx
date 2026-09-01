import { ContactForm } from "@/components/forms/contact-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type ContactPoint = {
  label: string;
  value: string;
  href?: string;
  note?: string;
};

export function ContactPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections.contact;
  const ar = locale === "ar";
  const points: ContactPoint[] = ar ? [
    { label: "الاستفسارات العامة", value: "Info@copadpharma.com", href: "mailto:Info@copadpharma.com", note: "للاستفسارات المؤسسية والتجارية والعامة" },
    { label: "السلامة الدوائية", value: "pharmacovigilance@copadpharma.com", href: "mailto:pharmacovigilance@copadpharma.com", note: "للإبلاغ عن الآثار الجانبية ومعلومات سلامة المنتجات" },
    { label: "اتصل بنا", value: "+2 02 2268 9212–17", href: "tel:+20222689212", note: "الأحد إلى الخميس، 9 صباحًا حتى 5 مساءً" },
    { label: "المكتب الرئيسي", value: "قطعة 4، مربع 1169، شيراتون هليوبوليس، القاهرة", note: "كوباد فارما مصر" },
  ] : [
    { label: "General inquiries", value: "Info@copadpharma.com", href: "mailto:Info@copadpharma.com", note: "For corporate, commercial, and general questions" },
    { label: "Pharmacovigilance", value: "pharmacovigilance@copadpharma.com", href: "mailto:pharmacovigilance@copadpharma.com", note: "For adverse-event and product-safety reporting" },
    { label: "Call us", value: "+2 02 2268 9212–17", href: "tel:+20222689212", note: "Sunday–Thursday, 09:00–17:00" },
    { label: "Head office", value: "Lot 4, Square 1169, Sheraton Heliopolis, Cairo", note: "COPAD Pharma Egypt" },
  ];

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />

    <section dir={ar ? "rtl" : "ltr"} className="relative overflow-hidden bg-copad-deep px-4 pb-20 pt-36 text-white sm:px-8 sm:pb-24 sm:pt-40 lg:px-12 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,144,175,.2),transparent_32%),linear-gradient(145deg,#013d60_0%,#013d60_62%,#013d60_100%)] rtl:bg-[radial-gradient(circle_at_18%_18%,rgba(0,144,175,.2),transparent_32%),linear-gradient(215deg,#013d60_0%,#013d60_62%,#013d60_100%)]" />
      <div aria-hidden="true" className="absolute -end-24 -bottom-56 size-[34rem] rounded-full border border-white/6" />
      <div className="relative mx-auto max-w-[1280px]">
        <p className="text-[9px] font-black uppercase tracking-[.24em] text-copad-green">COPAD / {content.eyebrow}</p>
        <h1 className="mt-5 font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[.95] tracking-[-.055em] text-white">{content.title}</h1>
        <p className="mt-7 max-w-3xl text-base leading-8 text-white/64 sm:text-lg sm:leading-9">{content.intro}</p>
      </div>
    </section>

    <section dir={ar ? "rtl" : "ltr"} className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <div>
          <h2 className="max-w-[14ch] font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1.03] tracking-[-.04em] text-copad-deep">{ar ? "تواصل مع الفريق المناسب" : "Reach the right team"}</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-copad-deep/58 sm:text-base sm:leading-8">{ar ? "اختر قناة التواصل المناسبة، أو أرسل رسالتك من خلال النموذج وسنوجّهها إلى القسم المختص." : "Use the most relevant contact channel, or send an inquiry and we will route it to the appropriate team."}</p>

          <div className="mt-10 border-t border-copad-deep/12">
            {points.map((point, index) => <div key={point.label} className="grid gap-2 border-b border-copad-deep/12 py-6 sm:grid-cols-[2.6rem_1fr]">
              <span className="font-display text-lg text-copad-green">0{index + 1}</span>
              <div><p className="text-[9px] font-black uppercase tracking-[.16em] text-copad-deep/42">{point.label}</p>{point.href ? <a dir="ltr" href={point.href} className="mt-2 block break-all text-base font-bold text-copad-deep transition hover:text-copad-green sm:text-lg">{point.value}</a> : <p className="mt-2 text-base font-bold leading-7 text-copad-deep sm:text-lg">{point.value}</p>}<p className="mt-2 text-xs leading-6 text-copad-deep/48">{point.note}</p></div>
            </div>)}
          </div>
        </div>

        <div className="self-start lg:sticky lg:top-28">
          <div className="mb-6"><p className="text-[9px] font-black uppercase tracking-[.2em] text-copad-green">{ar ? "أرسل استفسارك" : "Send an inquiry"}</p><h2 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.8rem)] leading-[1.04] tracking-[-.04em] text-copad-deep">{siteCopy[locale].utility.formTitle}</h2></div>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>

    <SiteFooter locale={locale} />
  </main>;
}
