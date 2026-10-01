"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Section campagne de marque : typographie géante qui dérive très
 * légèrement au scroll, insert photographique automobile.
 */
export function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const amp = reduce ? 0 : 1;
  const x1 = useTransform(scrollYProgress, [0, 1], [`${6 * amp}vw`, `${-6 * amp}vw`]);
  const x2 = useTransform(scrollYProgress, [0, 1], [`${-3 * amp}vw`, `${3 * amp}vw`]);
  const x3 = useTransform(scrollYProgress, [0, 1], [`${4 * amp}vw`, `${-4 * amp}vw`]);
  const imgY = useTransform(scrollYProgress, [0, 1], [`${8 * amp}%`, `${-8 * amp}%`]);

  return (
    <section
      ref={ref}
      aria-label="Prestige is in the details"
      className="relative overflow-hidden bg-black py-36 text-paper lg:py-56"
    >
      <p className="sr-only">Prestige is in the details.</p>
      <div aria-hidden className="relative">
        <motion.p
          style={{ x: x1 }}
          className="font-sans text-[clamp(4.5rem,21vw,22rem)] leading-[0.82] font-extralight tracking-[-0.04em] whitespace-nowrap text-paper/80 outline-text"
        >
          PRESTIGE
        </motion.p>

        <div className="gutter relative mt-6 flex items-center gap-[4vw] lg:mt-2">
          <motion.p
            style={{ x: x2 }}
            className="shrink-0 font-serif text-[clamp(3.5rem,13vw,13rem)] leading-none font-light italic"
          >
            is in
          </motion.p>
          <motion.div
            style={{ y: imgY }}
            className="relative aspect-[4/3] w-[38vw] max-w-[30rem] shrink-0 overflow-hidden rounded-[2px] md:w-[26vw]"
          >
            <Image
              src="/images/02-exterieur.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 26vw, 38vw"
              className="object-cover object-[30%_60%]"
            />
          </motion.div>
          <p className="eyebrow hidden max-w-[12rem] text-paper/50 xl:block">
            Djeli Prestige — conciergerie & services premium
          </p>
        </div>

        <motion.p
          style={{ x: x3 }}
          className="mt-6 pl-[8vw] font-serif text-[clamp(3.5rem,14vw,15rem)] leading-[0.9] font-light whitespace-nowrap lg:pl-[18vw]"
        >
          the details<span className="text-gold">.</span>
        </motion.p>
      </div>
    </section>
  );
}
