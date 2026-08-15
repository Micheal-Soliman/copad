import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"] as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLocalizedPath = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (isLocalizedPath) return;

  const preferredLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const locale = preferredLanguage.startsWith("ar") ? "ar" : "en";
  const url = request.nextUrl.clone();

  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon|apple-icon|images/).*)"],
};
