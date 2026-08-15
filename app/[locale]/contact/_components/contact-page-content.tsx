import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { ContactDispatchScene } from "./contact-dispatch-scene";

export function ContactPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections.contact;
  const channels = content.blocks[0]?.items ?? [];
  const office = content.blocks[1];

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-deep">
      <SiteHeader locale={locale} transparent />
      <ContactDispatchScene
        locale={locale}
        content={content}
        channels={channels}
        routingBody={content.blocks[0]?.body ?? ""}
        officeTitle={office?.title ?? ""}
        officeBody={office?.body ?? ""}
      />
      <SiteFooter locale={locale} />
    </main>
  );
}
