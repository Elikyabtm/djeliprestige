import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
import { SplitSection } from "@/components/sections/SplitSection";

const spaces = ["Maisons", "Appartements", "Studios"];

/** Grande respiration claire — composition hôtel / architecture. */
export function HabitationSection() {
  return (
    <SplitSection
      image="/images/06-habitation.webp"
      alt="L'équipe Djeli Prestige intervient dans un salon contemporain lumineux"
      position="60% 50%"
      className="bg-white text-ink"
      labelledBy="habitation-title"
    >
      <SectionLabel number="04" tone="muted" className="text-gold-deep">
        Habitation
      </SectionLabel>
      <AnimatedText
        as="h2"
        id="habitation-title"
        className="display-md mt-10"
        lines={["Le luxe,", "c'est aussi avoir", <em key="3" className="font-light text-gold-deep">du temps.</em>]}
      />
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
          Djeli Prestige intervient dans les maisons, les appartements et les studios, avec le
          même soin que pour chacune de ses prestations.
        </p>
        <ul className="mt-10 border-t border-ink/10">
          {spaces.map((s, i) => (
            <li key={s} className="flex items-baseline justify-between border-b border-ink/10 py-4">
              <span className="font-serif text-2xl font-light">{s}</span>
              <span className="eyebrow text-ink/40">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
        <TextLink href="/conciergerie" className="mt-10 text-ink">
          Découvrir nos services
        </TextLink>
      </Reveal>
    </SplitSection>
  );
}
