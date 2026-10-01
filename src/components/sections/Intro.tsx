import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";

/** Changement radical : ivoire, respiration, page de magazine. */
export function Intro() {
  return (
    <section
      id="djeli-prestige"
      aria-labelledby="intro-title"
      className="relative bg-ivory text-ink"
    >
      <div className="gutter container-wide py-32 md:py-44 lg:py-56">
        <SectionLabel number="01" tone="muted" className="text-gold-deep">
          Djeli Prestige
        </SectionLabel>

        <AnimatedText
          as="h2"
          className="display-lg mt-14 lg:mt-20"
          lines={[
            <span key="1" id="intro-title">
              Votre temps est précieux.
            </span>,
            <span key="2">
              Nous prenons soin <em className="font-light text-gold-deep">du reste.</em>
            </span>,
          ]}
          lineClassNames={["", "pl-[8vw] md:pl-[18vw] lg:pl-[26vw]"]}
        />

        <div className="mt-20 grid gap-10 md:grid-cols-12 lg:mt-32">
          <Reveal className="hidden md:col-span-3 md:block">
            <span aria-hidden className="block h-24 w-px bg-ink/20" />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-6 lg:col-span-4 lg:col-start-8" delay={0.1}>
            <p className="font-serif text-[1.65rem] leading-[1.3] font-light text-ink/85">
              Djeli Prestige accompagne particuliers et professionnels avec des services pensés pour
              simplifier le quotidien.
            </p>
            <TextLink href="/services" arrow="up-right" className="mt-10 text-ink">
              Découvrir Djeli Prestige
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
