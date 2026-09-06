import "server-only";
import { getAllInsights } from "@/lib/insights";
import { isSupabaseConfigured, supabaseReadOr } from "@/lib/supabase/server";

export type ContactMessage = { id: number; name: string; email: string; category: string; message: string; locale: string; status: string; created_at: string };
export type CareerApplication = { id: number; vacancy_id: string; vacancy_title: string; name: string; email: string; phone: string; experience: number; message: string | null; cv_name: string; cv_mime: string; cv_base64: string; locale: string; status: string; created_at: string };

export async function getContactMessages(): Promise<ContactMessage[]> {
  return supabaseReadOr<ContactMessage[]>("contact_messages?select=*&order=created_at.desc", [], { cache: "no-store" });
}

export async function getCareerApplications(): Promise<CareerApplication[]> {
  return supabaseReadOr<CareerApplication[]>("career_applications?select=*&order=created_at.desc", [], { cache: "no-store" });
}

export async function getDashboardOverview() {
  const [messages, applications, insights] = await Promise.all([getContactMessages(), getCareerApplications(), getAllInsights()]);
  return {
    configured: isSupabaseConfigured(),
    messages,
    applications,
    insights,
    counts: {
      messages: messages.length,
      unreadMessages: messages.filter((item) => item.status === "new").length,
      applications: applications.length,
      newApplications: applications.filter((item) => item.status === "new").length,
      publishedInsights: insights.filter((item) => item.status === "published").length,
      draftInsights: insights.filter((item) => item.status === "draft").length,
    },
  };
}
