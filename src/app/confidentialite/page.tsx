import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = {
  ...pageMetadata({
    title: "Politique de confidentialité",
    description: "Politique de confidentialité du site Djeli Prestige.",
    path: "/confidentialite",
  }),
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage label="Informations légales" title="Confidentialité">
      {/* TODO: faire valider ce texte selon les traitements réellement mis en place. */}
      <div>
        <h2>Données collectées</h2>
        <p>
          Lorsque vous utilisez le formulaire de contact, les informations saisies (nom, prénom,
          téléphone, e-mail, profil, service souhaité et message) sont transmises par e-mail à{" "}
          {business.businessName}. Elles ne sont pas enregistrées dans une base de données du site.
        </p>
      </div>
      <div>
        <h2>Utilisation</h2>
        <p>Ces informations servent uniquement à répondre à votre demande et à établir un devis.</p>
      </div>
      <div>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
          écrivant à{" "}
          <a href={business.emailHref} className="underline underline-offset-4">
            {business.email}
          </a>
          .
        </p>
      </div>
    </LegalPage>
  );
}
