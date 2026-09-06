"use client";

import { ImageIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import type { InsightAdminRecord } from "@/lib/insights";
import { saveInsightAction } from "../../actions";

const field = "mt-2 min-h-12 w-full rounded-xl border border-copad-deep/12 bg-white px-4 py-3 text-sm text-copad-deep outline-none transition focus:border-copad-green focus:ring-4 focus:ring-copad-green/10";

export function InsightEditor({ insight }: { insight?: InsightAdminRecord }) {
  const [image, setImage] = useState(insight?.coverImage.startsWith("data:") ? insight.coverImage : "");
  const [processing, setProcessing] = useState(false);

  async function handleImage(file?: File) {
    if (!file) return;
    setProcessing(true);
    try {
      const source = await createImageBitmap(file);
      const scale = Math.min(1, 1600 / source.width, 900 / source.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(source.width * scale);
      canvas.height = Math.round(source.height * scale);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image processing is unavailable.");
      context.drawImage(source, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL("image/jpeg", 0.78));
      source.close();
    } finally { setProcessing(false); }
  }

  return <form action={saveInsightAction} className="mt-7 grid gap-6 rounded-[1.75rem] border border-copad-deep/10 bg-white p-5 shadow-[0_24px_70px_rgba(6,79,120,.06)] sm:p-8 lg:grid-cols-2">
    {insight ? <input type="hidden" name="id" value={insight.id} /> : null}<input type="hidden" name="coverImageBase64" value={image} />
    <label className="text-xs font-black text-copad-deep/65">Slug<input className={field} name="slug" defaultValue={insight?.slug} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></label>
    <label className="text-xs font-black text-copad-deep/65">Category<select className={field} name="category" defaultValue={insight?.category ?? "health-education"}><option value="health-education">Health Education</option><option value="manufacturing">Manufacturing</option><option value="quality">Quality</option><option value="company-news">Company News</option></select></label>
    <label className="text-xs font-black text-copad-deep/65">Status<select className={field} name="status" defaultValue={insight?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
    <div className="grid grid-cols-2 gap-4"><label className="text-xs font-black text-copad-deep/65">Publish date<input className={field} type="date" name="publishedAt" defaultValue={insight?.publishedAt ?? new Date().toISOString().slice(0, 10)} required /></label><label className="text-xs font-black text-copad-deep/65">Read time<input className={field} type="number" min="1" max="60" name="readingMinutes" defaultValue={insight?.readingMinutes ?? 4} required /></label></div>
    <label className="text-xs font-black text-copad-deep/65">English title<input className={field} name="titleEn" defaultValue={insight?.title.en} required /></label>
    <label dir="rtl" className="text-xs font-black text-copad-deep/65">العنوان بالعربية<input className={field} name="titleAr" defaultValue={insight?.title.ar} required /></label>
    <label className="text-xs font-black text-copad-deep/65">English excerpt<textarea className={field} name="excerptEn" rows={3} defaultValue={insight?.excerpt.en} required /></label>
    <label dir="rtl" className="text-xs font-black text-copad-deep/65">الملخص بالعربية<textarea className={field} name="excerptAr" rows={3} defaultValue={insight?.excerpt.ar} required /></label>
    <label className="text-xs font-black text-copad-deep/65">English article body<textarea className={field} name="bodyEn" rows={12} defaultValue={insight?.body.en} required /></label>
    <label dir="rtl" className="text-xs font-black text-copad-deep/65">محتوى المقال بالعربية<textarea className={field} name="bodyAr" rows={12} defaultValue={insight?.body.ar} required /></label>
    <label className="relative flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-copad-green/35 bg-copad-sand/55 text-center lg:col-span-2">{image ? <Image src={image} alt="Insight cover preview" fill unoptimized className="object-cover" /> : <><ImageIcon size={32} className="text-copad-green" /><span className="mt-3 text-sm font-black">Choose cover image</span><span className="mt-1 text-xs text-copad-deep/45">Compressed and saved as Base64</span></>}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => void handleImage(event.target.files?.[0])} /><span className={`absolute inset-x-4 bottom-4 rounded-full bg-copad-deep/90 px-5 py-3 text-xs font-black text-white ${image ? "block" : "hidden"}`}>{processing ? "Processing…" : "Change image"}</span></label>
    <button disabled={processing} className="min-h-12 rounded-full bg-copad-green px-7 text-sm font-black text-white transition hover:bg-copad-deep disabled:opacity-50 sm:w-fit lg:col-span-2">{insight ? "Save changes" : "Create insight"}</button>
  </form>;
}
