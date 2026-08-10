import { notFound } from "next/navigation";
import { ClosingPreviews } from "@/components/home/closing-previews";
import { DivisionsOverview } from "@/components/home/divisions-overview";
import { HomeHero } from "@/components/home/home-hero";
import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { IntroductionSection } from "@/components/home/introduction-section";
import { ManufacturingPreview } from "@/components/home/manufacturing-preview";
import { SnapshotBar } from "@/components/home/snapshot-bar";
import { TherapyAreasPreview } from "@/components/home/therapy-areas-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = siteCopy[locale];
  const { home } = copy;
  const ui = copy.ui.home;

  return (
    <main className="bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <HomeSectionNavigator label={ui.sectionNavigationLabel} items={ui.sectionNavigation} />

      <HomeHero
        locale={locale}
        eyebrow={home.eyebrow}
        title={home.title}
        subheadline={home.subheadline}
        body={home.body}
        primaryCta={home.primaryCta}
        secondaryCta={home.secondaryCta}
      />

      <SnapshotBar locale={locale} />

      <IntroductionSection
        locale={locale}
        eyebrow={ui.introductionEyebrow}
        title={home.introduction.title}
        body={home.introduction.body}
        note={home.introduction.note}
        action={copy.utility.readProfile}
      />

      <DivisionsOverview
        locale={locale}
        eyebrow={ui.divisionsEyebrow}
        title={home.divisions.title}
        body={home.divisions.body}
        items={(home.divisions.items ?? []).map((entry) => {
          const separator = " — ";
          const [title, ...description] = entry.split(separator);
          return { title, description: description.join(separator) };
        })}
        action={copy.utility.allDivisions}
      />

      <TherapyAreasPreview
        locale={locale}
        eyebrow={ui.therapyEyebrow}
        title={home.therapy.title}
        body={home.therapy.body}
        action={copy.utility.allAreas}
      />

      <ManufacturingPreview
        locale={locale}
        eyebrow={ui.manufacturingEyebrow}
        title={home.manufacturing.title}
        body={home.manufacturing.body}
        action={ui.manufacturingAction}
      />

      <ClosingPreviews locale={locale} insights={home.insights} partnership={home.partnership} />

      <SiteFooter locale={locale} />
    </main>
  );
}
