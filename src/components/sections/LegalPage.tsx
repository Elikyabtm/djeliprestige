import type { ReactNode } from "react";
import { lastUpdatedLabel } from "@/config/legal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type LegalPageProps = {
  label: string;
  /** Lignes du H1 (la seconde peut être en italique). */
  titleLines: ReactNode[];
  intro: string;
  children: ReactNode;
};

/**
 * Gabarit éditorial des pages légales : hero ivoire sobre, sections
 * numérotées séparées par des filets fins (pas de cards).
 */
export function LegalPage({ label, titleLines, intro, children }: LegalPageProps) {
  return (
    <article className="bg-ivory text-ink">
      <header className="gutter container-wide pt-40 pb-20 lg:pt-52 lg:pb-28">
        <SectionLabel tone="muted" className="text-gold-deep">
          {label}
        </SectionLabel>
        <AnimatedText as="h1" id="page-title" immediate delay={0.2} className="display-xl mt-10" lines={titleLines} />
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6" delay={0.4}>
            <p className="font-serif text-[1.55rem] leading-[1.35] font-light text-ink/85">{intro}</p>
          </Reveal>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9 lg:justify-self-end" delay={0.5}>
            <p className="eyebrow text-ink/60">Dernière mise à jour — {lastUpdatedLabel()}</p>
          </Reveal>
        </div>
      </header>

      <div className="gutter container-wide pb-28 lg:pb-40">{children}</div>
    </article>
  );
}

type LegalSectionProps = {
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
};

/** Section numérotée : numéro, titre, contenu — séparés par un filet. */
export function LegalSection({ number, title, id, children }: LegalSectionProps) {
  const headingId = id ?? `section-${number}`;
  return (
    <section aria-labelledby={headingId} className="border-t border-ink/15 py-14 lg:py-20">
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <p aria-hidden className="font-serif text-5xl leading-none font-light text-gold-deep lg:col-span-2">
          {number}
        </p>
        <h2 id={headingId} className="display-sm max-w-[16ch] lg:col-span-4">
          {title}
        </h2>
        <div className="legal-prose text-[0.95rem] leading-relaxed text-ink/75 lg:col-span-6">{children}</div>
      </Reveal>
    </section>
  );
}

type InfoRow = { label: string; value: ReactNode; pending?: boolean };

/** Liste label / valeur avec filets fins (informations d'identification). */
export function InfoRows({ rows }: { rows: InfoRow[] }) {
  return (
    <dl className="mt-2 border-t border-ink/10">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="eyebrow pt-1 text-ink/55">{row.label}</dt>
          <dd className={row.pending ? "text-ink/55 italic" : "text-ink"}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
