import type { MetadataRoute } from "next";

export const baseUrl = "https://dcb-countries-explorer.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/(countries)"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
