"use client";

import { ArrowRightIcon, CheckCircleIcon, FileArrowUpIcon } from "@phosphor-icons/react";
import { useActionState } from "react";
import { submitCareerApplicationAction, type SubmissionState } from "@/app/actions/submissions";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import type { LocalizedCareerVacancy } from "@/content/careers";

const fieldClass = "mt-2 w-full rounded-xl border border-copad-deep/12 bg-copad-sand/55 px-4 py-3.5 text-sm text-copad-deep outline-none transition placeholder:text-copad-deep/30 focus:border-copad-green focus:bg-white focus:ring-4 focus:ring-copad-green/10";

export function VacancyApplicationForm({ locale, vacancy }: { locale: Locale; vacancy: LocalizedCareerVacancy }) {
  const ar = locale === "ar";
  const labels = getDictionary(locale).careerForm;
  const [state, action, pending] = useActionState(submitCareerApplicationAction, { status: "idle" } satisfies SubmissionState);

  if (state.status === "success") return <div role="status" className="rounded-[1.75rem] bg-copad-white p-8 text-copad-deep shadow-[0_30px_80px_rgba(6,79,120,.12)] sm:p-10">
    <CheckCircleIcon size={42} weight="fill" className="text-copad-green" />
    <h2 className={`${ar ? "font-sans font-black" : "font-display"} mt-6 text-4xl leading-[1.04] tracking-[-.04em]`}>{labels.success}</h2>
    <p className="mt-4 text-sm leading-7 text-copad-deep/62">{labels.successBody}</p>
  </div>;

  return <form action={action} className="grid gap-5 rounded-[1.75rem] bg-copad-white p-5 text-copad-deep shadow-[0_30px_80px_rgba(6,79,120,.12)] sm:grid-cols-2 sm:p-8 lg:p-10">
    <input type="hidden" name="locale" value={locale} /><input type="hidden" name="vacancyId" value={vacancy.id} />
    <div className="col-span-full border-b border-copad-deep/10 pb-5">
      <p className="text-[9px] font-black uppercase tracking-[.2em] text-copad-green">{labels.eyebrow}</p>
      <h2 className={`${ar ? "font-sans font-black" : "font-display"} mt-3 text-[clamp(2rem,3vw,3.2rem)] leading-[1.04] tracking-[-.04em]`}>{labels.title}</h2>
    </div>
    <label className="col-span-full text-xs font-black text-copad-deep/67">{labels.position}<input className={`${fieldClass} font-black`} name="position" value={vacancy.title} readOnly /></label>
    <label className="text-xs font-black text-copad-deep/67">{labels.name}<input className={fieldClass} name="name" autoComplete="name" required /></label>
    <label className="text-xs font-black text-copad-deep/67">{labels.email}<input className={fieldClass} type="email" name="email" autoComplete="email" required /></label>
    <label className="text-xs font-black text-copad-deep/67">{labels.phone}<input className={fieldClass} type="tel" name="phone" autoComplete="tel" required /></label>
    <label className="text-xs font-black text-copad-deep/67">{labels.experience}<input className={fieldClass} type="number" min="0" name="experience" inputMode="numeric" required /></label>
    <label className="col-span-full text-xs font-black text-copad-deep/67">{labels.cv}<span className={`${fieldClass} flex min-h-[3.25rem] cursor-pointer items-center gap-2 text-copad-deep/48`}><FileArrowUpIcon size={18} className="text-copad-green" />{labels.upload}<input className="sr-only" type="file" name="cv" accept=".pdf,.doc,.docx" required /></span></label>
    <label className="col-span-full text-xs font-black text-copad-deep/67">{labels.note}<textarea className={fieldClass} name="message" rows={4} placeholder={labels.placeholder} /></label>
    {state.status === "error" ? <p role="alert" className="col-span-full text-sm font-bold text-copad-red">{state.message === "cv-size" ? labels.fileTooLarge : labels.error}</p> : null}
    <button disabled={pending} type="submit" className="group col-span-full inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-copad-green px-7 text-xs font-black text-white shadow-[0_16px_36px_rgba(0,163,196,.22)] transition hover:-translate-y-0.5 hover:bg-copad-deep disabled:opacity-55 sm:col-span-1">{pending ? labels.sending : labels.submit}<ArrowRightIcon className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" /></button>
  </form>;
}
