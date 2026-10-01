import { business } from "@/config/business";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";

/**
 * Section Avant / Après — masquée tant qu'aucune paire réelle n'est fournie.
 * TODO_REPLACE_WITH_REAL_CUSTOMER_PHOTOS : ajouter des paires dans
 * business.beforeAfter puis activer business.features.beforeAfter.
 */
export function BeforeAfterSection() {
  const pairs = business.beforeAfter;
  if (!business.features.beforeAfter || pairs.length === 0) return null;

  return (
    <section aria-labelledby="before-after-title" className="bg-black text-paper">
      <div className="gutter container-wide py-28 lg:py-40">
        <SectionLabel>Résultats</SectionLabel>
        <AnimatedText
          as="h2"
          id="before-after-title"
          className="display-lg mt-8"
          lines={["Avant.", <em key="2" className="font-light text-gold-light">Après.</em>]}
        />
        <div className="mt-16 space-y-20">
          {pairs.map((pair) => (
            <BeforeAfterSlider key={pair.label} {...pair} />
          ))}
        </div>
      </div>
    </section>
  );
}
