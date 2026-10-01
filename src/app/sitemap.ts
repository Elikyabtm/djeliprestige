import type { MetadataRoute } from "next";
import { business } from "@/config/business";

const routes = ["", "/services", "/conciergerie", "/airbnb", "/nettoyage-vehicule", "/professionnels", "/tarifs", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${business.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
