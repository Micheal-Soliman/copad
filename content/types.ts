export const sectionSlugs = [
  "about",
  "divisions",
  "therapeutic-areas",
  "products",
  "manufacturing-quality",
  "insights",
  "partner-with-us",
  "careers",
  "contact",
] as const;

export type SectionSlug = (typeof sectionSlugs)[number];

export type ContentBlock = {
  title: string;
  body: string;
  items?: string[];
  note?: string;
};

export type Section = {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: ContentBlock[];
  cta?: string;
};

export type HomeContent = {
  eyebrow: string;
  title: string;
  subheadline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  snapshot: string[];
  introduction: ContentBlock;
  divisions: ContentBlock;
  therapy: ContentBlock;
  manufacturing: ContentBlock;
  insights: ContentBlock;
  partnership: ContentBlock;
};

export type UiCopy = {
  home: {
    heroImageAlt: string;
    sectionNavigationLabel: string;
    sectionNavigation: Array<{ id: string; label: string }>;
    interactionLabels: { view: string; open: string; go: string };
    introductionEyebrow: string;
    divisionsEyebrow: string;
    divisionLabel: string;
    therapyEyebrow: string;
    therapyImageAlt: string;
    therapyImageCaption: string;
    manufacturingEyebrow: string;
    manufacturingAction: string;
    manufacturingImageAlt: string;
    manufacturingImageEyebrow: string;
    manufacturingImageCaption: string;
    manufacturingPrinciplesLabel: string;
    manufacturingPrinciples: string[];
    insightsEyebrow: string;
    insightsAction: string;
    partnershipEyebrow: string;
    partnershipAction: string;
  };
  about: {
    sectionNavigationLabel: string;
    sectionNavigation: Array<{ id: string; label: string }>;
    heroFacts: Array<{ label: string; value: string }>;
    heroImageAlt: string;
    heroCaption: string;
    heroSignature: string;
    historyEyebrow: string;
    directionEyebrow: string;
    directionDrivers: string[];
    directionImageAlt: string;
    ambitionEyebrow: string;
    ambitionValue: string;
    ambitionBody: string;
    distinctionEyebrow: string;
    distinctionImageEyebrow: string;
    distinctionImageBody: string;
    specialties: string[];
    valuesEyebrow: string;
    principles: string[];
    complianceEyebrow: string;
    regulators: string[];
  };
  footer: {
    navigationLabel: string;
    explore: string;
    portfolio: string;
    company: string;
    partnership: string;
    careers: string;
    socialLinks: Array<{ label: string; shortLabel: string; href: string }>;
  };
  formCategories: string[];
  accessibility: {
    primaryNavigation: string;
    mobileNavigation: string;
    openNavigation: string;
    closeNavigation: string;
    switchLanguage: string;
    mediaPlaceholder: string;
  };
};

export type SiteCopy = {
  localeName: string;
  nav: Record<
    | "about"
    | "divisions"
    | "areas"
    | "products"
    | "manufacturing"
    | "insights"
    | "contact",
    string
  >;
  utility: {
    allAreas: string;
    allDivisions: string;
    readProfile: string;
    next: string;
    submit: string;
    formTitle: string;
    formBody: string;
    formLabels: string[];
  };
  footer: {
    statement: string;
    legal: string;
    disclaimer: string;
  };
  ui: UiCopy;
  home: HomeContent;
  sections: Record<SectionSlug, Section>;
};
