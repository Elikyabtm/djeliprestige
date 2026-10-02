import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
  async redirects() {
    // Ancienne adresse de la politique de confidentialité
    return [{ source: "/confidentialite", destination: "/politique-de-confidentialite", permanent: true }];
  },
};

export default nextConfig;
