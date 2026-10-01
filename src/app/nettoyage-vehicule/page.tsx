import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { AutomotivePricing } from "@/components/pricing/AutomotivePricing";
import { OptionsSection } from "@/components/pricing/OptionsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Nettoyage automobile",
  description:
    "Nettoyage voiture intérieur et extérieur, soin, detailing et protection à Paris & alentours. Cinq formules de 25 € à 150 €, options et devis pour flottes.",
  path: "/nettoyage-vehicule",
  image: "/og-image.jpg",
});

/** Les quatre piliers, construits uniquement à partir des prestations confirmées. */
const pillars = [
  {
    n: "01",
    title: "Intérieur",
    items: ["Aspiration habitacle", "Nettoyage des plastiques", "Vitres intérieures", "Shampoing sièges / tapis", "Désinfection habitacle / ozone"],
  },
  {
    n: "02",
    title: "Extérieur",
    items: ["Lavage extérieur", "Lavage haute brillance", "Jantes & pneus", "Vitres extérieures", "Nettoyage moteur"],
  },
  {
    n: "03",
    title: "Soin",
    items: ["Traitement tableau de bord", "Traitement cuir / plastiques", "Polissage carrosserie", "Rénovation de phares"],
  },
  {
    n: "04",
    title: "Protection",
    items: ["Soin carrosserie / protection", "Protection longue durée anti-UV"],
  },
];

export default function AutomobilePage() {
  return (
    <>
      <PageHero
        image="/images/02-exterieur.webp"
        alt="Lavage extérieur à la mousse active d'une berline noire, au crépuscule"
        label="Automobile — Djeli Prestige"
        lines={["Le soin automobile,", <em key="2" className="font-light">selon Djeli Prestige.</em>]}
        intro="Intérieur, extérieur, soin et protection : un entretien minutieux, de la formule express à l'intégrale."
        position="72% 50%"
        positionDesktop="45% 50%"
        aside={
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#tarifs-automobile" variant="light" arrow="none">
              Voir les formules
            </ButtonLink>
            <ButtonLink href="/contact?service=automobile" variant="ghost-light" arrow="up-right">
              Devis
            </ButtonLink>
          </div>
        }
      />

      {/* Composition magazine : extérieur / intérieur */}
      <section aria-labelledby="savoir-faire-title" className="overflow-hidden bg-black text-paper">
        <div className="gutter container-wide py-28 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel number="01">Savoir-faire</SectionLabel>
              <AnimatedText
                as="h2"
                id="savoir-faire-title"
                className="display-md mt-10"
                lines={["Chaque surface", "mérite son", <em key="3" className="font-light text-gold-light">propre geste.</em>]}
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-sm text-[0.95rem] leading-relaxed text-paper/65">
                  Selleries, plastiques, vitres, carrosserie, jantes : chaque élément de votre
                  véhicule est traité avec la méthode qui lui convient.
                </p>
              </Reveal>
            </div>
            <div className="relative lg:col-span-7">
              <ImageReveal
                src="/images/03-interieur.webp"
                alt="Nettoyage vapeur d'un siège en cuir dans l'habitacle d'une berline"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[4/5] rounded-[2px] sm:aspect-[4/3]"
                position="35% 50%"
                from="right"
              />
              <div className="absolute -bottom-16 -left-4 w-[46%] md:-left-16 lg:-bottom-24 lg:-left-[10vw] lg:w-[42%]">
                <ImageReveal
                  src="/images/02-exterieur.webp"
                  alt="Jante et carrosserie recouvertes de mousse pendant le lavage"
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="aspect-square rounded-[2px] ring-[10px] ring-black"
                  position="38% 70%"
                  zoom={1.5}
                  delay={0.2}
                />
              </div>
            </div>
          </div>

          <ul className="mt-36 grid border-t border-paper/10 sm:grid-cols-2 lg:mt-48 lg:grid-cols-4">
            {pillars.map((p) => (
              <li key={p.title} className="border-b border-paper/10 py-10 sm:pr-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <Reveal>
                  <p className="eyebrow text-gold">{p.n}</p>
                  <h3 className="display-sm mt-5">{p.title}</h3>
                  <ul className="mt-6 space-y-2.5 text-sm text-paper/65">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AutomotivePricing label="02 — Formules" />
      <OptionsSection />
      <BeforeAfterSection />

      {/* Passerelle vers les flottes */}
      <section className="bg-white text-ink">
        <div className="gutter container-wide grid gap-10 py-24 md:grid-cols-12 md:items-end lg:py-32">
          <div className="md:col-span-7">
            <SectionLabel tone="muted" className="text-gold-deep">
              Flottes & véhicules professionnels
            </SectionLabel>
            <p className="display-sm mt-8 max-w-[22ch]">
              Concessionnaires, flottes, ambulances : des prestations <em>sur devis</em>.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
            <TextLink href="/professionnels" className="text-ink">
              Espace professionnels
            </TextLink>
          </div>
        </div>
      </section>

      <CTASection
        label="Automobile"
        lines={["Votre véhicule,", <em key="2" className="font-light text-gold-light">entre de bonnes mains.</em>]}
        text="Choisissez votre formule ou décrivez-nous votre besoin : nous revenons vers vous avec une proposition adaptée."
        primary={{ label: "Demander un devis", href: "/contact?service=automobile" }}
      />
    </>
  );
}
