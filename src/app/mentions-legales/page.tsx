import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description: "Mentions légales du site Djeli Prestige.",
    path: "/mentions-legales",
  }),
  robots: { index: false, follow: true },
};

const pending = "Information en cours de mise à jour.";

export default function MentionsLegalesPage() {
  const { legal } = business;
  return (
    <LegalPage label="Informations légales" title="Mentions légales">
      {/* TODO: compléter business.legal avec les informations réelles. */}
      <div>
        <h2>Éditeur du site</h2>
        <p>{legal.companyName}</p>
        <p>Forme juridique : {legal.legalForm ?? pending}</p>
        <p>SIRET : {legal.siret ?? pending}</p>
        <p>Adresse : {legal.address ?? pending}</p>
        <p>Responsable de la publication : {legal.publisher ?? pending}</p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Téléphone : <a href={business.phoneHref} className="underline underline-offset-4">{business.phone}</a>
        </p>
        <p>
          E-mail : <a href={business.emailHref} className="underline underline-offset-4">{business.email}</a>
        </p>
      </div>
      <div>
        <h2>Conception & réalisation</h2>
        <p>
          Design et développement du site : {business.credits.designer}, {business.credits.role.toLowerCase()}.
        </p>
      </div>
      <div>
        <h2>Hébergement</h2>
        <p>{legal.host ?? pending}</p>
      </div>
      <div>
        <h2>Propriété intellectuelle</h2>
        <p>
          La conception graphique, la mise en page et le développement de ce site sont l&apos;œuvre
          de {business.credits.designer}, {business.credits.role.toLowerCase()}, qui en conserve les
          droits d&apos;auteur. Toute reproduction, totale ou partielle, sans autorisation préalable
          est interdite.
        </p>
      </div>
    </LegalPage>
  );
}
