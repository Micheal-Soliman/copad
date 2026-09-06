import { getContactMessages } from "@/lib/dashboard-data";
import { updateSubmissionStatusAction } from "../../actions";

export default async function DashboardContactPage() {
  const messages = await getContactMessages();
  return <div className="mx-auto max-w-[1320px]">
    <header className="border-b border-copad-deep/10 pb-7"><h1 className="font-display text-4xl tracking-[-.045em] sm:text-5xl">Contact Messages</h1><p className="mt-3 text-sm text-copad-deep/52">Inquiries submitted through the public Contact page.</p></header>
    <div className="mt-7 overflow-hidden rounded-2xl border border-copad-deep/10 bg-white">
      {messages.length ? <div className="divide-y divide-copad-deep/8">{messages.map((item) => <article key={item.id} className="grid gap-5 p-5 lg:grid-cols-[1fr_1.4fr_auto] lg:items-start lg:p-6">
        <div><p className="text-sm font-black">{item.name}</p><a href={`mailto:${item.email}`} className="mt-1 block text-sm text-copad-green">{item.email}</a><p className="mt-3 text-[10px] font-black uppercase tracking-wider text-copad-deep/42">{item.category} · {item.locale.toUpperCase()}</p></div>
        <p className="text-sm leading-7 text-copad-deep/64">{item.message}</p>
        <form action={updateSubmissionStatusAction} className="flex gap-2"><input type="hidden" name="table" value="contact_messages" /><input type="hidden" name="id" value={item.id} /><select name="status" defaultValue={item.status} className="rounded-xl border border-copad-deep/12 bg-white px-3 py-2 text-xs"><option value="new">New</option><option value="read">Read</option><option value="archived">Archived</option></select><button className="rounded-xl bg-copad-deep px-3 py-2 text-xs font-black text-white">Save</button></form>
      </article>)}</div> : <EmptyState text="No contact messages yet." />}
    </div>
  </div>;
}

function EmptyState({ text }: { text: string }) { return <div className="px-6 py-20 text-center text-sm text-copad-deep/45">{text}</div>; }

