import type { MetadataRoute } from "next";
import { business } from "@/config/business";

const routes = ["", "/services", "/conciergerie", "/airbnb", "/nettoyage-vehicule", "/professionnels", "/tarifs", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const legal = ["/mentions-legales", "/politique-de-confidentialite", "/cookies"];
  return [
    ...routes.map((path) => ({
      url: `${business.siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...legal.map((path) => ({
      url: `${business.siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
