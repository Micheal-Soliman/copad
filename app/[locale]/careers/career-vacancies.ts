import type { Locale } from "@/lib/i18n";

export type CareerVacancy = {
  id: string;
  title: Record<Locale, string>;
  department: Record<Locale, string>;
  location: Record<Locale, string>;
  employmentType: Record<Locale, string>;
  summary: Record<Locale, string>;
  responsibilities: Record<Locale, string[]>;
  requirements: Record<Locale, string[]>;
};

/** Update this list to keep the vacancies section and form dropdown in sync. */
export const careerVacancies: CareerVacancy[] = [
  {
    id: "manufacturing",
    title: { en: "Production Pharmacist", ar: "صيدلي إنتاج" },
    department: { en: "Manufacturing", ar: "التصنيع" },
    location: { en: "Egypt", ar: "مصر" },
    employmentType: { en: "Full time", ar: "دوام كامل" },
    summary: { en: "Support reliable pharmaceutical production and the safe, efficient delivery of day-to-day manufacturing operations.", ar: "ادعم الإنتاج الدوائي الموثوق والتنفيذ الآمن والفعال لعمليات التصنيع اليومية." },
    responsibilities: { en: ["Supervise production activities against approved procedures.", "Coordinate materials, documentation, and shift priorities.", "Support deviation follow-up and continuous improvement."], ar: ["الإشراف على أنشطة الإنتاج وفق الإجراءات المعتمدة.", "تنسيق المواد والتوثيق وأولويات الوردية.", "دعم متابعة الانحرافات والتحسين المستمر."] },
    requirements: { en: ["Bachelor's degree in Pharmacy.", "Strong attention to detail and documentation.", "Ability to work effectively across production teams."], ar: ["بكالوريوس صيدلة.", "دقة عالية في التفاصيل والتوثيق.", "القدرة على العمل بكفاءة مع فرق الإنتاج."] },
  },
  {
    id: "quality-assurance",
    title: { en: "Quality Assurance Specialist", ar: "أخصائي ضمان جودة" },
    department: { en: "Quality Assurance", ar: "ضمان الجودة" },
    location: { en: "Egypt", ar: "مصر" },
    employmentType: { en: "Full time", ar: "دوام كامل" },
    summary: { en: "Support the systems, documentation, and standards that protect product quality across COPAD operations.", ar: "ساهم في الأنظمة والتوثيق والمعايير التي تحافظ على جودة المنتجات عبر عمليات كوباد." },
    responsibilities: { en: ["Review batch documentation and quality records.", "Support deviation, CAPA, and change-control workflows.", "Coordinate quality follow-up with operating teams."], ar: ["مراجعة مستندات التشغيل وسجلات الجودة.", "دعم إجراءات الانحرافات والإجراءات التصحيحية والتغيير.", "تنسيق متابعة الجودة مع فرق التشغيل."] },
    requirements: { en: ["Bachelor's degree in Pharmacy or Science.", "Knowledge of GMP principles.", "Clear written communication and analytical thinking."], ar: ["بكالوريوس صيدلة أو علوم.", "معرفة بمبادئ ممارسات التصنيع الجيد.", "تواصل كتابي واضح وقدرة تحليلية."] },
  },
  {
    id: "regulatory-affairs",
    title: { en: "Regulatory Affairs Specialist", ar: "أخصائي شؤون تنظيمية" },
    department: { en: "Regulatory Affairs", ar: "الشؤون التنظيمية" },
    location: { en: "Egypt", ar: "مصر" },
    employmentType: { en: "Full time", ar: "دوام كامل" },
    summary: { en: "Work with cross-functional teams to support compliant products, submissions, and regulatory processes.", ar: "اعمل مع فرق متعددة التخصصات لدعم المنتجات والملفات والإجراءات المتوافقة تنظيميًا." },
    responsibilities: { en: ["Prepare and maintain regulatory submission documentation.", "Track authority requirements and submission timelines.", "Coordinate regulatory inputs across technical teams."], ar: ["إعداد وصيانة مستندات الملفات التنظيمية.", "متابعة متطلبات الجهات والمواعيد التنظيمية.", "تنسيق المدخلات التنظيمية بين الفرق الفنية."] },
    requirements: { en: ["Bachelor's degree in Pharmacy or a related field.", "Strong organization and document-control skills.", "Professional English and Arabic communication."], ar: ["بكالوريوس صيدلة أو مجال ذي صلة.", "مهارات قوية في التنظيم وضبط المستندات.", "إجادة التواصل المهني بالعربية والإنجليزية."] },
  },
  {
    id: "commercial-operations",
    title: { en: "Medical Representative", ar: "مندوب دعاية طبية" },
    department: { en: "Commercial Operations", ar: "العمليات التجارية" },
    location: { en: "Egypt", ar: "مصر" },
    employmentType: { en: "Full time", ar: "دوام كامل" },
    summary: { en: "Build professional healthcare relationships and communicate COPAD's portfolio clearly and responsibly.", ar: "ابنِ علاقات مهنية مع مقدمي الرعاية وقدم محفظة كوباد بوضوح ومسؤولية." },
    responsibilities: { en: ["Plan and deliver professional field visits.", "Maintain accurate territory and customer records.", "Share market feedback with the commercial team."], ar: ["تخطيط وتنفيذ الزيارات الميدانية المهنية.", "الحفاظ على سجلات دقيقة للمنطقة والعملاء.", "مشاركة ملاحظات السوق مع الفريق التجاري."] },
    requirements: { en: ["Bachelor's degree in Pharmacy, Science, or Veterinary Medicine.", "Strong presentation and relationship-building skills.", "Mobility and readiness for field work."], ar: ["بكالوريوس صيدلة أو علوم أو طب بيطري.", "مهارات قوية في العرض وبناء العلاقات.", "القدرة والاستعداد للعمل الميداني."] },
  },
  {
    id: "corporate-functions",
    title: { en: "Human Resources Specialist", ar: "أخصائي موارد بشرية" },
    department: { en: "Corporate Functions", ar: "الوظائف المؤسسية" },
    location: { en: "Egypt", ar: "مصر" },
    employmentType: { en: "Full time", ar: "دوام كامل" },
    summary: { en: "Support COPAD's people operations through organized recruitment, employee records, and day-to-day HR coordination.", ar: "ادعم عمليات الموارد البشرية في كوباد من خلال التوظيف المنظم وسجلات الموظفين والتنسيق اليومي." },
    responsibilities: { en: ["Coordinate recruitment and candidate communication.", "Maintain accurate employee records and HR documentation.", "Support onboarding and employee-service workflows."], ar: ["تنسيق التوظيف والتواصل مع المرشحين.", "الحفاظ على سجلات الموظفين ومستندات الموارد البشرية.", "دعم إجراءات التعيين وخدمات الموظفين."] },
    requirements: { en: ["Bachelor's degree in Business or a related discipline.", "Strong organization and confidentiality.", "Clear communication and follow-through."], ar: ["بكالوريوس إدارة أعمال أو تخصص ذي صلة.", "قدرة تنظيمية عالية والحفاظ على السرية.", "تواصل واضح ومتابعة دقيقة."] },
  },
];

export function localizeVacancy(vacancy: CareerVacancy, locale: Locale) {
  return { id: vacancy.id, title: vacancy.title[locale], department: vacancy.department[locale], location: vacancy.location[locale], employmentType: vacancy.employmentType[locale], summary: vacancy.summary[locale], responsibilities: vacancy.responsibilities[locale], requirements: vacancy.requirements[locale] };
}

export type LocalizedCareerVacancy = ReturnType<typeof localizeVacancy>;

export const vacancySlugs = careerVacancies.map((vacancy) => vacancy.id);

export function isCareerVacancySlug(value: string) {
  return vacancySlugs.includes(value);
}

export function getCareerVacancy(locale: Locale, slug: string) {
  const vacancy = careerVacancies.find((item) => item.id === slug);
  return vacancy ? localizeVacancy(vacancy, locale) : null;
}
