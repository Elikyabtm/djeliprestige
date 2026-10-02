/**
 * DJELI PRESTIGE — informations juridiques / RGPD centralisées.
 *
 * ➜ C'est le SEUL fichier à compléter lorsque Djeli Prestige transmettra
 *   ses informations administratives. Toutes les pages légales
 *   (/mentions-legales, /politique-de-confidentialite, /cookies) lisent ce fichier.
 *
 * Règle : une valeur inconnue reste `null`. Elle s'affiche alors sur le site
 * sous la forme « Information en cours de mise à jour ». Ne jamais inventer.
 *
 * Téléphone, e-mail et zone proviennent de business.ts (source unique).
 */
import { business } from "@/config/business";

export type HostInfo = {
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
};

export const legalConfig = {
  // ------------------------------------------------------------------
  // 1. ÉDITEUR — à compléter avec les informations de Djeli Prestige
  // ------------------------------------------------------------------

  /** À COMPLÉTER — raison sociale exacte (ex. tel qu'inscrit au registre). */
  legalName: null as string | null,
  /** À COMPLÉTER — forme juridique (ex. entreprise individuelle, SAS, SARL…). */
  legalForm: null as string | null,
  /** À COMPLÉTER — adresse complète du siège social. */
  registeredOffice: null as string | null,
  /** À COMPLÉTER — numéro SIREN (9 chiffres). */
  siren: null as string | null,
  /** À COMPLÉTER — numéro SIRET (14 chiffres). */
  siret: null as string | null,
  /** À COMPLÉTER si applicable — RCS + ville (ex. « RCS Paris »). Laisser null si non concerné. */
  rcs: null as string | null,
  /** À COMPLÉTER si applicable (sociétés) — capital social. Laisser null si non concerné. */
  shareCapital: null as string | null,
  /** À COMPLÉTER si applicable — numéro de TVA intracommunautaire. */
  vatNumber: null as string | null,
  /** À COMPLÉTER — nom du directeur / responsable de la publication. */
  publicationDirector: null as string | null,

  // ------------------------------------------------------------------
  // 2. CONTACT — repris de business.ts, ne pas dupliquer ici
  // ------------------------------------------------------------------
  brandName: business.businessName,
  phone: business.phone,
  phoneHref: business.phoneHref,
  email: business.email,
  emailHref: business.emailHref,
  location: business.location,

  // ------------------------------------------------------------------
  // 3. CONCEPTION DU SITE
  // ------------------------------------------------------------------
  websiteDesigner: "Elikya Botomba",

  // ------------------------------------------------------------------
  // 4. HÉBERGEMENT — le site est déployé sur Vercel.
  //    À COMPLÉTER avec les coordonnées légales officielles de l'hébergeur,
  //    telles que publiées sur https://vercel.com/legal (adresse, téléphone).
  // ------------------------------------------------------------------
  host: {
    name: "Vercel Inc.",
    address: null,
    phone: null,
    website: "https://vercel.com",
  } as HostInfo,

  // ------------------------------------------------------------------
  // 5. RGPD
  // ------------------------------------------------------------------

  /**
   * Service utilisé pour ENVOYER les demandes du formulaire vers la boîte e-mail.
   * Doit correspondre à la configuration réellement active sur Vercel :
   *   - "resend" si la variable RESEND_API_KEY est définie ;
   *   - "gmail"  si SMTP_USER / SMTP_PASS (Gmail) sont utilisés ;
   *   - null     tant que ce n'est pas tranché (texte générique affiché).
   */
  emailTransport: null as "resend" | "gmail" | null,

  /**
   * À COMPLÉTER — durée de conservation des demandes reçues, une fois définie
   * par Djeli Prestige (ex. « 3 ans à compter du dernier contact »).
   * Tant que null, une formulation générique (durée nécessaire) est affichée.
   */
  dataRetention: null as string | null,

  /** Délégué à la protection des données : uniquement si un DPO est réellement désigné. */
  dpoContact: null as string | null,

  /** Date de la version en vigueur des pages légales (AAAA-MM-JJ). */
  lastUpdated: "2026-10-02",
};

/** Texte public affiché pour une information inconnue. */
export const PENDING = "Information en cours de mise à jour";

/** Retourne la valeur ou le texte d'attente, jamais null / undefined. */
export const orPending = (value: string | null | undefined) =>
  value && value.trim() ? value : PENDING;

/** Date de mise à jour formatée en français (ex. « 2 octobre 2026 »). */
export const lastUpdatedLabel = () =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${legalConfig.lastUpdated}T00:00:00Z`),
  );
