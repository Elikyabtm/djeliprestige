import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { legalConfig } from "@/config/legal";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Politique relative aux cookies",
  description: "Situation du site Djeli Prestige en matière de cookies et autres traceurs.",
  path: "/cookies",
});

/*
 * Audit technique réalisé à la date de legalConfig.lastUpdated :
 * aucun cookie, aucun localStorage / sessionStorage, aucun script tiers,
 * aucune requête vers un domaine externe pendant la navigation
 * (polices auto-hébergées). Aucun bandeau de consentement n'est donc requis.
 *
 * Si un outil soumis au consentement est ajouté (mesure d'audience, pixel,
 * vidéo intégrée, carte, reCAPTCHA…), il faudra mettre en place un
 * mécanisme de consentement AVANT tout dépôt et mettre à jour cette page.
 */
export default function CookiesPage() {
  const c = legalConfig;

  return (
    <LegalPage
      label="Cookies"
      titleLines={["Politique relative", <em key="2" className="font-light text-gold-deep">aux cookies.</em>]}
      intro="Ce que le site Djeli Prestige dépose — ou ne dépose pas — sur votre appareil."
    >
      <LegalSection number="01" title="Cookies et traceurs">
        <p>
          Un cookie, ou plus largement un traceur, est une information enregistrée sur votre
          appareil lors de la consultation d’un site : mesure d’audience, publicité, partage sur les
          réseaux sociaux, mémorisation de préférences, etc.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Situation du site">
        <p>
          <strong>Le site {c.brandName} ne dépose aucun cookie ni autre traceur sur votre appareil.</strong>
        </p>
        <ul>
          <li>aucun outil de mesure d’audience ;</li>
          <li>aucun cookie publicitaire ni pixel de suivi ;</li>
          <li>aucun module de réseau social, vidéo ou carte intégrés ;</li>
          <li>aucune donnée enregistrée dans le stockage local du navigateur.</li>
        </ul>
        <p>
          Les polices de caractères sont hébergées sur le site lui-même : la navigation n’entraîne
          aucune requête vers des services tiers. C’est pourquoi aucun bandeau de consentement
          n’est affiché.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Liens vers des services tiers">
        <p>
          Lorsque vous cliquez sur un lien externe, par exemple WhatsApp, vous quittez le site : le
          service concerné applique alors sa propre politique en matière de cookies.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Évolution">
        <p>
          Si des outils nécessitant votre consentement venaient à être ajoutés, aucun traceur ne
          serait déposé avant votre accord, un choix vous serait proposé et cette page serait mise
          à jour.
        </p>
        <p>
          Pour toute question : <a href={c.emailHref}>{c.email}</a>. Voir aussi la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
