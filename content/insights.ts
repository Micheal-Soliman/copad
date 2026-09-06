import type { Locale } from "@/lib/i18n";

export const insightCategories = ["health-education", "manufacturing", "quality", "company-news"] as const;
export type InsightCategory = (typeof insightCategories)[number];

export type Insight = {
  id: string;
  slug: string;
  category: InsightCategory;
  publishedAt: string;
  readingMinutes: number;
  coverImage: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
};

export type LocalizedInsight = Omit<Insight, "title" | "excerpt" | "body"> & {
  title: string;
  excerpt: string;
  body: string;
};

export const seedInsights: Insight[] = [
  {
    id: "seed-quality-manufacturing",
    slug: "building-quality-into-every-manufacturing-stage",
    category: "manufacturing",
    publishedAt: "2026-05-20",
    readingMinutes: 5,
    coverImage: "/images/copad-cleanroom.png",
    title: { en: "Building Quality into Every Manufacturing Stage", ar: "ترسيخ الجودة في كل مرحلة من مراحل التصنيع" },
    excerpt: { en: "Quality is a continuous commitment built into every process, decision, and production stage.", ar: "الجودة التزام مستمر يندمج في كل عملية وقرار ومرحلة إنتاج." },
    body: {
      en: "Quality begins before production\n\nQuality starts with carefully selected materials, clear specifications, and processes designed to protect product performance. COPAD teams combine scientific review, documentation, and risk assessment before manufacturing begins.\n\nConsistency through every stage\n\nFrom preparation and production to packaging and release, every stage follows controlled procedures and documented quality checks. This integrated approach supports reliable medicines and continuous improvement across operations.",
      ar: "تبدأ الجودة قبل الإنتاج\n\nتنطلق الجودة من اختيار المواد بعناية ووضع مواصفات واضحة وتصميم عمليات تحافظ على أداء المنتج. وتجمع فرق كوباد بين المراجعة العلمية والتوثيق وتقييم المخاطر قبل بدء التصنيع.\n\nالثبات في كل مرحلة\n\nمن التحضير والإنتاج إلى التعبئة والإفراج، تتبع كل مرحلة إجراءات محكمة وفحوصات جودة موثقة. ويدعم هذا النهج المتكامل منتجات دوائية موثوقة والتحسين المستمر في العمليات.",
    },
  },
  {
    id: "seed-immune-health",
    slug: "understanding-everyday-immune-health",
    category: "health-education",
    publishedAt: "2026-05-16",
    readingMinutes: 4,
    coverImage: "/images/about/about-microscope.png",
    title: { en: "Understanding Everyday Immune Health", ar: "فهم صحة المناعة اليومية" },
    excerpt: { en: "A clear introduction to the everyday factors that support a balanced immune system.", ar: "مقدمة واضحة للعوامل اليومية التي تدعم توازن الجهاز المناعي." },
    body: {
      en: "A balanced everyday foundation\n\nThe immune system works continuously and depends on many connected factors, including nutrition, rest, movement, and appropriate medical guidance. No single habit replaces a balanced approach.\n\nResponsible health information\n\nReliable health education should make complex topics easier to understand without replacing professional advice. Readers should always consult a qualified healthcare professional for personal medical questions.",
      ar: "أساس يومي متوازن\n\nيعمل الجهاز المناعي باستمرار ويعتمد على عوامل مترابطة تشمل التغذية والراحة والحركة والإرشاد الطبي المناسب. ولا توجد عادة واحدة تغني عن النهج المتوازن.\n\nمعلومات صحية مسؤولة\n\nينبغي للتثقيف الصحي الموثوق أن يبسّط الموضوعات المعقدة دون أن يحل محل المشورة المتخصصة. ويجب الرجوع دائمًا إلى مقدم رعاية صحية مؤهل في الأسئلة الطبية الشخصية.",
    },
  },
  {
    id: "seed-capabilities",
    slug: "copad-expands-manufacturing-capabilities",
    category: "company-news",
    publishedAt: "2026-05-12",
    readingMinutes: 3,
    coverImage: "/images/copad-campus-hero.png",
    title: { en: "COPAD Expands Its Manufacturing Capabilities", ar: "كوباد توسّع قدراتها التصنيعية" },
    excerpt: { en: "Continued investment supports reliable production capacity and long-term partnerships.", ar: "استثمارات متواصلة تدعم الطاقة الإنتاجية الموثوقة والشراكات طويلة الأمد." },
    body: {
      en: "Capacity built for responsible growth\n\nCOPAD continues to develop its manufacturing base through disciplined investment in people, systems, and production capability. The objective is consistent supply and dependable long-term operations.\n\nA platform for partnership\n\nExpanded capability also strengthens collaboration with distribution, export, and contract-manufacturing partners seeking a reliable regional platform.",
      ar: "طاقة تدعم النمو المسؤول\n\nتواصل كوباد تطوير قاعدتها التصنيعية من خلال الاستثمار المنضبط في الأفراد والأنظمة والقدرات الإنتاجية، بهدف دعم الإمداد المستمر وعمليات موثوقة على المدى الطويل.\n\nمنصة للشراكة\n\nكما تعزز القدرات المتنامية التعاون مع شركاء التوزيع والتصدير والتصنيع التعاقدي الباحثين عن منصة إقليمية موثوقة.",
    },
  },
];

export function localizeInsight(insight: Insight, locale: Locale): LocalizedInsight {
  return { ...insight, title: insight.title[locale], excerpt: insight.excerpt[locale], body: insight.body[locale] };
}

