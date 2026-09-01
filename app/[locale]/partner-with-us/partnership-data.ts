import type { Locale } from "@/lib/i18n";

export const partnershipSlugs = [
  "distribution-partnerships",
  "export-collaboration",
  "contract-toll-manufacturing",
] as const;

export type PartnershipSlug = (typeof partnershipSlugs)[number];
type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "select" | "textarea" | "file"; options?: string[]; required?: boolean };
type PartnershipPageData = { eyebrow: string; title: string; intro: string; image: string; highlights: string[]; fields: Field[] };

const english: Record<PartnershipSlug, PartnershipPageData> = {
  "distribution-partnerships": {
    eyebrow: "Partnership route · 01",
    title: "Distribution Partnerships",
    intro: "Build reliable access to COPAD's pharmaceutical and consumer-health portfolio through an aligned, long-term distribution model.",
    image: "/images/partnerships/distribution-partnerships.png",
    highlights: ["Territory and channel alignment", "Portfolio and demand planning", "Supply and commercial coordination"],
    fields: [
      { name: "company", label: "Company name", required: true }, { name: "contact", label: "Contact person", required: true },
      { name: "email", label: "Business email", type: "email", required: true }, { name: "phone", label: "Phone number", type: "tel" },
      { name: "territory", label: "Proposed territory or governorates", required: true },
      { name: "channel", label: "Primary distribution channel", type: "select", options: ["Pharmacy", "Hospital & institutional", "Wholesale", "Retail & e-commerce", "Multiple channels"], required: true },
      { name: "coverage", label: "Current coverage and network size", type: "textarea", required: true },
      { name: "message", label: "Portfolio interest and partnership objectives", type: "textarea", required: true },
    ],
  },
  "export-collaboration": {
    eyebrow: "Partnership route · 02", title: "Export Collaboration",
    intro: "Explore a structured route to regional markets through portfolio selection, regulatory alignment, and dependable commercial execution.",
    image: "/images/partnerships/export-collaboration.png",
    highlights: ["Target-market assessment", "Registration and regulatory readiness", "Export supply planning"],
    fields: [
      { name: "company", label: "Company name", required: true }, { name: "contact", label: "Contact person", required: true },
      { name: "email", label: "Business email", type: "email", required: true }, { name: "phone", label: "Phone number", type: "tel" },
      { name: "markets", label: "Target country or markets", required: true },
      { name: "role", label: "Your organization type", type: "select", options: ["Importer", "Distributor", "Commercial agent", "Healthcare group", "Other"], required: true },
      { name: "regulatory", label: "Current regulatory and registration capability", type: "textarea", required: true },
      { name: "message", label: "Portfolio interest and estimated opportunity", type: "textarea", required: true },
    ],
  },
  "contract-toll-manufacturing": {
    eyebrow: "Partnership route · 03", title: "Contract & Toll Manufacturing",
    intro: "Discuss a manufacturing requirement with COPAD's technical and business-development teams, from dosage form to production scale.",
    image: "/images/partnerships/contract-manufacturing.png",
    highlights: ["Technical feasibility review", "Quality and regulatory alignment", "Scale, timing, and transfer planning"],
    fields: [
      { name: "company", label: "Company name", required: true }, { name: "contact", label: "Contact person", required: true },
      { name: "email", label: "Business email", type: "email", required: true }, { name: "phone", label: "Phone number", type: "tel" },
      { name: "service", label: "Required service", type: "select", options: ["Toll manufacturing", "Contract manufacturing", "Technology transfer", "Packaging", "Feasibility assessment"], required: true },
      { name: "dosage", label: "Product category or dosage form", required: true },
      { name: "market", label: "Intended market and regulatory status", type: "textarea", required: true },
      { name: "volume", label: "Estimated batch size or annual volume" },
      { name: "brief", label: "Technical brief (PDF)", type: "file" },
      { name: "message", label: "Project timeline and additional requirements", type: "textarea", required: true },
    ],
  },
};

