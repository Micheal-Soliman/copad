import { ContactForm } from "@/components/forms/contact-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

export function ContactPageContent({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const content = dictionary.sections.contact;
  const page = dictionary.contactPage;
  const ar = locale === "ar";

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
          <h2 className="max-w-[14ch] font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1.03] tracking-[-.04em] text-copad-deep">{page.sectionTitle}</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-copad-deep/58 sm:text-base sm:leading-8">{page.sectionBody}</p>

          <div className="mt-10 border-t border-copad-deep/12">
            {page.points.map((point, index) => <div key={point.label} className="grid gap-2 border-b border-copad-deep/12 py-6 sm:grid-cols-[2.6rem_1fr]">
              <span className="font-display text-lg text-copad-green">0{index + 1}</span>
              <div><p className="text-[9px] font-black uppercase tracking-[.16em] text-copad-deep/42">{point.label}</p><a dir="ltr" href={point.href} className="mt-2 block break-all text-base font-bold text-copad-deep transition hover:text-copad-green sm:text-lg">{point.value}</a><p className="mt-2 text-xs leading-6 text-copad-deep/48">{point.note}</p></div>
            </div>)}
          </div>
        </div>

        <div className="self-start lg:sticky lg:top-28">
          <div className="mb-6"><p className="text-[9px] font-black uppercase tracking-[.2em] text-copad-green">{page.inquiryEyebrow}</p><h2 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.8rem)] leading-[1.04] tracking-[-.04em] text-copad-deep">{dictionary.utility.formTitle}</h2></div>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>

    <section dir={ar ? "rtl" : "ltr"} className="bg-copad-sand px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-[9px] font-black uppercase tracking-[.22em] text-copad-green">COPAD / {page.locationsEyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,4vw,4.25rem)] leading-[1.03] tracking-[-.045em] text-copad-deep">{page.locationsTitle}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {page.locations.map((location, index) => (
            <article key={location.name} className="relative overflow-hidden rounded-[1.75rem] border border-copad-deep/10 bg-white p-6 shadow-[0_22px_55px_rgba(6,79,120,.07)] sm:p-8">
              <span aria-hidden="true" className="absolute end-5 top-4 font-display text-5xl text-copad-deep/[.05]">0{index + 1}</span>
              <div className="relative">
                <h3 className="max-w-[24ch] font-display text-xl leading-snug tracking-[-.025em] text-copad-deep sm:text-2xl">{location.name}</h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-copad-deep/62 sm:text-base">{location.address}</p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-copad-deep/10 pt-5">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[.18em] text-copad-green">{page.workingHours}</p>
                    <p dir="ltr" className="mt-2 text-sm font-bold text-copad-deep">{location.hours}</p>
                  </div>
                  {"whatsapp" in location && location.whatsapp && location.whatsappHref && <div>
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
