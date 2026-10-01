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
          Le formulaire de contact prépare un e-mail dans votre messagerie : les informations que
          vous saisissez (nom, prénom, téléphone, e-mail, message) ne sont transmises à{" "}
          {business.businessName} que lorsque vous envoyez cet e-mail.
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
