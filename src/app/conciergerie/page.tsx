import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
import { Commitments } from "@/components/sections/Commitments";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Conciergerie & habitation",
  description:
    "Conciergerie à Paris & alentours : entretien de maisons, d'appartements et de studios par Djeli Prestige, sur devis.",
  path: "/conciergerie",
});

const spaces = [
  { n: "01", title: "Maisons" },
  { n: "02", title: "Appartements" },
  { n: "03", title: "Studios" },
];

export default function ConciergeriePage() {
  return (
    <>
      <PageHero
        image="/images/06-habitation.webp"
        alt="L'équipe Djeli Prestige intervient dans un salon contemporain lumineux"
        label="Conciergerie — Habitation"
        lines={["Votre intérieur.", <em key="2" className="font-light">Notre attention.</em>]}
        intro="Maisons, appartements et studios : Djeli Prestige prend soin de vos espaces de vie pour que vous gardiez votre temps pour l'essentiel."
        position="62% 50%"
      />

      {/* Index typographique des espaces */}
      <section aria-labelledby="espaces-title" className="bg-ivory text-ink">
        <div className="gutter container-wide py-28 lg:py-44">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel number="01" tone="muted" className="text-gold-deep">
                Les espaces
              </SectionLabel>
              <AnimatedText
                as="h2"
                id="espaces-title"
                className="display-md mt-10"
                lines={["Chaque lieu a", <em key="2" className="font-light text-gold-deep">son caractère.</em>]}
              />
            </div>
            <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.1}>
              <p className="text-[0.95rem] leading-relaxed text-ink/70">
                Que vous viviez dans une maison, un appartement ou un studio, l&apos;intervention
                est définie avec vous, selon votre espace et votre emploi du temps.
              </p>
            </Reveal>
          </div>

          <ul className="mt-20 border-t border-ink/15 lg:mt-28">
            {spaces.map((s, i) => (
              <li key={s.title} className="border-b border-ink/15">
                <Reveal className="flex items-baseline justify-between gap-6 py-8 lg:py-10" delay={i * 0.05}>
                  <span className="eyebrow w-12 text-gold-deep">{s.n}</span>
                  <span
                    className="flex-1 font-serif text-[clamp(3rem,9vw,8.5rem)] leading-none font-light"
                    style={{ paddingLeft: `${i * 9}vw` }}
                  >
                    {i === 1 ? <em className="font-light">{s.title}</em> : s.title}
                  </span>
                  <span className="eyebrow hidden text-ink/45 sm:block">Sur devis</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Grand plan photographique — recadrage serré */}
      <section aria-label="Habitation" className="bg-white text-ink">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-1">
            <div className="gutter py-24 lg:py-40 lg:pr-[4vw]">
              <SectionLabel number="02" tone="muted" className="text-gold-deep">
                L&apos;esprit Djeli Prestige
              </SectionLabel>
              <p className="display-sm mt-10 max-w-[20ch]">
                Un partenaire de confiance pour un quotidien <em>plus simple</em>.
              </p>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ink/70">
                  Une attention discrète, un travail soigné, des produits choisis avec attention.
                </p>
                <TextLink href="/airbnb" arrow="up-right" className="mt-10 text-ink">
                  Vous louez votre bien ? Locations & Airbnb
                </TextLink>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ImageReveal
              src="/images/06-habitation.webp"
              alt="Détail d'un salon contemporain entretenu, canapé clair et table en marbre"
              sizes="(min-width: 1024px) 58vw, 100vw"
              position="55% 75%"
              zoom={1.5}
              from="right"
              className="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[44rem]"
            />
          </div>
        </div>
      </section>

      <Commitments number="03" />
      <CTASection
        image="/images/06-habitation.webp"
        alt="Salon contemporain baigné de lumière au coucher du soleil"
        position="20% 40%"
        zoom={1.3}
        label="Conciergerie"
        lines={["Parlez-nous de", <em key="2" className="font-light text-gold-light">votre intérieur.</em>]}
        primary={{ label: "Demander un devis", href: "/contact?service=conciergerie" }}
      />
    </>
  );
}
