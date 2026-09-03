import Image from "next/image";
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
      className="group relative inline-flex h-10 w-[7.75rem] shrink-0 overflow-hidden rounded-lg focus:outline-none sm:h-11 sm:w-[8.75rem] xl:h-12 xl:w-[9.5rem]"
      href={`/${locale}`}
      aria-label="COPAD Pharma Egypt home"
      onClick={onClick}
    >
      <Image
        src="/logo.png"
        alt="COPAD Pharma"
        width={4500}
        height={4500}
        priority
        unoptimized
        sizes="(max-width: 640px) 124px, (max-width: 1279px) 140px, 152px"
        className={`pointer-events-none absolute top-1/2 left-1/2 h-[10.4rem] w-[10.4rem] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain transition duration-500 group-hover:scale-[1.025] sm:h-[11.6rem] sm:w-[11.6rem] xl:h-[12.5rem] xl:w-[12.5rem] ${inverted ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
