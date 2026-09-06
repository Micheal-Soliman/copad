import { getCareerApplications } from "@/lib/dashboard-data";
import { getCareerVacancyRows } from "@/lib/careers";
import { updateSubmissionStatusAction } from "../../actions";
import { VacancyEditor } from "./vacancy-editor";

export default async function DashboardCareersPage() {
  const [applications, vacancies] = await Promise.all([getCareerApplications(), getCareerVacancyRows()]);
  return <div className="mx-auto max-w-[1320px]">
    <header className="border-b border-copad-deep/10 pb-7"><h1 className="font-display text-4xl tracking-[-.045em] sm:text-5xl">Career Applications</h1><p className="mt-3 text-sm text-copad-deep/52">Applications submitted from individual vacancy pages.</p></header>
    <section className="mt-7"><div className="mb-4 flex items-end justify-between"><div><h2 className="font-display text-2xl">Vacancies</h2><p className="mt-1 text-xs text-copad-deep/48">Publish, reorder, and update every vacancy from one place.</p></div></div><div className="space-y-3"><VacancyEditor index={vacancies.length} />{vacancies.map((vacancy, index) => <VacancyEditor key={vacancy.slug} vacancy={vacancy} index={index} />)}</div></section>
    <section className="mt-10"><h2 className="mb-4 font-display text-2xl">Applications</h2><div className="overflow-hidden rounded-2xl border border-copad-deep/10 bg-white">
      {applications.length ? <div className="divide-y divide-copad-deep/8">{applications.map((item) => <article key={item.id} className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr_auto] lg:items-start lg:p-6">
        <div><p className="text-sm font-black">{item.name}</p><a href={`mailto:${item.email}`} className="mt-1 block text-sm text-copad-green">{item.email}</a><a href={`tel:${item.phone}`} className="mt-1 block text-sm text-copad-deep/55">{item.phone}</a></div>
        <div><p className="text-sm font-black">{item.vacancy_title}</p><p className="mt-1 text-xs text-copad-deep/48">{item.experience} years experience · {item.locale.toUpperCase()}</p>{item.cv_base64 ? <a href={item.cv_base64} download={item.cv_name} className="mt-3 inline-block text-xs font-black text-copad-green">Download {item.cv_name}</a> : null}</div>
        <form action={updateSubmissionStatusAction} className="flex gap-2"><input type="hidden" name="table" value="career_applications" /><input type="hidden" name="id" value={item.id} /><select name="status" defaultValue={item.status} className="rounded-xl border border-copad-deep/12 bg-white px-3 py-2 text-xs"><option value="new">New</option><option value="reviewing">Reviewing</option><option value="shortlisted">Shortlisted</option><option value="archived">Archived</option></select><button className="rounded-xl bg-copad-deep px-3 py-2 text-xs font-black text-white">Save</button></form>
      </article>)}</div> : <div className="px-6 py-20 text-center text-sm text-copad-deep/45">No career applications yet.</div>}
    </div></section>
  </div>;
}
