"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  image: string;
  alt: string;
  label: string;
  lines: ReactNode[];
  intro?: string;
  /** object-position mobile puis desktop. */
  position?: string;
  positionDesktop?: string;
  /** Hauteur : "full" (100svh) ou "tall" (86svh). */
  height?: "full" | "tall";
  aside?: ReactNode;
};

/** Hero photographique des pages secondaires. */
export function PageHero({
  image,
  alt,
  label,
  lines,
  intro,
  position = "50% 50%",
  positionDesktop,
  height = "full",
  aside,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="page-title"
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-black text-paper",
        height === "full" ? "min-h-[100svh]" : "min-h-[86svh]",
      )}
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover [object-position:var(--pos)] md:[object-position:var(--pos-md)]"
            style={{ ["--pos" as string]: position, ["--pos-md" as string]: positionDesktop ?? position }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
      </motion.div>

      <div className="gutter container-wide flex flex-1 flex-col justify-end pt-36 pb-14 lg:pb-20">
        <motion.p
          className="eyebrow text-gold-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          {label}
        </motion.p>
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
          <AnimatedText as="h1" id="page-title" immediate delay={0.45} className="display-xl lg:col-span-8" lines={lines} />
          {intro || aside ? (
            <motion.div
              className="max-w-sm lg:col-span-4 lg:justify-self-end lg:pb-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            >
              {intro ? <p className="text-[0.95rem] leading-relaxed text-paper/80">{intro}</p> : null}
              {aside}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
