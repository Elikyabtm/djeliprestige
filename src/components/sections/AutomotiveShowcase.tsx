"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";

const pillars = ["Intérieur", "Extérieur", "Soin", "Protection"];

type AutomotiveShowcaseProps = {
  number?: string;
  showCta?: boolean;
};

/**
 * Retour brutal au noir. L'image extérieure s'ouvre au scroll
 * (léger scale), l'image intérieure est un insert décalé façon magazine auto.
 */
export function AutomotiveShowcase({ number = "03", showCta = true }: AutomotiveShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, 0]);

  return (
    <section aria-labelledby="auto-title" className="relative overflow-hidden bg-black text-paper">
      <div className="gutter container-wide pt-32 lg:pt-48">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <SectionLabel number={number}>Automobile</SectionLabel>
            <AnimatedText
              as="h2"
              id="auto-title"
              className="display-lg mt-10"
              lines={[
                "Votre véhicule mérite",
                <span key="2">
                  plus qu&apos;un simple <em className="font-light text-gold-light">nettoyage.</em>
                </span>,
              ]}
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="relative mt-20 lg:mt-28">
        {/* Image principale — extérieur, presque plein écran */}
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-[68svh] overflow-hidden md:h-[82svh] lg:mr-[8vw]"
        >
          <Image
            src="/images/02-exterieur.webp"
            alt="Lavage extérieur à la mousse active d'une berline noire, au crépuscule"
            fill
            sizes="(min-width: 1024px) 92vw, 100vw"
            className="object-cover object-[38%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="eyebrow absolute bottom-10 left-10 hidden text-paper/70 md:block">
            Extérieur — mousse active & haute pression
          </p>
        </motion.div>

      </div>

      <div className="gutter container-wide pb-32 lg:pb-44">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Insert — intérieur, plus petit et décalé, chevauche légèrement l'image principale */}
          <div className="relative z-10 -mt-20 ml-auto w-[62%] sm:w-[44%] md:-mt-32 lg:order-2 lg:col-span-4 lg:col-start-9 lg:-mt-40 lg:w-full">
            <ImageReveal
              src="/images/03-interieur.webp"
              alt="Nettoyage vapeur d'un siège en cuir dans l'habitacle d'une berline"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 62vw"
              className="aspect-[4/5] rounded-[2px] ring-[10px] ring-black"
              position="30% 50%"
              parallax={4}
            />
            <p className="eyebrow mt-4 text-paper/50">Intérieur — soin des selleries</p>
          </div>

          <div className="lg:order-1 lg:col-span-6 lg:pt-20">
            <Reveal>
              <ul className="grid grid-cols-2 border-t border-paper/10 sm:grid-cols-4">
                {pillars.map((p, i) => (
                  <li
                    key={p}
                    className="eyebrow flex items-center gap-3 border-b border-paper/10 py-5 pr-4 text-paper/60"
                  >
                    <span className="text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            {showCta ? (
              <Reveal className="mt-14" delay={0.1}>
                <p className="max-w-md text-[0.95rem] leading-relaxed text-paper/70">
                  De la formule express à l&apos;intégrale : intérieur, extérieur, soin et
                  protection longue durée, selon le niveau d&apos;attention que vous souhaitez.
                </p>
                <TextLink href="/nettoyage-vehicule" className="mt-8 text-paper">
                  Voir les prestations automobiles
                </TextLink>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
