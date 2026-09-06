import type { CareerVacancyRow } from "@/lib/careers";
import { deleteCareerVacancyAction, saveCareerVacancyAction } from "../../actions";

const field = "mt-1.5 w-full rounded-xl border border-copad-deep/12 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-copad-green";

export function VacancyEditor({ vacancy, index }: { vacancy?: CareerVacancyRow; index: number }) {
  const label = vacancy ? vacancy.title_en : "New vacancy";
  return <details open={!vacancy} className="group rounded-2xl border border-copad-deep/10 bg-white">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-black"><span>{label}</span><span className="text-xs text-copad-green">{vacancy?.status ?? "create"}</span></summary>
    <form action={saveCareerVacancyAction} className="grid gap-4 border-t border-copad-deep/8 p-5 lg:grid-cols-2">
      <label className="text-xs font-black text-copad-deep/65">URL slug<input className={field} name="slug" defaultValue={vacancy?.slug} required /></label>
      <div className="grid grid-cols-2 gap-3"><label className="text-xs font-black text-copad-deep/65">Status<select className={field} name="status" defaultValue={vacancy?.status ?? "published"}><option value="published">Published</option><option value="draft">Draft</option></select></label><label className="text-xs font-black text-copad-deep/65">Order<input className={field} type="number" min="0" name="sortOrder" defaultValue={vacancy?.sort_order ?? index} /></label></div>
      <Bilingual name="title" label="Title" vacancy={vacancy} />
      <Bilingual name="department" label="Department" vacancy={vacancy} />
      <Bilingual name="location" label="Location" vacancy={vacancy} />
      <Bilingual name="employmentType" label="Employment type" vacancy={vacancy} />
      <Bilingual name="summary" label="Summary" vacancy={vacancy} area />
      <Bilingual name="responsibilities" label="Responsibilities — one item per line" vacancy={vacancy} area list />
      <Bilingual name="requirements" label="Requirements — one item per line" vacancy={vacancy} area list />
      <div className="lg:col-span-2"><button className="rounded-xl bg-copad-deep px-5 py-3 text-xs font-black text-white">Save vacancy</button></div>
    </form>
    {vacancy?.id ? <form action={deleteCareerVacancyAction} className="border-t border-copad-deep/8 px-5 py-4"><input type="hidden" name="id" value={vacancy.id} /><button className="text-xs font-black text-red-600">Delete vacancy</button></form> : null}
  </details>;
}

function Bilingual({ name, label, vacancy, area = false, list = false }: { name: string; label: string; vacancy?: CareerVacancyRow; area?: boolean; list?: boolean }) {
  const snake = name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  const value = (locale: "en" | "ar") => {
    const raw = vacancy?.[`${snake}_${locale}` as keyof CareerVacancyRow];
    return Array.isArray(raw) ? raw.join("\n") : String(raw ?? "");
  };
  const control = (locale: "En" | "Ar") => area
    ? <textarea dir={locale === "Ar" ? "rtl" : "ltr"} className={field} rows={list ? 4 : 3} name={`${name}${locale}`} defaultValue={value(locale.toLowerCase() as "en" | "ar")} required />
    : <input dir={locale === "Ar" ? "rtl" : "ltr"} className={field} name={`${name}${locale}`} defaultValue={value(locale.toLowerCase() as "en" | "ar")} required />;
  return <fieldset className="grid gap-3 rounded-xl border border-copad-deep/8 p-3 lg:col-span-2 lg:grid-cols-2"><legend className="px-1 text-xs font-black text-copad-deep/65">{label}</legend><label className="text-[11px] font-bold text-copad-deep/50">English{control("En")}</label><label className="text-[11px] font-bold text-copad-deep/50">Arabic{control("Ar")}</label></fieldset>;
}
