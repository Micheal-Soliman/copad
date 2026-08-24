"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealHeadingProps = {
  text: string;
  className?: string;
  timeline?: boolean;
  lines?: string[];
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.026, delayChildren: 0.02 } },
};

const word: Variants = {
  hidden: { opacity: 0.16, y: "105%", rotate: 1.5 },
  visible: { opacity: 1, y: "0%", rotate: 0, transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] } },
};

export function RevealHeading({ text, className = "", timeline = false, lines }: RevealHeadingProps) {
  const reduceMotion = useReducedMotion();
  const headingLines = lines?.length ? lines : [text];

  return (
    <motion.h2
      key={timeline ? "timeline-heading" : "entrance-heading"}
      aria-label={text}
      className={className}
      variants={container}
      initial={reduceMotion || timeline ? false : "hidden"}
      animate={timeline ? "visible" : undefined}
      whileInView={timeline ? undefined : "visible"}
      viewport={{ once: true, amount: 0.38 }}
    >
      <span aria-hidden="true">
        {headingLines.map((line, lineIndex) => {
          const entries = line.trim().split(/\s+/);
          return (
            <span key={`${line}-${lineIndex}`} className={lines ? "block whitespace-nowrap" : undefined}>
              {entries.map((entry, index) => (
                <span key={`${entry}-${lineIndex}-${index}`} className="inline-block overflow-hidden align-bottom whitespace-nowrap">
                  <motion.span className="inline-block will-change-transform" variants={word}>
                    {entry}
                  </motion.span>
                  {index < entries.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </motion.h2>
  );
}
