import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";
import { dashboardAuthConfigured, isDashboardAuthenticated } from "@/lib/dashboard-auth";
import { LoginForm } from "./login-form";

export default async function DashboardLoginPage() {
  if (await isDashboardAuthenticated()) redirect("/dashboard");
  const configured = dashboardAuthConfigured();
  return <main className="grid min-h-screen place-items-center bg-white px-5 py-12 text-copad-deep">
    <div aria-hidden="true" className="fixed inset-y-0 start-0 w-2 bg-linear-to-b from-copad-red via-copad-green to-copad-sky" />
    <section className="w-full max-w-md rounded-[2rem] border border-copad-deep/10 bg-white p-7 shadow-[0_32px_100px_rgba(6,79,120,.12)] sm:p-10">
      <Brand locale="en" />
      <h1 className="mt-10 font-display text-4xl leading-none tracking-[-.045em] sm:text-5xl">Content Dashboard</h1>
      <p className="mt-4 text-sm leading-7 text-copad-deep/58">Sign in to manage website messages, applications, and insights.</p>
      {!configured ? <p className="mt-6 rounded-xl border border-copad-red/20 bg-copad-red/5 px-4 py-3 text-sm leading-6 text-copad-red">Add DASHBOARD_PASSWORD and DASHBOARD_SESSION_SECRET to enable secure access.</p> : null}
      <LoginForm />
    </section>
  </main>;
}

