import { BriefcaseIcon, EnvelopeSimpleIcon, NewspaperIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getDashboardOverview } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const data = await getDashboardOverview();
  const cards = [
    { label: "Messages", value: data.counts.messages, note: `${data.counts.unreadMessages} unread`, href: "/dashboard/contact", icon: EnvelopeSimpleIcon },
    { label: "Applications", value: data.counts.applications, note: `${data.counts.newApplications} new`, href: "/dashboard/careers", icon: BriefcaseIcon },
    { label: "Published Insights", value: data.counts.publishedInsights, note: `${data.counts.draftInsights} drafts`, href: "/dashboard/insights", icon: NewspaperIcon },
  ];
  return <div className="mx-auto max-w-[1320px]">
    <header className="flex flex-wrap items-end justify-between gap-5 border-b border-copad-deep/10 pb-7">
      <div><h1 className="font-display text-4xl tracking-[-.045em] sm:text-5xl">Content Dashboard</h1><p className="mt-3 text-sm text-copad-deep/52">Manage the website from one clear workspace.</p></div>
      <Link href="/dashboard/insights/new" className="rounded-full bg-copad-green px-6 py-3 text-sm font-black text-white transition hover:bg-copad-deep">New Insight</Link>
    </header>
    {!data.configured ? <div className="mt-6 rounded-2xl border border-copad-red/18 bg-copad-red/5 px-5 py-4 text-sm leading-6 text-copad-red">Preview mode: connect the Supabase environment variables and run the migration to enable live submissions and publishing.</div> : null}
    <section className="mt-7 grid gap-4 md:grid-cols-3">
      {cards.map(({ label, value, note, href, icon: Icon }) => <Link href={href} key={label} className="group flex items-center gap-5 rounded-2xl border border-copad-deep/10 bg-white p-6 shadow-[0_18px_50px_rgba(6,79,120,.055)] transition hover:-translate-y-1 hover:border-copad-green/30"><span className="grid size-14 place-items-center rounded-full bg-copad-sky/25 text-copad-deep"><Icon size={26} /></span><span><span className="block text-sm text-copad-deep/55">{label}</span><strong className="mt-1 block font-display text-4xl leading-none">{value}</strong><small className="mt-2 block font-bold text-copad-green">{note}</small></span></Link>)}
    </section>
    <section className="mt-7 overflow-hidden rounded-2xl border border-copad-deep/10 bg-white">
      <div className="flex items-center justify-between border-b border-copad-deep/10 px-6 py-5"><h2 className="text-lg font-black">Recent Insights</h2><Link href="/dashboard/insights" className="text-sm font-bold text-copad-green">View all</Link></div>
      <div className="divide-y divide-copad-deep/8">{data.insights.slice(0, 5).map((item) => <div key={item.id} className="grid gap-2 px-6 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6"><strong className="text-sm">{item.title.en}</strong><span className="text-xs text-copad-deep/45">{item.category}</span><span className={`w-fit rounded-full px-3 py-1 text-[10px] font-black ${item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span></div>)}</div>
    </section>
  </div>;
}

