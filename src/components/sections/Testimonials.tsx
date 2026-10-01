import { business } from "@/config/business";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Témoignages — jamais de faux avis.
 * Section désactivée via business.features.testimonials.
 * Pour l'activer : ajouter de vrais avis dans business.testimonials.
 */
export function Testimonials() {
  if (!business.features.testimonials) return null;
  const items = business.testimonials;

  return (
    <section aria-labelledby="temoignages-title" className="bg-ivory text-ink">
      <div className="gutter container-wide py-28 lg:py-40">
        <SectionLabel tone="muted" className="text-gold-deep">
          Témoignages
        </SectionLabel>
        <h2 id="temoignages-title" className="display-md mt-8">
          Ils nous font <em className="font-light">confiance.</em>
        </h2>
        {items.length === 0 ? (
          <p className="mt-12 max-w-md text-ink/65">
            Les témoignages de nos clients seront bientôt disponibles.
          </p>
        ) : (
          <ul className="mt-16 grid gap-16 md:grid-cols-2">
            {items.map((t) => (
              <li key={t.author} className="border-t border-ink/10 pt-8">
                <blockquote className="font-serif text-3xl leading-snug font-light">« {t.quote} »</blockquote>
                <p className="eyebrow mt-6 text-ink/60">
                  {t.author}
                  {t.context ? ` — ${t.context}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
