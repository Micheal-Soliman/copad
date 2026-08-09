import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const fieldClass = "mt-2 w-full rounded-2xl border border-copad-deep/12 bg-white px-4 py-3 text-base text-copad-deep outline-none transition placeholder:text-copad-deep/35 focus:border-copad-green focus:ring-4 focus:ring-copad-green/10 sm:text-sm";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const [name, email, category, message] = copy.utility.formLabels;
  return (
    <form className="grid gap-5 rounded-[1.5rem] bg-white p-5 shadow-[0_24px_70px_rgba(15,61,57,.1)] sm:rounded-[2rem] sm:p-8">
      <label className="text-xs font-black text-copad-deep/70">{name}<input className={fieldClass} name="name" autoComplete="name" /></label>
      <label className="text-xs font-black text-copad-deep/70">{email}<input className={fieldClass} type="email" name="email" autoComplete="email" /></label>
      <label className="text-xs font-black text-copad-deep/70">{category}<select className={fieldClass} name="category" defaultValue=""><option value="" disabled>—</option>{copy.ui.formCategories.map((option) => <option key={option}>{option}</option>)}</select></label>
      <label className="text-xs font-black text-copad-deep/70">{message}<textarea className={fieldClass} name="message" rows={5} /></label>
      <button className="min-h-11 w-full rounded-full bg-copad-green px-6 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-copad-deep sm:w-auto sm:justify-self-start" type="button">{copy.utility.submit}</button>
    </form>
  );
}
