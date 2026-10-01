"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "@/lib/motion";

type Line = ReactNode;

type AnimatedTextProps = {
  lines: Line[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Classe par ligne (indexée), ex. décalages asymétriques. */
  lineClassNames?: string[];
  delay?: number;
  /** Déclencher immédiatement (hero) plutôt qu'au scroll. */
  immediate?: boolean;
};

/**
 * Révélation ligne par ligne derrière un masque.
 * Chaque ligne glisse depuis le bas de sa propre boîte.
 */
export function AnimatedText({
  lines,
  as = "h2",
  id,
  className,
  lineClassNames,
  delay = 0,
  immediate = false,
}: AnimatedTextProps) {
  const Tag = as;
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT };

  return (
    <Tag id={id} className={className}>
      <motion.span className="block" initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn(
              "block overflow-hidden pb-[0.08em] -mb-[0.08em]",
              lineClassNames?.[i],
            )}
          >
            <motion.span
              className="block"
              variants={{
                hidden: { y: "105%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.9, ease: EASE, delay: delay + i * 0.09 },
                },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
