import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PricingSelector } from "@/components/pricing/PricingSelector";

type AutomotivePricingProps = {
  id?: string;
  label?: string;
};

/** Section tarifs automobile — plus fonctionnelle, fond charbon. */
export function AutomotivePricing({ id = "tarifs-automobile", label = "Tarifs automobile" }: AutomotivePricingProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-charcoal text-paper">
      <div className="gutter container-wide py-28 lg:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel>{label}</SectionLabel>
            <AnimatedText
              as="h2"
              id={`${id}-title`}
              className="display-md mt-8"
              lines={["Choisissez votre", <em key="2" className="font-light">niveau de soin.</em>]}
            />
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-[0.92rem] leading-relaxed text-paper/60">
              Cinq formules, deux gabarits. Les prix sont indiqués pour un véhicule citadin et pour
              un SUV, 4x4 ou break.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 lg:mt-20">
          <PricingSelector />
        </div>
      </div>
    </section>
  );
}
