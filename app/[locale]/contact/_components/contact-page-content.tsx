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

type Location = {
  name: string;
  address: string;
  hours: string;
  whatsapp?: string;
  whatsappHref?: string;
};

export function ContactPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections.contact;
  const ar = locale === "ar";
  const points: ContactPoint[] = ar ? [
    { label: "الاستفسارات العامة", value: "Info@copadpharma.com", href: "mailto:Info@copadpharma.com", note: "للاستفسارات المؤسسية والتجارية والعامة" },
    { label: "السلامة الدوائية", value: "pharmacovigilance@copadpharma.com", href: "mailto:pharmacovigilance@copadpharma.com", note: "للإبلاغ عن الآثار الجانبية ومعلومات سلامة المنتجات" },
    { label: "اتصل بنا", value: "+2 02 2268 9212–17", href: "tel:+20222689212", note: "من 8:30 صباحًا إلى 4:30 مساءً" },
  ] : [
    { label: "General inquiries", value: "Info@copadpharma.com", href: "mailto:Info@copadpharma.com", note: "For corporate, commercial, and general questions" },
    { label: "Pharmacovigilance", value: "pharmacovigilance@copadpharma.com", href: "mailto:pharmacovigilance@copadpharma.com", note: "For adverse-event and product-safety reporting" },
    { label: "Call us", value: "+2 02 2268 9212–17", href: "tel:+20222689212", note: "8:30 AM–4:30 PM" },
  ];
  const locations: Location[] = ar ? [
    {
      name: "المكتب الرئيسي – شيراتون هليوبوليس",
      address: "4، مربع 1169 مكرر، شيراتون هليوبوليس، القاهرة",
      hours: "8:30 صباحًا – 4:30 مساءً",
      whatsapp: "+20 100 999 6136",
      whatsappHref: "https://wa.me/201009996136",
    },
    {
      name: "فرع وسط البلد – عماد الدين",
      address: "11 شارع عماد الدين، وسط البلد، القاهرة",
      hours: "8:30 صباحًا – 4:30 مساءً",
    },
    {
      name: "مصنع الأدوية – العبور",
      address: "القطعتان 9 و10، بلوك 12011، المنطقة الصناعية الأولى – الامتداد الشمالي، مدينة العبور، القليوبية",
      hours: "8:00 صباحًا – 4:00 مساءً",
      whatsapp: "+20 100 999 6106",
      whatsappHref: "https://wa.me/201009996106",
    },
    {
      name: "مصنع المكملات الغذائية – العبور",
      address: "القطع 7 و8 و12، بلوك 12011، المنطقة الصناعية الأولى – الامتداد الشمالي، مدينة العبور، القليوبية",
      hours: "8:00 صباحًا – 4:00 مساءً",
      whatsapp: "+20 100 999 6106",
      whatsappHref: "https://wa.me/201009996106",
    },
  ] : [
    {
      name: "Head Office – Sheraton Heliopolis",
      address: "4 Square No. 1169 Bis, Sheraton Heliopolis, Cairo",
      hours: "8:30 AM–4:30 PM",
      whatsapp: "+20 100 999 6136",
      whatsappHref: "https://wa.me/201009996136",
    },
    {
      name: "Downtown Branch – Emad El Din",
      address: "11 Emad El Din St., Downtown, Cairo",
      hours: "8:30 AM–4:30 PM",
    },
    {
      name: "Pharmaceutical Factory – Obour",
      address: "Plots 9 & 10, Block 12011, First Industrial Zone – Northern Extension, Obour City, Qalyubia",
      hours: "8:00 AM–4:00 PM",
      whatsapp: "+20 100 999 6106",
      whatsappHref: "https://wa.me/201009996106",
    },
    {
      name: "Dietary Supplements Factory – Obour",
      address: "Plots 7, 8 & 12, Block 12011, First Industrial Zone – Northern Extension, Obour City, Qalyubia",
      hours: "8:00 AM–4:00 PM",
      whatsapp: "+20 100 999 6106",
      whatsappHref: "https://wa.me/201009996106",
    },
  ];

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />

    <section dir={ar ? "rtl" : "ltr"} className="relative overflow-hidden bg-copad-deep px-4 pb-20 pt-36 text-white sm:px-8 sm:pb-24 sm:pt-40 lg:px-12 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,163,196,.2),transparent_32%),linear-gradient(145deg,#064f78_0%,#064f78_62%,#064f78_100%)] rtl:bg-[radial-gradient(circle_at_18%_18%,rgba(0,163,196,.2),transparent_32%),linear-gradient(215deg,#064f78_0%,#064f78_62%,#064f78_100%)]" />
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

    <section dir={ar ? "rtl" : "ltr"} className="bg-copad-sand px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-[9px] font-black uppercase tracking-[.22em] text-copad-green">COPAD / {ar ? "مواقعنا" : "Our locations"}</p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,4vw,4.25rem)] leading-[1.03] tracking-[-.045em] text-copad-deep">{ar ? "مكاتبنا ومنشآتنا" : "Offices and facilities"}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {locations.map((location, index) => (
            <article key={location.name} className="relative overflow-hidden rounded-[1.75rem] border border-copad-deep/10 bg-white p-6 shadow-[0_22px_55px_rgba(6,79,120,.07)] sm:p-8">
              <span aria-hidden="true" className="absolute end-5 top-4 font-display text-5xl text-copad-deep/[.05]">0{index + 1}</span>
              <div className="relative">
                <h3 className="max-w-[24ch] font-display text-xl leading-snug tracking-[-.025em] text-copad-deep sm:text-2xl">{location.name}</h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-copad-deep/62 sm:text-base">{location.address}</p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-copad-deep/10 pt-5">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[.18em] text-copad-green">{ar ? "مواعيد العمل" : "Working hours"}</p>
                    <p dir="ltr" className="mt-2 text-sm font-bold text-copad-deep">{location.hours}</p>
                  </div>
                  {location.whatsapp && location.whatsappHref && <div>
                    <p className="text-[8px] font-black uppercase tracking-[.18em] text-copad-green">WhatsApp</p>
                    <a dir="ltr" href={location.whatsappHref} className="mt-2 block text-sm font-bold text-copad-deep transition hover:text-copad-green">{location.whatsapp}</a>
                  </div>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <SiteFooter locale={locale} />
  </main>;
}
