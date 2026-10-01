import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PricingSelector } from "@/components/pricing/PricingSelector";
import { OptionsSection } from "@/components/pricing/OptionsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Tarifs",
  description:
    "Tarifs nettoyage automobile Djeli Prestige : formules Express, Standard, Premium, Luxe et Intégrale, options et suppléments. Habitation et professionnels sur devis.",
  path: "/tarifs",
});

const onQuote = business.services.filter((s) => s.id !== "automobile");

export default function TarifsPage() {
  return (
    <>
      {/* Hero typographique + insert photographique */}
      <section aria-labelledby="page-title" className="relative overflow-hidden bg-black text-paper">
        <div className="gutter container-wide grid min-h-[86svh] items-end gap-12 pt-36 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-8">
            <p className="eyebrow text-gold-light">Tarifs — Djeli Prestige</p>
            <AnimatedText
              as="h1"
              id="page-title"
              immediate
              delay={0.3}
              className="display-xl mt-8"
              lines={["Une grille claire.", <em key="2" className="font-light text-paper/90">Un soin précis.</em>]}
            />
            <Reveal className="mt-10 max-w-md" delay={0.6}>
              <p className="text-[0.95rem] leading-relaxed text-paper/70">
                Cinq formules automobiles à prix fixe, des options à la carte. Pour l&apos;habitation,
                les locations et les professionnels : une proposition sur devis.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <ImageReveal
              src="/images/03-interieur.webp"
              alt="Soin d'une sellerie en cuir noir"
              sizes="(min-width: 1024px) 24vw, 60vw"
              position="30% 55%"
              className="aspect-[3/4] w-3/5 rounded-[2px] lg:w-full"
              priority
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="formules-title" className="bg-charcoal text-paper">
        <div className="gutter container-wide py-24 lg:py-32">
          <SectionLabel number="01">Automobile</SectionLabel>
          <AnimatedText
            as="h2"
            id="formules-title"
            className="display-md mt-8"
            lines={["Choisissez votre", <em key="2" className="font-light">niveau de soin.</em>]}
          />
          <div className="mt-16">
            <PricingSelector />
          </div>
        </div>
      </section>

      <OptionsSection />

      <section aria-labelledby="devis-title" className="bg-white text-ink">
        <div className="gutter container-wide py-28 lg:py-40">
          <SectionLabel number="03" tone="muted" className="text-gold-deep">
            Sur devis
          </SectionLabel>
          <AnimatedText
            as="h2"
            id="devis-title"
            className="display-md mt-8"
            lines={["Une proposition", <em key="2" className="font-light text-gold-deep">sur mesure.</em>]}
          />
          <ul className="mt-16 border-t border-ink/15 lg:mt-24">
            {onQuote.map((s) => (
              <li key={s.id} className="border-b border-ink/15">
                <Link
                  href={s.href}
                  className="group grid items-baseline gap-4 py-8 md:grid-cols-12 lg:py-10"
                >
                  <span className="eyebrow text-gold-deep md:col-span-1">{s.number}</span>
                  <span className="font-serif text-[clamp(2.2rem,4.5vw,4rem)] leading-none font-light transition-colors duration-500 group-hover:text-gold-deep md:col-span-6">
                    {s.title}
                  </span>
                  <span className="text-sm text-ink/60 md:col-span-3">{s.items.join(" · ")}</span>
                  <span className="eyebrow flex items-center gap-3 md:col-span-2 md:justify-self-end">
                    Sur devis
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
