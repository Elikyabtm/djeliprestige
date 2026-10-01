import { business } from "@/config/business";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CommitmentItem } from "@/components/sections/CommitmentItem";

/** Engagements — minimalisme absolu, trois colonnes, filets verticaux. */
export function Commitments({ number = "06" }: { number?: string }) {
  return (
    <section aria-labelledby="engagements-title" className="bg-ivory text-ink">
      <div className="gutter container-wide py-28 lg:py-40">
        <SectionLabel number={number} tone="muted" className="text-gold-deep">
          Nos engagements
        </SectionLabel>
        <h2 id="engagements-title" className="sr-only">
          Nos engagements
        </h2>
        <Reveal className="mt-16 lg:mt-24">
          <ul className="grid md:grid-cols-3">
            {business.commitments.map((c) => (
              <CommitmentItem key={c.number} {...c} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
