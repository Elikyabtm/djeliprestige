import { ImageReveal } from "@/components/motion/ImageReveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";

/** Section presque entièrement photographique — esprit hôtel boutique. */
export function AirbnbSection() {
  return (
    <section aria-labelledby="airbnb-title" className="relative isolate min-h-[100svh] overflow-hidden bg-black text-paper">
      <ImageReveal
        src="/images/07-airbnb.webp"
        alt="Préparation soignée d'une chambre élégante face à la ville au coucher du soleil"
        sizes="100vw"
        position="38% 50%"
        className="absolute! inset-0 -z-10"
        parallax={8}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="gutter container-wide flex min-h-[100svh] flex-col justify-end pt-40 pb-14 lg:pb-20">
        <SectionLabel tone="light">Location courte durée</SectionLabel>
        <AnimatedText
          as="h2"
          id="airbnb-title"
          className="display-lg mt-8"
          lines={["Chaque séjour commence", <em key="2" className="font-light">avant l&apos;arrivée du voyageur.</em>]}
        />

        <div className="mt-14 grid gap-10 border-t border-paper/15 pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-[0.95rem] leading-relaxed text-paper/80">
              Pour les logements Airbnb et les locations courte durée : préparation des espaces et
              entretien entre les séjours, pour accueillir chaque voyageur dans un lieu impeccable.
            </p>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:justify-self-end" delay={0.1}>
            <ul className="eyebrow space-y-3 text-paper/65">
              <li>Airbnb</li>
              <li>Préparation des espaces</li>
              <li>Entretien entre les séjours</li>
            </ul>
            <TextLink href="/airbnb" arrow="up-right" className="mt-8 text-paper">
              Découvrir
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
