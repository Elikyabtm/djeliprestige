import type { ReactNode } from "react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { cn } from "@/lib/cn";

type SplitSectionProps = {
  image: string;
  alt: string;
  position?: string;
  imageSide?: "left" | "right";
  /** Classes de fond / couleur de la section. */
  className?: string;
  /** Hauteur de l'image en desktop. */
  imageClassName?: string;
  children: ReactNode;
  id?: string;
  labelledBy?: string;
};

/**
 * Composition architecturale : très grande image bord à bord (~60% de l'écran)
 * et colonne de texte respirante.
 */
export function SplitSection({
  image,
  alt,
  position,
  imageSide = "left",
  className,
  imageClassName,
  children,
  id,
  labelledBy,
}: SplitSectionProps) {
  const left = imageSide === "left";
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative", className)}>
      <div className={cn("grid items-center lg:grid-cols-12", !left && "lg:[direction:rtl]")}>
        <div className="lg:col-span-7 lg:[direction:ltr]">
          <ImageReveal
            src={image}
            alt={alt}
            position={position}
            sizes="(min-width: 1024px) 60vw, 100vw"
            from={left ? "left" : "right"}
            className={cn("aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[88svh] lg:min-h-[40rem]", imageClassName)}
          />
        </div>
        <div className="gutter py-20 lg:col-span-5 lg:px-[5vw] lg:py-32 lg:[direction:ltr]">
          {children}
        </div>
      </div>
    </section>
  );
}
