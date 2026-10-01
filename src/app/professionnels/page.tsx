import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProfessionalsBlock } from "@/components/sections/ProfessionalsBlock";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/config/business";

export const metadata = pageMetadata({
  title: "Services aux professionnels",
  description:
    "Nettoyage de bureaux et locaux professionnels, flottes automobiles, concessionnaires et ambulances à Paris & alentours. Prestations sur devis.",
  path: "/professionnels",
});

const proItems = business.services.find((s) => s.id === "professionnels")?.items ?? [];

export default function ProfessionnelsPage() {
  return (
    <>
      <PageHero
        image="/images/05-flotte.webp"
        alt="Entretien simultané de plusieurs véhicules professionnels noirs"
        label="Professionnels"
        lines={["Votre activité.", <em key="2" className="font-light text-gold-light">Notre exigence.</em>]}
        intro="Flottes, concessionnaires, ambulances, bureaux et locaux : des prestations adaptées aux besoins des professionnels, sur devis."
        position="68% 50%"
      />

      <section aria-labelledby="pro-intro-title" className="bg-charcoal text-paper">
        <div className="gutter container-wide py-28 lg:py-40">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel number="01">Approche</SectionLabel>
              <AnimatedText
                as="h2"
                id="pro-intro-title"
                className="display-md mt-10"
                lines={["Une exigence", <em key="2" className="font-light text-gold-light">à votre échelle.</em>]}
              />
            </div>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
              <p className="text-[0.95rem] leading-relaxed text-paper/65">
                Djeli Prestige propose des prestations adaptées aux besoins des professionnels, pour
                vos véhicules comme pour vos espaces de travail.
              </p>
              <ul className="mt-10 grid grid-cols-2 border-t border-paper/10">
                {proItems.map((item) => (
                  <li key={item} className="border-b border-paper/10 py-4 text-sm text-paper/75">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-black pt-28 lg:pt-40">
        <ProfessionalsBlock showIntro={false} />
      </div>

      <CTASection
        image="/images/08-bureaux.webp"
        alt="Bureaux contemporains face à la ville au coucher du soleil"
        position="15% 40%"
        zoom={1.35}
        label="Professionnels"
        lines={["Parlons de", <em key="2" className="font-light text-gold-light">votre activité.</em>]}
        text="Décrivez-nous vos besoins : véhicules, locaux, fréquence d'intervention. Nous revenons vers vous avec une proposition sur devis."
        primary={{ label: "Demander une offre professionnelle", href: "/contact?profil=professionnel" }}
      />
    </>
  );
}
