import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const defaultFieldClass = "mt-2 w-full rounded-2xl border border-copad-deep/12 bg-white px-4 py-3 text-base text-copad-deep outline-none transition placeholder:text-copad-deep/35 focus:border-copad-green focus:ring-4 focus:ring-copad-green/10 sm:text-sm";
const immersiveFieldClass = "mt-2 w-full rounded-xl border border-copad-deep/12 bg-copad-white/82 px-4 py-3 text-base text-copad-deep outline-none transition duration-300 placeholder:text-copad-deep/30 focus:-translate-y-0.5 focus:border-copad-green focus:bg-white focus:shadow-[0_12px_30px_rgba(0,144,175,.1)] focus:ring-4 focus:ring-copad-green/10 sm:text-sm";
const dispatchFieldClass = "mt-1 w-full border-0 border-b border-copad-deep/16 bg-transparent px-0 py-2.5 text-base text-copad-deep outline-none transition duration-300 placeholder:text-copad-deep/25 focus:border-copad-green focus:ring-0 sm:text-sm";

type ContactFormProps = {
  locale: Locale;
  variant?: "default" | "immersive" | "dispatch";
  initialCategory?: string;
};

export function ContactForm({ locale, variant = "default", initialCategory = "" }: ContactFormProps) {
  const copy = siteCopy[locale];
  const [name, email, category, message] = copy.utility.formLabels;
  const isDispatch = variant === "dispatch";
  const fieldClass = variant === "immersive" ? immersiveFieldClass : isDispatch ? dispatchFieldClass : defaultFieldClass;

  return (
    <form className={`grid gap-4 ${isDispatch ? "grid-cols-1 sm:grid-cols-2" : "rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8"} ${variant === "immersive" ? "border border-copad-deep/8 bg-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,.9)]" : isDispatch ? "bg-transparent" : "bg-white shadow-[0_24px_70px_rgba(1,61,96,.1)]"}`}>
      <label className="text-xs font-black text-copad-deep/70">{name}<input className={fieldClass} name="name" autoComplete="name" /></label>
      <label className="text-xs font-black text-copad-deep/70">{email}<input className={fieldClass} type="email" name="email" autoComplete="email" /></label>
      <label className="text-xs font-black text-copad-deep/70">{category}<select className={fieldClass} name="category" defaultValue={initialCategory}><option value="" disabled>—</option>{copy.ui.formCategories.map((option) => <option key={option}>{option}</option>)}</select></label>
      <label className={`text-xs font-black text-copad-deep/70 ${isDispatch ? "sm:col-span-2" : ""}`}>{message}<textarea className={fieldClass} name="message" rows={isDispatch ? 3 : 5} /></label>
      <button className={`group relative isolate min-h-12 w-full overflow-hidden rounded-full bg-copad-green px-7 py-3 text-xs font-black text-white shadow-[0_15px_34px_rgba(0,144,175,.2)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(1,61,96,.2)] sm:w-auto sm:justify-self-start ${isDispatch ? "sm:col-span-2" : ""}`} type="button"><span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copad-deep transition-transform duration-500 group-hover:scale-y-100" />{copy.utility.submit}</button>
    </form>
  );
}
