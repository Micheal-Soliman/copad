"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { clearDashboardSession, createDashboardSession, requireDashboardSession, verifyDashboardPassword } from "@/lib/dashboard-auth";
import { insightToRow, isInsightCategory } from "@/lib/insights";
import { supabaseRequest } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!verifyDashboardPassword(password)) return { error: "Incorrect password or dashboard environment variables are missing." };
  await createDashboardSession();
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearDashboardSession();
  redirect("/dashboard/login");
}

function required(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

export async function saveInsightAction(formData: FormData) {
  await requireDashboardSession();
  const id = String(formData.get("id") ?? "").trim();
  const category = required(formData, "category");
  if (!isInsightCategory(category)) throw new Error("Invalid insight category.");
  const image = String(formData.get("coverImageBase64") ?? "");
  if (image && (!image.startsWith("data:image/") || image.length > 1_750_000)) throw new Error("Insight image must be a compressed image under 1.25 MB.");

  const row = insightToRow({
    slug: required(formData, "slug"),
    category,
    status: required(formData, "status") === "published" ? "published" : "draft",
    publishedAt: required(formData, "publishedAt"),
    readingMinutes: Math.max(1, Math.min(60, Number(formData.get("readingMinutes") ?? 4))),
    coverImage: image,
    title: { en: required(formData, "titleEn"), ar: required(formData, "titleAr") },
    excerpt: { en: required(formData, "excerptEn"), ar: required(formData, "excerptAr") },
    body: { en: required(formData, "bodyEn"), ar: required(formData, "bodyAr") },
  });

  if (id) await supabaseRequest(`insights?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(row), prefer: "return=minimal" });
  else await supabaseRequest("insights", { method: "POST", body: JSON.stringify(row), prefer: "return=minimal" });

  revalidateTag("insights", "max");
  revalidatePath("/dashboard/insights");
  redirect("/dashboard/insights");
}

export async function deleteInsightAction(formData: FormData) {
  await requireDashboardSession();
  const id = required(formData, "id");
  await supabaseRequest(`insights?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", prefer: "return=minimal" });
  revalidateTag("insights", "max");
  revalidatePath("/dashboard/insights");
}

export async function updateSubmissionStatusAction(formData: FormData) {
  await requireDashboardSession();
  const table = required(formData, "table");
  if (table !== "contact_messages" && table !== "career_applications") throw new Error("Invalid table.");
  const id = required(formData, "id");
  const status = required(formData, "status");
  await supabaseRequest(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }), prefer: "return=minimal" });
  revalidatePath(table === "contact_messages" ? "/dashboard/contact" : "/dashboard/careers");
}

function lines(formData: FormData, key: string) {
  return required(formData, key).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export async function saveCareerVacancyAction(formData: FormData) {
  await requireDashboardSession();
  const slug = required(formData, "slug").toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
  if (!slug) throw new Error("A valid vacancy slug is required.");
  const row = {
    slug,
    status: required(formData, "status") === "draft" ? "draft" : "published",
    title_en: required(formData, "titleEn"), title_ar: required(formData, "titleAr"),
    department_en: required(formData, "departmentEn"), department_ar: required(formData, "departmentAr"),
    location_en: required(formData, "locationEn"), location_ar: required(formData, "locationAr"),
    employment_type_en: required(formData, "employmentTypeEn"), employment_type_ar: required(formData, "employmentTypeAr"),
    summary_en: required(formData, "summaryEn"), summary_ar: required(formData, "summaryAr"),
    responsibilities_en: lines(formData, "responsibilitiesEn"), responsibilities_ar: lines(formData, "responsibilitiesAr"),
    requirements_en: lines(formData, "requirementsEn"), requirements_ar: lines(formData, "requirementsAr"),
    sort_order: Math.max(0, Number(formData.get("sortOrder") ?? 0)),
    updated_at: new Date().toISOString(),
  };
  await supabaseRequest("career_vacancies?on_conflict=slug", { method: "POST", body: JSON.stringify(row), prefer: "resolution=merge-duplicates,return=minimal" });
  revalidatePath("/dashboard/careers");
  revalidatePath("/en/careers");
  revalidatePath("/ar/careers");
}

export async function deleteCareerVacancyAction(formData: FormData) {
  await requireDashboardSession();
  const id = required(formData, "id");
  await supabaseRequest(`career_vacancies?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", prefer: "return=minimal" });
  revalidatePath("/dashboard/careers");
  revalidatePath("/en/careers");
  revalidatePath("/ar/careers");
}
