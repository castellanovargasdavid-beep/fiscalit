import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...tools.map((tool) => ({
      url: `${siteConfig.url}${tool.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${siteConfig.url}/sobre-fiscalit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/metodologia`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...(["/aviso-legal", "/privacidad", "/cookies", "/terminos"] as const).map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
