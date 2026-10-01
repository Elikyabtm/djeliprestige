import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Conciergerie Airbnb & location courte durée",
  description:
    "Conciergerie Airbnb à Paris & alentours : préparation des espaces et entretien entre les séjours pour vos locations courte durée.",
  path: "/airbnb",
});

/**
 * Zones éditables : prestations confirmées.
 * TODO: compléter `details` avec le détail réel des prestations Airbnb
 * (linge, check-in, etc.) uniquement lorsqu'il est confirmé par Djeli Prestige.
 */
const chapters = [
  {
    n: "01",
    title: "Airbnb",
    text: "Un accompagnement pensé pour les logements proposés en location courte durée.",
    details: [] as string[],
  },
  {
    n: "02",
    title: "Préparation des espaces",
    text: "Des espaces prêts à accueillir, pour que chaque voyageur découvre un lieu impeccable.",
    details: [] as string[],
  },
  {
    n: "03",
    title: "Entretien entre les séjours",
    text: "L’entretien du logement entre deux réservations.",
    details: [] as string[],
  },
];

export default function AirbnbPage() {
  return (
    <>
      <PageHero
        image="/images/07-airbnb.webp"
        alt="Préparation soignée d'une chambre élégante face à la ville au coucher du soleil"
        label="Location courte durée"
        lines={["Chaque séjour commence", <em key="2" className="font-light">avant l&apos;arrivée.</em>]}
        intro="Pour les hôtes Airbnb et les propriétaires de locations courte durée : l'exigence d'un hôtel boutique, dans votre logement."
        position="22% 50%"
        positionDesktop="40% 50%"
      />

      <section aria-labelledby="accueil-title" className="bg-ivory text-ink">
        <div className="gutter container-wide py-28 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel number="01" tone="muted" className="text-gold-deep">
                L&apos;accueil
              </SectionLabel>
              <AnimatedText
                as="h2"
                id="accueil-title"
                className="display-lg mt-10"
                lines={["La première", "impression", <em key="3" className="font-light text-gold-deep">se prépare.</em>]}
              />
            </div>
            <div className="relative lg:col-span-5 lg:col-start-8">
              <ImageReveal
                src="/images/07-airbnb.webp"
                alt="Lit dressé avec soin, linge clair et lampe de chevet allumée"
                sizes="(min-width: 1024px) 40vw, 100vw"
                position="62% 60%"
                zoom={1.6}
                className="aspect-[4/5] rounded-[2px]"
                from="right"
              />
              <p className="eyebrow mt-4 text-ink/50">Chambre — préparation avant arrivée</p>
            </div>
          </div>

          <ol className="mt-24 border-t border-ink/15 lg:mt-36">
            {chapters.map((c) => (
              <li key={c.n} className="grid gap-6 border-b border-ink/15 py-10 md:grid-cols-12 lg:py-14">
                <span className="eyebrow text-gold-deep md:col-span-1">{c.n}</span>
                <h3 className="display-sm md:col-span-5">{c.title}</h3>
                <Reveal className="md:col-span-5 md:col-start-8">
                  <p className="text-[0.95rem] leading-relaxed text-ink/70">{c.text}</p>
                  {c.details.length > 0 ? (
                    <ul className="mt-4 space-y-1 text-sm text-ink/60">
                      {c.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="eyebrow mt-4 text-ink/45">Sur devis</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-20 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg font-serif text-3xl leading-snug font-light">
              Chaque logement est différent. Parlons du vôtre.
            </p>
            <ButtonLink href="/contact?service=airbnb" variant="dark">
              Nous parler de votre logement
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTASection
        image="/images/07-airbnb.webp"
        alt="Chambre élégante ouverte sur la ville au coucher du soleil"
        position="70% 30%"
        zoom={1.35}
        label="Locations & Airbnb"
        lines={["Vos voyageurs", <em key="2" className="font-light text-gold-light">le remarqueront.</em>]}
        primary={{ label: "Nous parler de votre logement", href: "/contact?service=airbnb" }}
      />
    </>
  );
}
