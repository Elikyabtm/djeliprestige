import type { ReactNode } from "react";

/** Gabarit sobre pour les pages légales (fond ivoire). */
export function LegalPage({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="page-title" className="bg-ivory text-ink">
      <div className="gutter container-wide grid gap-14 pt-40 pb-28 lg:grid-cols-12 lg:pt-52 lg:pb-40">
        <div className="lg:col-span-4">
          <p className="eyebrow text-gold-deep">{label}</p>
          <h1 id="page-title" className="display-md mt-8">
            {title}
          </h1>
        </div>
        <div className="space-y-10 text-[0.95rem] leading-relaxed text-ink/75 lg:col-span-7 lg:col-start-6 [&_h2]:eyebrow [&_h2]:mb-3 [&_h2]:text-ink">
          {children}
        </div>
      </div>
    </section>
  );
}
