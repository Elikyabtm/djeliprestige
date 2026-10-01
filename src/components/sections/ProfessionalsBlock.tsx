import { business } from "@/config/business";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { ProfessionalSection } from "@/components/sections/ProfessionalSection";

const LAYOUTS = ["image-left", "image-right", "panorama"] as const;

type ProfessionalsBlockProps = {
  number?: string;
  showIntro?: boolean;
};

/** Section sombre longue : trois chapitres photographiques. */
export function ProfessionalsBlock({ number = "05", showIntro = true }: ProfessionalsBlockProps) {
  return (
    <section aria-labelledby="pro-title" className="bg-black text-paper">
      {showIntro ? (
        <div className="gutter container-wide pt-32 pb-24 lg:pt-48 lg:pb-36">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionLabel number={number}>Professionnels</SectionLabel>
              <AnimatedText
                as="h2"
                id="pro-title"
                className="display-lg mt-10"
                lines={["Votre activité.", <em key="2" className="font-light text-gold-light">Notre exigence.</em>]}
              />
            </div>
            <Reveal className="self-end lg:col-span-3 lg:col-start-10" delay={0.1}>
              <p className="text-[0.95rem] leading-relaxed text-paper/65">
                Djeli Prestige propose également des prestations adaptées aux besoins des
                professionnels.
              </p>
            </Reveal>
          </div>
        </div>
      ) : (
        <h2 id="pro-title" className="sr-only">
          Nos univers professionnels
        </h2>
      )}

      <div className="space-y-28 lg:space-y-48">
        {business.professionalChapters.map((chapter, i) => (
          <ProfessionalSection key={chapter.id} chapter={chapter} layout={LAYOUTS[i % LAYOUTS.length]} />
        ))}
      </div>

      <div className="gutter container-wide flex flex-col items-start gap-8 py-28 md:flex-row md:items-center md:justify-between lg:py-36">
        <p className="max-w-xl font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-light text-paper/85">
          Chaque intervention professionnelle fait l&apos;objet d&apos;une proposition{" "}
          <em className="text-gold-light">sur devis</em>.
        </p>
        <ButtonLink href="/contact?profil=professionnel" variant="light">
          Demander une offre professionnelle
        </ButtonLink>
      </div>
    </section>
  );
}
