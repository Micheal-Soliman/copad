import Link from "next/link";
import { getAllInsights } from "@/lib/insights";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { deleteInsightAction } from "../../actions";

export default async function DashboardInsightsPage() {
  const insights = await getAllInsights();
  const configured = isSupabaseConfigured();
  return <div className="mx-auto max-w-[1320px]">
    <header className="flex flex-wrap items-end justify-between gap-5 border-b border-copad-deep/10 pb-7"><div><h1 className="font-display text-4xl tracking-[-.045em] sm:text-5xl">Insights</h1><p className="mt-3 text-sm text-copad-deep/52">Create and publish bilingual articles with Base64 cover images.</p></div><Link href="/dashboard/insights/new" className="rounded-full bg-copad-green px-6 py-3 text-sm font-black text-white transition hover:bg-copad-deep">New Insight</Link></header>
    {!configured ? <p className="mt-6 rounded-xl border border-copad-red/20 bg-copad-red/5 px-4 py-3 text-sm text-copad-red">Seed content is shown in preview mode. Connect Supabase before creating or editing articles.</p> : null}
    <div className="mt-7 overflow-x-auto rounded-2xl border border-copad-deep/10 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-start text-sm"><thead><tr className="border-b border-copad-deep/10 text-[10px] uppercase tracking-wider text-copad-deep/45"><th className="px-6 py-4 text-start">Title</th><th className="px-5 py-4 text-start">Category</th><th className="px-5 py-4 text-start">Status</th><th className="px-5 py-4 text-start">Date</th><th className="px-6 py-4 text-end">Actions</th></tr></thead><tbody className="divide-y divide-copad-deep/8">{insights.map((item) => <tr key={item.id}><td className="px-6 py-4 font-bold">{item.title.en}</td><td className="px-5 py-4 text-copad-deep/55">{item.category}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-[10px] font-black ${item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span></td><td className="px-5 py-4 text-copad-deep/55">{item.publishedAt}</td><td className="px-6 py-4"><div className="flex justify-end gap-2">{configured ? <><Link href={`/dashboard/insights/${item.id}/edit`} className="rounded-lg border border-copad-deep/12 px-3 py-2 text-xs font-black">Edit</Link><form action={deleteInsightAction}><input type="hidden" name="id" value={item.id} /><button className="rounded-lg border border-copad-red/20 px-3 py-2 text-xs font-black text-copad-red">Delete</button></form></> : <span className="text-xs text-copad-deep/35">Preview</span>}</div></td></tr>)}</tbody></table>
    </div>
  </div>;
}

