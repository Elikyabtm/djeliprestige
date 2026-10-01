/**
 * DJELI PRESTIGE — source unique des informations commerciales.
 *
 * Tous les composants lisent ce fichier. Ne jamais écrire le téléphone,
 * l'e-mail ou les prix directement dans un composant.
 *
 * Numéro officiel UNIQUE : 07 53 11 11 79.
 */

export type NavItem = { label: string; href: string };

export type PricingTier = {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceCity: number;
  priceLarge: number;
  featured?: boolean;
};

export type CarOption = {
  id: string;
  label: string;
  /** Prix en euros, ou null si « Sur devis ». */
  price: number | null;
  icon: "armchair" | "leather" | "engine" | "wind" | "sparkles" | "headlight";
};

export type Testimonial = {
  quote: string;
  author: string;
  context?: string;
};

export type BeforeAfterPair = {
  before: string;
  after: string;
  label: string;
};

export const business = {
  businessName: "Djeli Prestige",
  activity: "Conciergerie & services premium",
  positioning: "Un partenaire de confiance pour un quotidien plus simple.",
  tagline: "Votre satisfaction, notre priorité !",
  baseline: "Des services de qualité pour les particuliers et les professionnels.",

  phone: "07 53 11 11 79",
  phoneHref: "tel:+33753111179",
  whatsappDisplay: "+33 7 53 11 11 79",
  whatsapp: "https://wa.me/33753111179",
  email: "contact@djeliprestige.fr",
  emailHref: "mailto:contact@djeliprestige.fr",
  location: "Paris & alentours",

  // TODO: renseigner l'URL réelle du site une fois le domaine en ligne.
  siteUrl: "https://www.djeliprestige.fr",

  // Réseaux sociaux : ajouter uniquement lorsque les URLs réelles sont disponibles.
  instagram: null as string | null,
  tiktok: null as string | null,
  socialLinks: [] as { label: string; href: string }[],

  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Automobile", href: "/nettoyage-vehicule" },
    { label: "Professionnels", href: "/professionnels" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  services: [
    {
      id: "automobile",
      number: "01",
      title: "Automobile",
      href: "/nettoyage-vehicule",
      image: "/images/02-exterieur.webp",
      imageAlt: "Lavage extérieur à la mousse d'une berline noire à la tombée du jour",
      summary:
        "Nettoyage intérieur, extérieur et soin complet de votre véhicule, de la formule express à l'intégrale.",
      items: [
        "Nettoyage intérieur",
        "Nettoyage extérieur",
        "Nettoyage complet",
        "Soin automobile & detailing",
        "Shampoing sièges / tapis",
        "Traitement cuir",
        "Nettoyage moteur",
        "Désinfection / ozone",
        "Polissage",
        "Rénovation de phares",
      ],
    },
    {
      id: "habitation",
      number: "02",
      title: "Habitation",
      href: "/conciergerie",
      image: "/images/06-habitation.webp",
      imageAlt: "Intervention de l'équipe Djeli Prestige dans un salon contemporain",
      summary: "Maisons, appartements et studios, entretenus avec la même exigence.",
      items: ["Maisons", "Appartements", "Studios"],
    },
    {
      id: "airbnb",
      number: "03",
      title: "Locations & Airbnb",
      href: "/airbnb",
      image: "/images/07-airbnb.webp",
      imageAlt: "Préparation d'une chambre élégante avant l'arrivée de voyageurs",
      summary: "Préparation des espaces et entretien entre les séjours.",
      items: ["Airbnb", "Préparation des espaces", "Entretien entre les séjours"],
    },
    {
      id: "professionnels",
      number: "04",
      title: "Professionnels",
      href: "/professionnels",
      image: "/images/08-bureaux.webp",
      imageAlt: "Entretien de bureaux contemporains baignés de lumière",
      summary:
        "Bureaux, locaux, concessionnaires, flottes, ambulances et véhicules professionnels.",
      items: [
        "Bureaux",
        "Locaux",
        "Concessionnaires",
        "Flottes automobiles",
        "Sociétés d'ambulance",
        "Véhicules professionnels",
      ],
    },
  ],

  professionalChapters: [
    {
      id: "flottes",
      number: "01",
      title: "Flottes & concessionnaires",
      text: "Entretien de véhicules professionnels, flottes automobiles et véhicules de concession.",
      image: "/images/05-flotte.webp",
      imageAlt:
        "Plusieurs véhicules professionnels noirs entretenus simultanément devant un bâtiment contemporain",
    },
    {
      id: "ambulances",
      number: "02",
      title: "Ambulances & véhicules spécialisés",
      text: "Des interventions adaptées aux véhicules nécessitant une attention particulière en matière de propreté et d'entretien.",
      image: "/images/04-ambulance.webp",
      imageAlt: "Nettoyage de la cellule sanitaire d'une ambulance, portes arrière ouvertes",
    },
    {
      id: "bureaux",
      number: "03",
      title: "Bureaux & locaux",
      text: "Entretien ponctuel ou régulier de bureaux et locaux professionnels.",
      image: "/images/08-bureaux.webp",
      imageAlt: "Équipe Djeli Prestige entretenant des bureaux contemporains",
    },
  ],

  pricing: [
    {
      id: "express",
      name: "Express",
      description: "Intérieur uniquement",
      features: ["Aspiration habitacle", "Nettoyage des plastiques", "Vitres intérieures"],
      priceCity: 25,
      priceLarge: 30,
    },
    {
      id: "standard",
      name: "Standard",
      description: "Intérieur + extérieur",
      features: [
        "Nettoyage intérieur complet",
        "Lavage extérieur",
        "Jantes (dégraissage)",
        "Vitres intérieur + extérieur",
      ],
      priceCity: 45,
      priceLarge: 55,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Intérieur + extérieur + soin",
      features: [
        "Nettoyage intérieur complet",
        "Lavage extérieur haute brillance",
        "Jantes & pneus",
        "Traitement tableau de bord",
        "Vitres intérieur + extérieur",
        "Soin carrosserie / protection",
      ],
      priceCity: 65,
      priceLarge: 80,
      featured: true,
    },
    {
      id: "luxe",
      name: "Luxe",
      description: "Rénovation & protection",
      features: [
        "Tout le Premium",
        "Shampoing sièges / tapis",
        "Traitement cuir / plastiques",
        "Protection longue durée anti-UV",
      ],
      priceCity: 90,
      priceLarge: 110,
    },
    {
      id: "integrale",
      name: "Intégrale",
      description: "Extérieur + intérieur + moteur",
      features: [
        "Tout le Luxe",
        "Nettoyage moteur léger",
        "Désinfection habitacle",
        "Ozone sur demande",
      ],
      priceCity: 120,
      priceLarge: 150,
    },
  ] satisfies PricingTier[],

  vehicleSizes: {
    city: "Véhicule citadin",
    large: "SUV / 4x4 / Break",
  },

  carOptions: [
    { id: "shampoing", label: "Shampoing sièges / tapis", price: 20, icon: "armchair" },
    { id: "cuir", label: "Traitement cuir", price: 20, icon: "leather" },
    { id: "moteur", label: "Nettoyage moteur", price: 30, icon: "engine" },
    { id: "ozone", label: "Odeur / désinfection ozone", price: 20, icon: "wind" },
    { id: "polissage", label: "Polissage carrosserie", price: null, icon: "sparkles" },
    { id: "phares", label: "Rénovation phares", price: 25, icon: "headlight" },
  ] satisfies CarOption[],

  commitments: [
    { number: "01", title: "Qualité & soin", text: "Chaque détail compte." },
    {
      number: "02",
      title: "Rapidité d'intervention",
      text: "Un service efficace adapté à votre emploi du temps.",
    },
    {
      number: "03",
      title: "Produits éco-responsables",
      text: "Une approche attentive aux produits utilisés.",
    },
  ],

  /**
   * Témoignages : ne jamais inventer d'avis.
   * Ajouter ici uniquement de vrais retours clients, puis passer
   * `features.testimonials` à true.
   */
  testimonials: [] as Testimonial[],

  /**
   * TODO_REPLACE_WITH_REAL_CUSTOMER_PHOTOS
   * Paires avant / après réelles uniquement. Tant que la liste est vide,
   * la section Avant / Après n'est pas affichée.
   */
  beforeAfter: [] as BeforeAfterPair[],

  features: {
    testimonials: false,
    beforeAfter: false,
  },

  contactForm: {
    profiles: ["Particulier", "Professionnel"],
    services: [
      "Conciergerie",
      "Airbnb / location",
      "Nettoyage automobile",
      "Professionnels",
      "Autre",
    ],
  },

  legal: {
    // TODO: compléter avec les informations légales réelles (forme juridique,
    // SIRET, adresse du siège, responsable de publication, hébergeur).
    companyName: "Djeli Prestige",
    legalForm: null as string | null,
    siret: null as string | null,
    address: null as string | null,
    publisher: null as string | null,
    host: null as string | null,
  },
};

export const formatPrice = (value: number) => `${value} €`;
