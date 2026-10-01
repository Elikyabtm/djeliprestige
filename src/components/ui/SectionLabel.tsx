"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "@/lib/motion";

type SectionLabelProps = {
  number?: string;
  children: string;
  className?: string;
  tone?: "gold" | "muted" | "light";
};

/** Petit label uppercase avec numéro et filet animé. */
export function SectionLabel({ number, children, className, tone = "gold" }: SectionLabelProps) {
  const color =
    tone === "gold" ? "text-gold" : tone === "light" ? "text-paper/80" : "text-muted-dark";
  return (
    <motion.p
      className={cn("eyebrow flex items-center gap-4", color, className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {number ? <span>{number}</span> : null}
      <motion.span
        aria-hidden
        className="block h-px w-10 origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      />
      <span>{children}</span>
    </motion.p>
  );
}
