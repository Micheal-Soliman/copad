"use server";

import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getPartnershipData, isPartnershipSlug } from "@/content/partnerships";
import { sendSubmissionEmail } from "@/lib/email/server";
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

function optionalText(formData: FormData, key: string, maxLength = 5000) {
  const value = String(formData.get(key) ?? "").trim();
  if (value.length > maxLength) throw new Error("invalid");
  return value;
}

async function storeSubmission(table: "contact_messages" | "career_applications", payload: object) {
  try {
    await supabaseRequest(table, {
      method: "POST",
      prefer: "return=minimal",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Email delivery is the primary submission path. A temporary CMS issue must not
    // make visitors resend an inquiry that has already reached the COPAD inbox.
    console.error(`Could not store ${table} submission in Supabase.`, error);
  }
}

export async function submitContactAction(_: SubmissionState, formData: FormData): Promise<SubmissionState> {
  try {
    const email = text(formData, "email", 320);
    if (!/^\S+@\S+\.\S+$/.test(email)) return initialError;
    const payload = {
      name: text(formData, "name", 160),
      email,
      category: text(formData, "category", 160),
      message: text(formData, "message"),
      locale: localeFrom(formData),
    };
    await sendSubmissionEmail({
      subject: `[COPAD Website] Contact — ${payload.category}`,
      heading: "New contact inquiry",
      replyTo: email,
      fields: [
        { label: "Name", value: payload.name },
        { label: "Email", value: email },
        { label: "Category", value: payload.category },
        { label: "Language", value: payload.locale.toUpperCase() },
        { label: "Message", value: payload.message },
      ],
    });
    await storeSubmission("contact_messages", payload);
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
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const cvBase64 = `data:${cv.type};base64,${cvBuffer.toString("base64")}`;
    const payload = {
      vacancy_id: text(formData, "vacancyId", 120),
      vacancy_title: text(formData, "position", 240),
      name: text(formData, "name", 160),
      email,
      phone: text(formData, "phone", 80),
      experience: Math.max(0, Number(formData.get("experience") ?? 0)),
      message: optionalText(formData, "message"),
      cv_name: cv.name,
      cv_mime: cv.type,
      cv_base64: cvBase64,
      locale: localeFrom(formData),
    };
    await sendSubmissionEmail({
      subject: `[COPAD Careers] ${payload.vacancy_title} — ${payload.name}`,
      heading: "New career application",
      replyTo: email,
      fields: [
        { label: "Position", value: payload.vacancy_title },
        { label: "Applicant", value: payload.name },
        { label: "Email", value: email },
        { label: "Phone", value: payload.phone },
        { label: "Years of experience", value: payload.experience },
        { label: "Language", value: payload.locale.toUpperCase() },
        { label: "Note", value: payload.message },
      ],
      attachments: [{ filename: cv.name, content: cvBuffer, contentType: cv.type }],
    });
    await storeSubmission("career_applications", payload);
    return { status: "success" };
  } catch {
    return initialError;
  }
}

export async function submitPartnershipInquiryAction(_: SubmissionState, formData: FormData): Promise<SubmissionState> {
  try {
    const locale = localeFrom(formData);
    const slug = text(formData, "partnershipSlug", 120);
    if (!isPartnershipSlug(slug)) return initialError;
    const data = getPartnershipData(locale, slug);
    const values = data.fields.map((field) => ({
      ...field,
      value: field.required ? text(formData, field.name) : optionalText(formData, field.name),
    }));
    const email = values.find((field) => field.name === "email")?.value ?? "";
    if (!/^\S+@\S+\.\S+$/.test(email)) return initialError;

    const brief = formData.get("brief");
    let attachment: { filename: string; content: Buffer; contentType: string } | undefined;
    if (brief instanceof File && brief.size) {
      if (brief.type !== "application/pdf" || brief.size > 5_000_000) return { status: "error", message: "file" };
      attachment = { filename: brief.name, content: Buffer.from(await brief.arrayBuffer()), contentType: brief.type };
    }

    const contact = values.find((field) => field.name === "contact")?.value ?? "";
    const summary = values.filter((field) => field.name !== "brief").map((field) => `${field.label}: ${field.value}`).join("\n\n");
    await sendSubmissionEmail({
      subject: `[COPAD Partnerships] ${data.title} — ${contact}`,
      heading: `New partnership inquiry: ${data.title}`,
      replyTo: email,
      fields: [
        ...values.filter((field) => field.name !== "brief").map((field) => ({ label: field.label, value: field.value })),
        { label: "Language", value: locale.toUpperCase() },
      ],
      attachments: attachment ? [attachment] : undefined,
    });
    await storeSubmission("contact_messages", { name: contact, email, category: `Partnership — ${data.title}`, message: summary, locale });
    return { status: "success" };
  } catch {
    return initialError;
  }
}
