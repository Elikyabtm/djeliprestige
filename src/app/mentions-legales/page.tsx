import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { legalConfig, orPending, PENDING } from "@/config/legal";
import { InfoRows, LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Djeli Prestige : éditeur, conception, hébergement et propriété intellectuelle.",
  path: "/mentions-legales",
});

/** Ligne affichée uniquement si la donnée est renseignée (champs « si applicable »). */
const optional = (label: string, value: string | null) => (value ? [{ label, value }] : []);

const pendingRow = (label: string, value: string | null) => ({
  label,
  value: orPending(value),
  pending: !value,
});

export default function MentionsLegalesPage() {
  const c = legalConfig;
  const sirenSiret = [c.siren && `SIREN ${c.siren}`, c.siret && `SIRET ${c.siret}`].filter(Boolean).join(" — ");

  return (
    <LegalPage
      label="Informations légales"
      titleLines={["Mentions", <em key="2" className="font-light text-gold-deep">légales.</em>]}
      intro="Informations relatives à l’édition, à l’hébergement et à l’utilisation du site Djeli Prestige."
    >
      <LegalSection number="01" title="Éditeur du site">
        <p>Le présent site présente les activités de {c.brandName}.</p>
        <InfoRows
          rows={[
            pendingRow("Nom / raison sociale", c.legalName),
            pendingRow("Forme juridique", c.legalForm),
            pendingRow("Siège social", c.registeredOffice),
            { label: "SIREN / SIRET", value: sirenSiret || PENDING, pending: !sirenSiret },
            // RCS, capital social et TVA : affichés uniquement lorsqu'ils sont renseignés (si applicables).
            ...optional("RCS", c.rcs),
            ...optional("Capital social", c.shareCapital),
            ...optional("TVA intracommunautaire", c.vatNumber),
            { label: "Téléphone", value: <a href={c.phoneHref}>{c.phone}</a> },
            { label: "E-mail", value: <a href={c.emailHref}>{c.email}</a> },
            { label: "Zone d’activité", value: c.location },
            pendingRow("Responsable de la publication", c.publicationDirector),
          ]}
        />
      </LegalSection>

      <LegalSection number="02" title="Conception & réalisation">
        <p className="eyebrow text-ink/55">Conception et développement du site</p>
        <p className="font-serif text-[2rem] leading-tight font-light text-ink">{c.websiteDesigner}</p>
      </LegalSection>

      <LegalSection number="03" title="Hébergement">
        <p>Le site est hébergé et déployé par {c.host.name.replace(/\.$/, "")}.</p>
        <InfoRows
          rows={[
            { label: "Hébergeur", value: c.host.name },
            pendingRow("Adresse", c.host.address),
            ...optional("Téléphone", c.host.phone),
            ...(c.host.website
              ? [
                  {
                    label: "Site internet",
                    value: (
                      <a href={c.host.website} target="_blank" rel="noopener noreferrer">
                        {c.host.website.replace(/^https?:\/\//, "")}
                      </a>
                    ),
                  },
                ]
              : []),
          ]}
        />
      </LegalSection>

      <LegalSection number="04" title="Propriété intellectuelle">
        <p>
          La conception graphique, l’interface, la structure et le développement du site ont été
          réalisés par {c.websiteDesigner}. Ces créations originales sont protégées par les règles
          applicables en matière de propriété intellectuelle, sous réserve des éventuels accords ou
          cessions de droits conclus entre les parties.
        </p>
        <p>
          Les marques, noms commerciaux, logos, textes, photographies et contenus appartenant à{" "}
          {c.brandName} ou fournis par {c.brandName} demeurent la propriété de leurs titulaires
          respectifs.
        </p>
        <p>
          Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, d’un
          élément protégé du site est interdite sans l’autorisation préalable du titulaire des droits
          concerné, sauf exception prévue par la loi.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Responsabilité">
        <p>
          Les informations présentées sur ce site sont fournies à titre informatif. {c.brandName}{" "}
          s’efforce de les tenir exactes et à jour, mais elles peuvent évoluer, notamment les
          prestations et les tarifs, et ne constituent pas une offre contractuelle. Une proposition
          adaptée est établie pour chaque demande.
        </p>
        <p>
          Malgré le soin apporté au site, des interruptions, erreurs ou indisponibilités peuvent
          survenir. N’hésitez pas à nous les signaler à <a href={c.emailHref}>{c.email}</a>.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Liens externes">
        <p>
          Le site peut contenir des liens vers des services tiers, par exemple WhatsApp pour nous
          contacter. Ces services sont soumis à leurs propres conditions d’utilisation et politiques
          de confidentialité, sur lesquelles {c.brandName} n’a pas de contrôle.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Données personnelles & cookies">
        <p>
          L’utilisation de vos données personnelles est détaillée dans la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>. La
          situation du site en matière de cookies est présentée dans la{" "}
          <Link href="/cookies">politique relative aux cookies</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
