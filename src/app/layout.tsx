import type { Metadata, Viewport } from "next";
import { business } from "@/config/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { MotionProvider } from "@/components/motion/MotionProvider";
// Polices auto-hébergées (pas de téléchargement Google au build).
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";

const description =
  "Conciergerie, nettoyage automobile, entretien d'habitations, locations Airbnb et services aux professionnels à Paris & alentours. Un partenaire de confiance pour un quotidien plus simple.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Djeli Prestige | Conciergerie & Services Premium",
    template: "%s | Djeli Prestige",
  },
  description,
  applicationName: business.businessName,
  keywords: [
    "Conciergerie Paris",
    "Nettoyage automobile Paris",
    "Nettoyage voiture à domicile",
    "Conciergerie Airbnb",
    "Nettoyage bureaux Paris",
    "Nettoyage locaux professionnels",
    "Services aux professionnels",
  ],
  openGraph: {
    title: "Djeli Prestige | Conciergerie & Services Premium",
    description,
    url: "/",
    siteName: business.businessName,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: business.businessName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Djeli Prestige | Conciergerie & Services Premium",
    description,
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.businessName,
  description: business.activity,
  url: business.siteUrl,
  telephone: business.phoneHref.replace("tel:", ""),
  email: business.email,
  image: `${business.siteUrl}/og-image.jpg`,
  areaServed: { "@type": "City", name: "Paris" },
  slogan: business.tagline,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a
          href="#contenu"
          className="sr-only z-[100] bg-ivory px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <FloatingContact />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
