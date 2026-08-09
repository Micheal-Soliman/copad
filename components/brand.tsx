import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Brand({
  locale,
  inverted = false,
  onClick,
}: {
  locale: Locale;
  inverted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      className="group inline-flex rounded-lg focus:outline-none"
      href={`/${locale}`}
      aria-label="COPAD Pharma Egypt home"
      onClick={onClick}
    >
      <strong
        className={`text-[1.65rem] leading-none font-black tracking-[-0.055em] transition-all duration-300 group-hover:tracking-[-0.025em] ${inverted ? "text-white" : "text-copad-deep"}`}
      >
        COPAD
      </strong>
    </Link>
  );
}
