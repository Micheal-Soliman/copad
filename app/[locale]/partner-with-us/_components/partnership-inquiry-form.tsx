"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { PartnershipSlug } from "../partnership-data";
import { getPartnershipData } from "../partnership-data";
import type { Locale } from "@/lib/i18n";

const fieldClass = "mt-2 w-full rounded-2xl border border-copad-deep/12 bg-copad-white px-4 py-3.5 text-base text-copad-deep outline-none transition duration-300 placeholder:text-copad-deep/30 focus:border-copad-green focus:bg-white focus:ring-4 focus:ring-copad-green/10 sm:text-sm";

export function PartnershipInquiryForm({ locale, slug }: { locale: Locale; slug: PartnershipSlug }) {
  const [submitted, setSubmitted] = useState(false);
  const data = getPartnershipData(locale, slug);
  const ar = locale === "ar";
  const reduceMotion = useReducedMotion();

  return <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="grid gap-4 rounded-[1.75rem] border border-copad-deep/10 bg-white p-5 shadow-[0_28px_80px_rgba(1,61,96,.10)] sm:grid-cols-2 sm:p-8">
    {data.fields.map((field, index) => <motion.label key={field.name} initial={reduceMotion ? false : { y: 14 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .48, delay: Math.min(index * .045, .22), ease: [0.22, 1, 0.36, 1] }} className={`text-xs font-black text-copad-deep/72 ${(field.type === "textarea" || field.type === "file") ? "sm:col-span-2" : ""}`}>
      {field.label}{field.required && <span className="ms-1 text-copad-green">*</span>}
      {field.type === "select" ? <select className={fieldClass} name={field.name} required={field.required} defaultValue=""><option value="" disabled>{ar ? "اختر" : "Select"}</option>{field.options?.map((option) => <option key={option}>{option}</option>)}</select>
        : field.type === "textarea" ? <textarea className={fieldClass} name={field.name} rows={4} required={field.required} />
        : <input className={fieldClass} name={field.name} type={field.type ?? "text"} required={field.required} accept={field.type === "file" ? ".pdf,application/pdf" : undefined} />}
    </motion.label>)}
    <motion.div initial={reduceMotion ? false : { y: 14 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .5, delay: .16 }} className="mt-2 flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center">
      <button type="submit" className="min-h-12 rounded-full bg-copad-green px-7 text-xs font-black text-white shadow-[0_15px_34px_rgba(0,144,175,.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-copad-deep">{ar ? "إرسال طلب الشراكة" : "Submit partnership inquiry"}</button>
      <p aria-live="polite" className={`text-xs font-bold text-copad-green transition ${submitted ? "opacity-100" : "opacity-0"}`}>{ar ? "تم استلام بيانات الطلب للمراجعة." : "Your inquiry details are ready for review."}</p>
    </motion.div>
  </form>;
}