const arabic: Record<PartnershipSlug, PartnershipPageData> = {
  "distribution-partnerships": { ...english["distribution-partnerships"], eyebrow: "مسار الشراكة · 01", title: "شراكات التوزيع", intro: "ابنِ وصولًا موثوقًا لمحفظة كوباد الدوائية وصحة المستهلك عبر نموذج توزيع متوافق وطويل الأجل.", highlights: ["توافق النطاق وقنوات التوزيع", "تخطيط المحفظة والطلب", "تنسيق الإمداد والتعاون التجاري"], fields: [
    { name: "company", label: "اسم الشركة", required: true }, { name: "contact", label: "اسم مسؤول التواصل", required: true }, { name: "email", label: "البريد الإلكتروني للعمل", type: "email", required: true }, { name: "phone", label: "رقم الهاتف", type: "tel" }, { name: "territory", label: "النطاق أو المحافظات المقترحة", required: true }, { name: "channel", label: "قناة التوزيع الأساسية", type: "select", options: ["الصيدليات", "المستشفيات والمؤسسات", "الجملة", "التجزئة والتجارة الإلكترونية", "قنوات متعددة"], required: true }, { name: "coverage", label: "التغطية الحالية وحجم الشبكة", type: "textarea", required: true }, { name: "message", label: "المحفظة المطلوبة وأهداف الشراكة", type: "textarea", required: true },
  ] },
  "export-collaboration": { ...english["export-collaboration"], eyebrow: "مسار الشراكة · 02", title: "التعاون في التصدير", intro: "استكشف مسارًا منظمًا للأسواق الإقليمية عبر اختيار المحفظة والتوافق التنظيمي والتنفيذ التجاري الموثوق.", highlights: ["تقييم السوق المستهدف", "جاهزية التسجيل والتنظيم", "تخطيط إمدادات التصدير"], fields: [
    { name: "company", label: "اسم الشركة", required: true }, { name: "contact", label: "اسم مسؤول التواصل", required: true }, { name: "email", label: "البريد الإلكتروني للعمل", type: "email", required: true }, { name: "phone", label: "رقم الهاتف", type: "tel" }, { name: "markets", label: "الدولة أو الأسواق المستهدفة", required: true }, { name: "role", label: "نوع المؤسسة", type: "select", options: ["مستورد", "موزع", "وكيل تجاري", "مجموعة رعاية صحية", "أخرى"], required: true }, { name: "regulatory", label: "القدرات الحالية للتسجيل والشؤون التنظيمية", type: "textarea", required: true }, { name: "message", label: "المحفظة المطلوبة وحجم الفرصة المتوقع", type: "textarea", required: true },
  ] },
  "contract-toll-manufacturing": { ...english["contract-toll-manufacturing"], eyebrow: "مسار الشراكة · 03", title: "التصنيع التعاقدي وللغير", intro: "ناقش متطلبات التصنيع مع فريقي كوباد الفني وتطوير الأعمال، من الشكل الدوائي حتى حجم الإنتاج.", highlights: ["مراجعة الجدوى الفنية", "التوافق مع الجودة والتنظيم", "تخطيط الحجم والتوقيت ونقل التقنية"], fields: [
    { name: "company", label: "اسم الشركة", required: true }, { name: "contact", label: "اسم مسؤول التواصل", required: true }, { name: "email", label: "البريد الإلكتروني للعمل", type: "email", required: true }, { name: "phone", label: "رقم الهاتف", type: "tel" }, { name: "service", label: "الخدمة المطلوبة", type: "select", options: ["التصنيع للغير", "التصنيع التعاقدي", "نقل التكنولوجيا", "التعبئة والتغليف", "تقييم الجدوى"], required: true }, { name: "dosage", label: "فئة المنتج أو الشكل الدوائي", required: true }, { name: "market", label: "السوق المستهدف والوضع التنظيمي", type: "textarea", required: true }, { name: "volume", label: "حجم التشغيلة أو الحجم السنوي المتوقع" }, { name: "brief", label: "الملف الفني (PDF)", type: "file" }, { name: "message", label: "الجدول الزمني والمتطلبات الإضافية", type: "textarea", required: true },
  ] },
};

export function isPartnershipSlug(value: string): value is PartnershipSlug { return partnershipSlugs.includes(value as PartnershipSlug); }
export function getPartnershipData(locale: Locale, slug: PartnershipSlug) { return (locale === "ar" ? arabic : english)[slug]; }
