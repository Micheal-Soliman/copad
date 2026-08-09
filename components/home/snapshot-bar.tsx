"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function SnapshotBar({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const data = siteCopy[locale].home.snapshot;
  const pulseLeft = locale === "ar" ? ["90%", "70%", "50%", "30%", "10%"] : ["10%", "30%", "50%", "70%", "90%"];
  const pulseStart = locale === "ar" ? "90%" : "10%";

  return (
    <section className="relative z-10 overflow-hidden px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-10">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative hidden h-64 lg:block">
          <motion.div aria-hidden="true" className="absolute inset-0" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.45 }}>
            {[0, 1, 2, 3].map((segment) => (
              <span
                key={segment}
                className={`absolute h-px w-[20.3%] origin-left bg-linear-to-r from-copad-deep/10 via-copad-green/42 to-copad-deep/10 ${segment % 2 === 0 ? "top-[calc(50%_-_1.5rem)] rotate-[9.5deg]" : "top-[calc(50%_+_1.5rem)] -rotate-[9.5deg]"}`}
                style={{ left: `${10 + segment * 20}%` }}
              />
            ))}
            <motion.span
              className="absolute top-1/2 z-20 size-0"
              style={reduceMotion ? { left: pulseStart, y: -24 } : undefined}
              variants={reduceMotion ? undefined : {
                hidden: { opacity: 0, left: pulseStart, y: -24 },
                visible: { opacity: 1, left: pulseLeft, y: [-24, 24, -24, 24, -24], transition: { duration: 7, delay: 0.3, repeat: Infinity, repeatType: "reverse", ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] } },
              }}
            >
              <span className="absolute -top-1.5 -left-1.5 size-3 rounded-full bg-copad-green shadow-[0_0_18px_5px_rgba(16,159,131,.45)]">
                {!reduceMotion && <span className="absolute inset-0 animate-ping rounded-full bg-copad-green/75" />}
              </span>
            </motion.span>
          </motion.div>

          <motion.ol variants={reduceMotion ? undefined : list} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="grid h-full grid-cols-5">
            {data.map((entry, index) => {
              const above = index % 2 === 0;
              return (
                <motion.li variants={reduceMotion ? undefined : item} key={entry} className="group relative text-center">
                  <div className={`absolute inset-x-3 transition-transform duration-300 group-hover:-translate-y-1 ${above ? "bottom-[calc(50%_+_3rem)]" : "top-[calc(50%_+_3rem)] group-hover:translate-y-1"}`}>
                    <span className="text-[9px] font-black tracking-[0.2em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mx-auto mt-3 max-w-52 text-sm leading-6 font-bold text-copad-deep/68 transition-colors duration-300 group-hover:text-copad-deep xl:text-base">{entry}</p>
                  </div>

                  <span aria-hidden="true" className={`absolute left-1/2 grid size-5 -translate-x-1/2 place-items-center rounded-full border-[1.5px] border-copad-green/65 bg-copad-white shadow-[0_0_0_4px_rgba(249,249,249,.95)] ${above ? "top-[calc(50%_-_34px)]" : "top-[calc(50%_+_14px)]"}`}>
                    <span className="size-2 rounded-full bg-copad-green shadow-[0_0_8px_rgba(16,159,131,.32)]" />
                  </span>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <div className="relative lg:hidden">
          <motion.div aria-hidden="true" className="absolute top-[.875rem] bottom-[5.125rem] start-[9px] w-px bg-copad-deep/18" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <motion.span className="absolute start-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-copad-white bg-copad-green shadow-[0_0_18px_6px_rgba(16,159,131,.52)]" style={reduceMotion ? { top: "0%" } : undefined} variants={reduceMotion ? undefined : { hidden: { opacity: 0, top: "0%" }, visible: { opacity: 1, top: ["0%", "25%", "50%", "75%", "100%"], transition: { duration: 7, delay: 0.3, repeat: Infinity, repeatType: "reverse", ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] } } }}>
              {!reduceMotion && <span className="absolute -inset-2 animate-ping rounded-full border border-copad-green/35" />}
            </motion.span>
          </motion.div>
          <motion.ol variants={reduceMotion ? undefined : list} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid auto-rows-[6rem]">
            {data.map((entry, index) => (
              <motion.li variants={reduceMotion ? undefined : item} key={entry} className="grid grid-cols-[1.25rem_1fr] gap-5">
                <span className="relative mt-1 grid size-5 place-items-center rounded-full border-[1.5px] border-copad-green/65 bg-copad-white shadow-[0_0_0_4px_rgba(249,249,249,.95)]"><span className="size-2 rounded-full bg-copad-green shadow-[0_0_8px_rgba(16,159,131,.32)]" /></span>
                <div>
                  <span className="text-[9px] font-black tracking-[0.18em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm leading-6 font-bold text-copad-deep/68">{entry}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
