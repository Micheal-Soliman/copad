import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const shared = {
  en: {
    insightsCms: {
      latestTitle: "Latest Insights",
      all: "All",
      read: "Read insight",
      back: "Back to Insights",
      related: "Related Insights",
      published: "Published",
      readingTime: "min read",
      categories: { "health-education": "Health Education", manufacturing: "Manufacturing", quality: "Quality", "company-news": "Company News" },
      navigationLabel: "Insights page sections",
      navigation: { home: "Knowledge Lens", channels: "Editorial Streams", latest: "Latest Insights" },
    },
    contactForm: { success: "Message received", successBody: "Thank you. Your inquiry has been sent to the appropriate COPAD team.", error: "We could not send your message. Please try again.", sending: "Sending…" },
    careerForm: { title: "Apply for this position", position: "Position", name: "Full name", email: "Email address", phone: "Phone number", experience: "Years of experience", cv: "Curriculum vitae", upload: "PDF or DOCX", note: "Short message", placeholder: "Tell us briefly about your experience and interest in this position", submit: "Submit application", sending: "Submitting…", success: "Application received", successBody: "Thank you. Our recruitment team will review your details and contact suitable candidates.", error: "We could not submit your application. Please try again.", fileTooLarge: "The CV must be under 1.25 MB." },
    careersUi: { navigationLabel: "Careers page sections", join: "Join COPAD", vacancies: "Vacancies", back: "Back to positions", responsibilities: "Key responsibilities", requirements: "What we're looking for", positionLabel: "COPAD / POSITION" },
    contactPage: {
      sectionTitle: "Reach the right team", sectionBody: "Use the most relevant contact channel, or send an inquiry and we will route it to the appropriate team.", inquiryEyebrow: "Send an inquiry", locationsEyebrow: "Our locations", locationsTitle: "Offices and facilities", workingHours: "Working hours",
      points: [
        { label: "General inquiries", value: "Info@copadpharma.com", href: "mailto:Info@copadpharma.com", note: "For corporate, commercial, and general questions" },
        { label: "Pharmacovigilance", value: "pharmacovigilance@copadpharma.com", href: "mailto:pharmacovigilance@copadpharma.com", note: "For adverse-event and product-safety reporting" },
        { label: "Call us", value: "+2 02 2268 9212–17", href: "tel:+20222689212", note: "8:30 AM–4:30 PM" },
      ],
      locations: [
        { name: "Head Office – Sheraton Heliopolis", address: "4 Square No. 1169 Bis, Sheraton Heliopolis, Cairo", hours: "8:30 AM–4:30 PM", whatsapp: "+20 100 999 6136", whatsappHref: "https://wa.me/201009996136" },
        { name: "Downtown Branch – Emad El Din", address: "11 Emad El Din St., Downtown, Cairo", hours: "8:30 AM–4:30 PM" },
        { name: "Pharmaceutical Factory – Obour", address: "Plots 9 & 10, Block 12011, First Industrial Zone – Northern Extension, Obour City, Qalyubia", hours: "8:00 AM–4:00 PM", whatsapp: "+20 100 999 6106", whatsappHref: "https://wa.me/201009996106" },
        { name: "Dietary Supplements Factory – Obour", address: "Plots 7, 8 & 12, Block 12011, First Industrial Zone – Northern Extension, Obour City, Qalyubia", hours: "8:00 AM–4:00 PM", whatsapp: "+20 100 999 6106", whatsappHref: "https://wa.me/201009996106" },
      ],
    },
  },
  ar: {
    insightsCms: {
      latestTitle: "أحدث الرؤى والأخبار",
      all: "الكل",
      read: "اقرأ الموضوع",
      back: "العودة إلى المعرفة والأخبار",
      related: "موضوعات ذات صلة",
      published: "تاريخ النشر",
      readingTime: "دقائق قراءة",
      categories: { "health-education": "التثقيف الصحي", manufacturing: "التصنيع", quality: "الجودة", "company-news": "أخبار الشركة" },
      navigationLabel: "أقسام صفحة المعرفة والأخبار",
      navigation: { home: "منظور المعرفة", channels: "المسارات التحريرية", latest: "أحدث الأخبار" },
    },
    contactForm: { success: "تم استلام رسالتك", successBody: "شكرًا لك. تم إرسال استفسارك إلى فريق كوباد المختص.", error: "تعذر إرسال رسالتك. حاول مرة أخرى.", sending: "جارٍ الإرسال…" },
    careerForm: { title: "قدّم على هذه الوظيفة", position: "الوظيفة", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف", experience: "سنوات الخبرة", cv: "السيرة الذاتية", upload: "PDF أو DOCX", note: "رسالة مختصرة", placeholder: "اكتب نبذة عن خبرتك وسبب اهتمامك بالوظيفة", submit: "إرسال طلب التوظيف", sending: "جارٍ الإرسال…", success: "تم استلام طلبك", successBody: "شكرًا لك. سيراجع فريق التوظيف بياناتك ويتواصل مع المرشحين المناسبين.", error: "تعذر إرسال طلبك. حاول مرة أخرى.", fileTooLarge: "يجب ألا يتجاوز الملف 1.25 ميجابايت." },
    careersUi: { navigationLabel: "أقسام صفحة الوظائف", join: "الانضمام إلى كوباد", vacancies: "الفرص المتاحة", back: "العودة إلى الوظائف", responsibilities: "المسؤوليات الرئيسية", requirements: "المؤهلات المطلوبة", positionLabel: "كوباد / الوظيفة" },
    contactPage: {
      sectionTitle: "تواصل مع الفريق المناسب", sectionBody: "اختر قناة التواصل المناسبة، أو أرسل رسالتك وسنوجّهها إلى القسم المختص.", inquiryEyebrow: "أرسل استفسارك", locationsEyebrow: "مواقعنا", locationsTitle: "مكاتبنا ومنشآتنا", workingHours: "مواعيد العمل",
      points: [
        { label: "الاستفسارات العامة", value: "Info@copadpharma.com", href: "mailto:Info@copadpharma.com", note: "للاستفسارات المؤسسية والتجارية والعامة" },
        { label: "السلامة الدوائية", value: "pharmacovigilance@copadpharma.com", href: "mailto:pharmacovigilance@copadpharma.com", note: "للإبلاغ عن الآثار الجانبية ومعلومات سلامة المنتجات" },
        { label: "اتصل بنا", value: "+2 02 2268 9212–17", href: "tel:+20222689212", note: "من 8:30 صباحًا إلى 4:30 مساءً" },
      ],
      locations: [
        { name: "المكتب الرئيسي – شيراتون هليوبوليس", address: "4، مربع 1169 مكرر، شيراتون هليوبوليس، القاهرة", hours: "8:30 صباحًا – 4:30 مساءً", whatsapp: "+20 100 999 6136", whatsappHref: "https://wa.me/201009996136" },
        { name: "فرع وسط البلد – عماد الدين", address: "11 شارع عماد الدين، وسط البلد، القاهرة", hours: "8:30 صباحًا – 4:30 مساءً" },
        { name: "مصنع الأدوية – العبور", address: "القطعتان 9 و10، بلوك 12011، المنطقة الصناعية الأولى – الامتداد الشمالي، مدينة العبور، القليوبية", hours: "8:00 صباحًا – 4:00 مساءً", whatsapp: "+20 100 999 6106", whatsappHref: "https://wa.me/201009996106" },
        { name: "مصنع المكملات الغذائية – العبور", address: "القطع 7 و8 و12، بلوك 12011، المنطقة الصناعية الأولى – الامتداد الشمالي، مدينة العبور، القليوبية", hours: "8:00 صباحًا – 4:00 مساءً", whatsapp: "+20 100 999 6106", whatsappHref: "https://wa.me/201009996106" },
      ],
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return { ...siteCopy[locale], ...shared[locale] };
}
