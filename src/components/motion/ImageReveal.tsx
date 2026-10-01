"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "@/lib/motion";

type ImageRevealProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** object-position CSS, ex. "60% 50%". */
  position?: string;
  priority?: boolean;
  /** Amplitude de la parallaxe en %, 0 pour la désactiver. */
  parallax?: number;
  /** Direction d'ouverture du clip-path. */
  from?: "bottom" | "left" | "right" | "top";
  delay?: number;
  /** Zoom très léger au survol (scale 1 → 1.03). */
  hoverZoom?: boolean;
  /** Recadrage serré : agrandit l'image autour de `position` (ex. 1.4). */
  zoom?: number;
};

const CLIP_FROM: Record<NonNullable<ImageRevealProps["from"]>, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Photographie éditoriale : révélation clip-path + parallaxe légère.
 * Le conteneur fixe la taille (ratio / hauteur) via className.
 */
export function ImageReveal({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  position = "50% 50%",
  priority = false,
  parallax = 6,
  from = "bottom",
  delay = 0,
  hoverZoom = false,
  zoom,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const useParallax = parallax > 0 && !reduce;

  return (
    <motion.div
      ref={ref}
      className={cn("group relative overflow-hidden", className)}
      initial={reduce ? false : { clipPath: CLIP_FROM[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        style={
          useParallax
            ? { y, top: `-${parallax}%`, bottom: `-${parallax}%`, height: "auto" }
            : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            hoverZoom &&
              "transition-transform duration-[1200ms] ease-[var(--ease-prestige)] group-hover:scale-[1.03]",
            imageClassName,
          )}
          style={{
            objectPosition: position,
            ...(zoom ? { transform: `scale(${zoom})`, transformOrigin: position } : {}),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
