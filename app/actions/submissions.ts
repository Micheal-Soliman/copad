"use server";

import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { supabaseRequest } from "@/lib/supabase/server";

export type SubmissionState = { status: "idle" | "success" | "error"; message?: string };

const initialError: SubmissionState = { status: "error", message: "invalid" };

function text(formData: FormData, key: string, maxLength = 5000) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value || value.length > maxLength) throw new Error("invalid");
  return value;
}

function localeFrom(formData: FormData): Locale {
  const value = String(formData.get("locale") ?? "");
  if (!isLocale(value)) throw new Error("invalid");
  return value;
}

export async function submitContactAction(_: SubmissionState, formData: FormData): Promise<SubmissionState> {
  try {
    const email = text(formData, "email", 320);
    if (!/^\S+@\S+\.\S+$/.test(email)) return initialError;
    await supabaseRequest("contact_messages", {
      method: "POST",
      prefer: "return=minimal",
      body: JSON.stringify({ name: text(formData, "name", 160), email, category: text(formData, "category", 160), message: text(formData, "message"), locale: localeFrom(formData) }),
    });
    return { status: "success" };
  } catch {
    return initialError;
  }
}

export async function submitCareerApplicationAction(_: SubmissionState, formData: FormData): Promise<SubmissionState> {
  try {
    const email = text(formData, "email", 320);
    if (!/^\S+@\S+\.\S+$/.test(email)) return initialError;
    const cv = formData.get("cv");
    if (!(cv instanceof File) || !cv.size || cv.size > 1_250_000) return { status: "error", message: "cv-size" };
    const allowedMime = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
    if (!allowedMime.has(cv.type)) return { status: "error", message: "cv-type" };
    const cvBase64 = `data:${cv.type};base64,${Buffer.from(await cv.arrayBuffer()).toString("base64")}`;
    await supabaseRequest("career_applications", {
      method: "POST",
      prefer: "return=minimal",
      body: JSON.stringify({
        vacancy_id: text(formData, "vacancyId", 120), vacancy_title: text(formData, "position", 240), name: text(formData, "name", 160), email,
        phone: text(formData, "phone", 80), experience: Math.max(0, Number(formData.get("experience") ?? 0)), message: String(formData.get("message") ?? "").trim(),
        cv_name: cv.name, cv_mime: cv.type, cv_base64: cvBase64, locale: localeFrom(formData),
      }),
    });
    return { status: "success" };
  } catch {
    return initialError;
  }
}

