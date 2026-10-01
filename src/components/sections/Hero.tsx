"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { business } from "@/config/business";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

const facts = ["Paris & alentours", "Particuliers & professionnels", "Service sur mesure"];

/**
 * Hero cinématographique : photographie 01 plein écran, texte posé
 * directement sur l'image, aucune card.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-paper"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Image
            src="/images/01-hero.webp"
            alt="Professionnel Djeli Prestige prenant soin d'une berline noire devant une villa contemporaine, à la golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[63%_50%] md:object-[50%_55%]"
          />
        </motion.div>
        {/* Dégradés : sombres derrière le texte, transparents ailleurs */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="gutter container-wide flex flex-1 flex-col justify-end pt-32 pb-8 lg:pb-10"
      >
        <motion.p
          className="eyebrow mb-7 text-gold-light lg:mb-9"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          Conciergerie <span className="mx-2 text-paper/50">•</span> Automobile{" "}
          <span className="mx-2 text-paper/50">•</span> Services
        </motion.p>

        <div className="grid items-end gap-10 lg:grid-cols-12">
          <AnimatedText
            as="h1"
            id="hero-title"
            immediate
            delay={0.55}
            className="display-xl lg:col-span-8"
            lines={[
              "L'exigence,",
              <span key="2" className="italic text-paper/95">
                dans chaque détail.
              </span>,
            ]}
            lineClassNames={["", "pl-[6vw]"]}
          />

          <motion.div
            className="max-w-sm lg:col-span-4 lg:justify-self-end lg:pb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            <p className="text-[0.95rem] leading-relaxed text-paper/80">
              Conciergerie, entretien automobile et services sur mesure pour particuliers et
              professionnels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" variant="light">
                Découvrir nos services
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-light" arrow="up-right">
                Demander un devis
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 flex flex-col gap-6 border-t border-paper/15 pt-6 lg:mt-20 lg:flex-row lg:items-center lg:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
        >
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {facts.map((fact) => (
              <li key={fact} className="eyebrow text-paper/70">
                {fact}
              </li>
            ))}
          </ul>
          <a
            href="#djeli-prestige"
            className="eyebrow group hidden items-center gap-3 text-paper/60 transition-colors hover:text-gold-light lg:inline-flex"
          >
            Scroll to discover
            <ArrowDown
              aria-hidden
              strokeWidth={1.25}
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1"
            />
          </a>
        </motion.div>
        <span className="sr-only">{business.tagline}</span>
      </motion.div>
    </section>
  );
}
