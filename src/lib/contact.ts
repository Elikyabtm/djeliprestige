import { business } from "@/config/business";

/** Champs du formulaire de contact, partagés entre client et serveur. */
export type ContactFields = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  profil: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const LIMITS: Record<keyof ContactFields, number> = {
  nom: 80,
  prenom: 80,
  telephone: 30,
  email: 120,
  profil: 30,
  service: 40,
  message: 3000,
};

/** Validation identique côté navigateur et côté serveur. */
export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  if (!f.nom.trim()) e.nom = "Merci d'indiquer votre nom.";
  if (!f.prenom.trim()) e.prenom = "Merci d'indiquer votre prénom.";
  if (!f.telephone.trim() && !f.email.trim()) {
    e.telephone = "Indiquez un téléphone ou un e-mail pour être recontacté.";
  }
  if (f.telephone.trim() && !/^[+\d][\d\s.-]{7,}$/.test(f.telephone.trim())) {
    e.telephone = "Ce numéro ne semble pas valide.";
  }
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    e.email = "Cette adresse e-mail ne semble pas valide.";
  }
  if (!business.contactForm.profiles.includes(f.profil)) e.profil = "Choisissez un profil.";
  if (!business.contactForm.services.includes(f.service)) e.service = "Choisissez un service.";
  if (!f.message.trim()) e.message = "Décrivez brièvement votre besoin.";

  for (const key of Object.keys(LIMITS) as (keyof ContactFields)[]) {
    if (f[key].length > LIMITS[key]) e[key] = "Ce champ est trop long.";
  }
  return e;
}

/** Normalise un objet reçu (JSON) en champs texte. */
export function toContactFields(input: unknown): ContactFields {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: keyof ContactFields) => (typeof o[k] === "string" ? (o[k] as string) : "");
  return {
    nom: str("nom"),
    prenom: str("prenom"),
    telephone: str("telephone"),
    email: str("email"),
    profil: str("profil"),
    service: str("service"),
    message: str("message"),
  };
}
