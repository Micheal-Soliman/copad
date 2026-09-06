import { notFound } from "next/navigation";
import { getInsightById } from "@/lib/insights";
import { InsightEditor } from "../../insight-editor";

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const insight = await getInsightById(id);
  if (!insight) notFound();
  return <div className="mx-auto max-w-[1100px]"><header className="border-b border-copad-deep/10 pb-7"><h1 className="font-display text-4xl tracking-[-.045em] sm:text-5xl">Edit Insight</h1><p className="mt-3 text-sm text-copad-deep/52">Update content, publishing state, or cover image.</p></header><InsightEditor insight={insight} /></div>;
}
