import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "copad_dashboard_session";
const maxAgeSeconds = 60 * 60 * 8;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret() {
  return process.env.DASHBOARD_SESSION_SECRET ?? "";
}

function sign(expiresAt: string) {
  return createHmac("sha256", sessionSecret()).update(expiresAt).digest("hex");
}

export function dashboardAuthConfigured() {
  return Boolean(process.env.DASHBOARD_PASSWORD && sessionSecret().length >= 24);
}

export function verifyDashboardPassword(password: string) {
  const expected = process.env.DASHBOARD_PASSWORD ?? "";
  return dashboardAuthConfigured() && safeEqual(password, expected);
}

export async function createDashboardSession() {
  const expiresAt = String(Date.now() + maxAgeSeconds * 1000);
  const value = `${expiresAt}.${sign(expiresAt)}`;
  (await cookies()).set(cookieName, value, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/dashboard", maxAge: maxAgeSeconds });
}

export async function clearDashboardSession() {
  (await cookies()).set(cookieName, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/dashboard", maxAge: 0 });
}

export async function isDashboardAuthenticated() {
  if (!dashboardAuthConfigured()) return false;
  const value = (await cookies()).get(cookieName)?.value;
  if (!value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) return false;
  return safeEqual(signature, sign(expiresAt));
}

export async function requireDashboardSession() {
  if (!(await isDashboardAuthenticated())) redirect("/dashboard/login");
}

