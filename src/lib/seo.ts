import type { Metadata } from "next";
import { business } from "@/config/business";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Metadata par page : titre, description, canonical et OpenGraph. */
export function pageMetadata({ title, description, path, image = "/og-image.jpg" }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${business.businessName}`,
      description,
      url: path,
      siteName: business.businessName,
      locale: "fr_FR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: business.businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.businessName}`,
      description,
      images: [image],
    },
  };
}
