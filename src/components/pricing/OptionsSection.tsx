import { business } from "@/config/business";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { OptionItem } from "@/components/pricing/OptionItem";

/** Options & suppléments — section courte, ligne éditoriale horizontale. */
export function OptionsSection() {
  return (
    <section aria-labelledby="options-title" className="bg-ivory text-ink">
      <div className="gutter container-wide py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel tone="muted" className="text-gold-deep">
              Options
            </SectionLabel>
            <AnimatedText
              as="h2"
              id="options-title"
              className="display-md mt-8"
              lines={["Allez encore", <em key="2" className="font-light">plus loin.</em>]}
            />
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-[0.92rem] leading-relaxed text-ink/65">
              Des suppléments à ajouter à la formule de votre choix.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 border-t border-ink/10 lg:mt-20 lg:border-b lg:py-10" delay={0.05}>
          <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
            {business.carOptions.map((option, i) => (
              <OptionItem key={option.id} option={option} index={i} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
