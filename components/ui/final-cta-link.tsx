"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type FinalCtaTone = "green" | "deep" | "light";

const toneStyles: Record<FinalCtaTone, {
  surface: string;
  text: string;
  icon: string;
  glow: string;
}> = {
  green: {
    surface: "bg-copad-green",
    text: "text-white",
    icon: "bg-white text-copad-deep",
    glow: "from-transparent via-white/90 to-transparent",
  },
  deep: {
    surface: "bg-copad-deep",
    text: "text-white",
    icon: "bg-copad-green text-white",
    glow: "from-transparent via-copad-green to-transparent",
  },
  light: {
    surface: "bg-white",
    text: "text-copad-deep",
    icon: "bg-copad-deep text-white",
    glow: "from-transparent via-copad-green to-transparent",
  },
};

export function FinalCtaLink({
  href,
  children,
  tone = "green",
  className = "",
  disabled = false,
}: {
  href: string;
  children: ReactNode;
  tone?: FinalCtaTone;
  className?: string;
  disabled?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const styles = toneStyles[tone];

  return (
    <motion.div
      className={`w-full sm:w-fit ${className}`}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.975 }}
      transition={{ type: "spring", stiffness: 330, damping: 23 }}
    >
      <Link
        href={disabled ? "#" : href}
        onClick={disabled ? (event) => event.preventDefault() : undefined}
        aria-disabled={disabled || undefined}
        className={`group relative isolate grid min-h-14 w-full min-w-60 grid-cols-[1fr_2.75rem] items-center gap-4 overflow-hidden rounded-full p-px ps-7 text-xs font-black shadow-[0_18px_45px_rgba(4,42,38,.2)] outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-copad-green focus-visible:ring-offset-4 sm:w-auto ${disabled ? "cursor-default" : "hover:shadow-[0_25px_60px_rgba(4,42,38,.3)]"} ${styles.text}`}
      >
        <span
          aria-hidden="true"
          className={`absolute -inset-[130%] -z-20 bg-linear-to-r ${styles.glow} motion-safe:animate-[spin_5s_linear_infinite]`}
        />
        <span aria-hidden="true" className={`absolute inset-px -z-10 rounded-full ${styles.surface}`} />
        <span
          aria-hidden="true"
          className="absolute inset-y-px start-px -z-10 w-24 -translate-x-[160%] skew-x-[-18deg] bg-linear-to-r from-transparent via-white/22 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[360%] rtl:translate-x-[160%] rtl:group-hover:-translate-x-[360%]"
        />
        <span className="relative py-3.5 leading-tight">{children}</span>
        <span className={`relative me-1 flex size-11 items-center justify-center overflow-hidden rounded-full ${styles.icon}`}>
          <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-copad-sand transition-transform duration-500 group-hover:scale-y-100" />
          <ArrowRightIcon
            weight="bold"
            className="relative size-4 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
