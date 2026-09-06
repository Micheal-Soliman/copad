import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const ttNorms = localFont({
  src: "../../public/TT Norms Pro v3.300/Variable/TTNormsProVariable.ttf",
  variable: "--font-tt-norms",
  display: "swap",
  weight: "100 900",
  style: "normal",
  fallback: ["Arial", "Tahoma", "sans-serif"],
});

const bukra = localFont({
  src: [
    { path: "../../public/29ltbukra- 7ROOF.COM/29ltbukralight.ttf", weight: "300", style: "normal" },
    { path: "../../public/29ltbukra- 7ROOF.COM/29ltbukraregular.ttf", weight: "400", style: "normal" },
    { path: "../../public/29ltbukra- 7ROOF.COM/29ltbukrabold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-bukra",
  display: "swap",
  fallback: ["Arial", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: { default: "COPAD Content Dashboard", template: "%s | COPAD Dashboard" },
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${ttNorms.variable} ${bukra.variable}`}><body>{children}</body></html>;
}
