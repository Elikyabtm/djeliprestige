import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { legalConfig, orPending } from "@/config/legal";
import { InfoRows, LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Djeli Prestige utilise les données personnelles transmises via le formulaire de contact du site, et comment exercer vos droits.",
  path: "/politique-de-confidentialite",
});

/** Prestataire d'envoi des e-mails, selon la configuration réellement active (legal.ts). */
function emailTransportLabel() {
  switch (legalConfig.emailTransport) {
    case "resend":
      return "Resend, service d’envoi d’e-mails utilisé pour transmettre les demandes du formulaire ;";
    case "gmail":
      return "Google (Gmail), service utilisé pour envoyer les demandes du formulaire vers notre boîte de réception ;";
    default:
      return "le prestataire technique d’envoi d’e-mails utilisé par le site pour transmettre les demandes du formulaire ;";
  }
}

export default function PolitiqueConfidentialitePage() {
  const c = legalConfig;

  return (
    <LegalPage
      label="Vie privée"
      titleLines={["Politique de", <em key="2" className="font-light text-gold-deep">confidentialité.</em>]}
      intro="Djeli Prestige accorde une attention particulière à la protection de vos données personnelles."
    >
      <LegalSection number="01" title="Responsable du traitement">
        <p>
          Les données transmises dans le cadre des demandes adressées via ce site sont traitées par{" "}
          {c.brandName}, pour les besoins de son activité.
        </p>
        <InfoRows
          rows={[
            { label: "Responsable", value: c.brandName },
            { label: "Raison sociale", value: orPending(c.legalName), pending: !c.legalName },
            { label: "Siège social", value: orPending(c.registeredOffice), pending: !c.registeredOffice },
            { label: "E-mail", value: <a href={c.emailHref}>{c.email}</a> },
            { label: "Téléphone", value: <a href={c.phoneHref}>{c.phone}</a> },
            // Délégué à la protection des données : affiché uniquement si réellement désigné.
            ...(c.dpoContact ? [{ label: "Délégué à la protection des données", value: c.dpoContact }] : []),
          ]}
        />
      </LegalSection>

      <LegalSection number="02" title="Données collectées">
        <p>
          Le site comporte un seul formulaire, sur la page <Link href="/contact">Contact</Link>. Il
          recueille uniquement les informations suivantes :
        </p>
        <ul>
          <li>nom et prénom ;</li>
          <li>numéro de téléphone et/ou adresse e-mail (au moins l’un des deux est demandé pour vous recontacter) ;</li>
          <li>votre profil : particulier ou professionnel ;</li>
          <li>le service concerné par votre demande ;</li>
          <li>votre message, ainsi que toute information que vous choisissez d’y indiquer.</li>
        </ul>
        <p>
          Pour limiter les envois abusifs, l’adresse IP à l’origine d’une demande est conservée
          temporairement dans la mémoire du serveur, pendant 10 minutes au plus. Elle n’est ni
          enregistrée en base de données ni transmise dans la demande.
        </p>
        <p>
          Comme pour tout site internet, l’hébergeur traite des données techniques de connexion (par
          exemple l’adresse IP et la date de la requête) nécessaires à l’acheminement des pages et à
          la sécurité du service.
        </p>
        <p>
          Le site ne propose ni création de compte, ni newsletter, ni mesure d’audience, et ne
          dépose aucun cookie publicitaire ou de suivi. Si vous nous contactez directement par
          téléphone, WhatsApp ou e-mail, nous recevons les informations que vous choisissez de nous
          transmettre par ce biais.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Finalités">
        <p>Ces données sont utilisées pour :</p>
        <ul>
          <li>recevoir votre demande et y répondre ;</li>
          <li>vous recontacter et, le cas échéant, établir un devis ;</li>
          <li>assurer le suivi de la relation avec vous ;</li>
          <li>protéger le formulaire contre les envois abusifs.</li>
        </ul>
        <p>Elles ne sont utilisées ni à des fins de prospection automatisée, ni de profilage, ni de publicité.</p>
      </LegalSection>

      <LegalSection number="04" title="Base juridique">
        <p>
          Lorsque vous demandez un devis ou une prestation, le traitement de vos données est
          nécessaire à l’exécution de mesures précontractuelles prises à votre demande (article
          6.1.b du RGPD).
        </p>
        <p>
          Pour les autres demandes de contact et pour la protection du formulaire, le traitement
          repose sur l’intérêt légitime de {c.brandName} à répondre aux sollicitations qui lui sont
          adressées et à assurer la sécurité de son site (article 6.1.f du RGPD).
        </p>
      </LegalSection>

      <LegalSection number="05" title="Destinataires">
        <p>
          Vos données sont destinées à {c.brandName}. Elles ne sont ni vendues ni cédées à des
          tiers. Pour la seule transmission et l’hébergement des demandes, interviennent les
          prestataires techniques suivants :
        </p>
        <ul>
          <li>{c.host.name}, hébergeur du site, qui exécute le formulaire ;</li>
          <li>{emailTransportLabel()}</li>
          <li>Google (Gmail), qui héberge la boîte de réception {c.email} où les demandes sont reçues.</li>
        </ul>
        <p>
          Certains de ces prestataires sont établis hors de l’Union européenne. Les éventuels
          transferts de données sont encadrés par les mécanismes prévus par le RGPD, tels qu’une
          décision d’adéquation ou des clauses contractuelles types.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Durée de conservation">
        {c.dataRetention ? (
          <p>Les demandes reçues sont conservées {c.dataRetention}.</p>
        ) : (
          <p>
            Les demandes reçues sont conservées pendant la durée nécessaire à leur traitement et, le
            cas échéant, au suivi de la relation, puis supprimées ou archivées conformément aux
            obligations légales applicables.
          </p>
        )}
        <p>L’adresse IP utilisée pour limiter les envois abusifs n’est conservée que 10 minutes au plus.</p>
      </LegalSection>

      <LegalSection number="07" title="Vos droits">
        <p>Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits suivants :</p>
        <ul>
          <li>droit d’accès à vos données ;</li>
          <li>droit de rectification ;</li>
          <li>droit à l’effacement ;</li>
          <li>droit à la limitation du traitement ;</li>
          <li>droit d’opposition ;</li>
          <li>droit à la portabilité, lorsqu’il est applicable ;</li>
          <li>droit de retirer votre consentement, lorsque le traitement repose sur celui-ci ;</li>
          <li>droit de définir des directives relatives au sort de vos données après votre décès.</li>
        </ul>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL, dans les conditions
          prévues par la réglementation (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection number="08" title="Exercer vos droits">
        <p>
          Pour exercer vos droits ou pour toute question relative à vos données, écrivez à{" "}
          <a href={c.emailHref}>{c.email}</a>.
        </p>
        <p>
          Une réponse vous sera apportée dans les délais prévus par la réglementation. En cas de
          doute raisonnable sur votre identité, un justificatif pourra vous être demandé.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Sécurité">
        <p>
          {c.brandName} met en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données : échanges chiffrés (HTTPS), accès limité aux personnes chargées de
          traiter les demandes, protection du formulaire contre les envois abusifs.
        </p>
        <p>
          Aucun système n’étant totalement exempt de risques, nous vous invitons à ne pas transmettre
          d’informations sensibles via le formulaire.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Cookies">
        <p>
          Le site ne dépose aucun cookie de mesure d’audience, publicitaire ou de suivi. Le détail
          figure dans la <Link href="/cookies">politique relative aux cookies</Link>.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Mise à jour">
        <p>
          Cette politique peut évoluer, notamment en cas de modification du site ou de la
          réglementation. La date de dernière mise à jour figure en haut de cette page.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
