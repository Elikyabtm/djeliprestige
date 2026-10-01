import type { ReactNode } from "react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";

type CTASectionProps = {
  image?: string;
  alt?: string;
  /** Cadrage différent de l'usage principal de la photo. */
  position?: string;
  /** Zoom de recadrage (ex. 1.35) pour un plan plus serré. */
  zoom?: number;
  label?: string;
  lines?: ReactNode[];
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
};

/** CTA final photographique presque plein écran. */
export function CTASection({
  image = "/images/01-hero.webp",
  alt = "Détail d'une berline noire entretenue par Djeli Prestige au coucher du soleil",
  position = "78% 45%",
  zoom = 1.45,
  label = "Djeli Prestige",
  lines = ["Et si on s'occupait", <em key="2" className="font-light text-gold-light">du reste ?</em>],
  text = "Parlez-nous de votre besoin et obtenez une proposition adaptée.",
  primary = { label: "Demander un devis", href: "/contact" },
  secondary = { label: "Nous contacter", href: "/contact#coordonnees" },
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-black text-paper">
      <div className="absolute inset-0 -z-10">
        <ImageReveal
          src={image}
          alt={alt}
          sizes="100vw"
          position={position}
          className="h-full w-full"
          zoom={zoom}
          parallax={6}
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <div className="gutter container-wide flex min-h-[92svh] flex-col justify-center py-36">
        <SectionLabel tone="light">{label}</SectionLabel>
        <AnimatedText as="h2" id="cta-title" className="display-xl mt-10 max-w-[14ch]" lines={lines} />
        <Reveal className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between" delay={0.15}>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-paper/80">{text}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="light">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="ghost-light" arrow="up-right">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
