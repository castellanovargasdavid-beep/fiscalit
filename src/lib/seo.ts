import type { Metadata } from "next";
import type { FAQItem } from "@/components/FAQAccordion";
import { siteConfig } from "@/config/site";

/** Genera el schema.org FAQPage a partir de las preguntas frecuentes de una herramienta. */
export function buildFaqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Combina varias listas de FAQItem en una sola, descartando repeticiones
 * exactas de pregunta (conserva la primera aparición): permite consolidar,
 * por ejemplo, el FAQ propio de una herramienta con el de su guía técnica en
 * un único bloque `FAQPage` sin preguntas duplicadas para Google.
 */
export function mergeFaqItems(...lists: FAQItem[][]): FAQItem[] {
  const vistas = new Set<string>();
  return lists.flat().filter((item) => {
    if (vistas.has(item.question)) return false;
    vistas.add(item.question);
    return true;
  });
}

export interface BreadcrumbItem {
  name: string;
  /** Ruta relativa, p. ej. "/herramientas/autonomo-vs-sl" o "/#herramientas". */
  path: string;
}

/** Genera el schema.org BreadcrumbList de una página a partir de su ruta de navegación (Inicio → Herramientas → [Herramienta]). */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

interface WebApplicationJsonLdInput {
  name: string;
  description: string;
  /** Ruta relativa de la herramienta, p. ej. "/herramientas/autonomo-vs-sl". */
  path: string;
}

/** Genera el schema.org WebApplication de una herramienta gratuita del sitio. */
export function buildWebApplicationJsonLd({ name, description, path }: WebApplicationJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    inLanguage: "es-ES",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}

/** Genera el schema.org WebSite de la home. */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "es-ES",
  };
}

/** Genera el schema.org Organization de la home. */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

interface PageMetadataInput {
  /** Título específico de la página, sin el sufijo del sitio (lo añade el template del layout). */
  title: string;
  description: string;
  /** Ruta relativa de la página, p. ej. "/herramientas/autonomo-vs-sl". */
  path: string;
}

/**
 * Construye el objeto `Metadata` de una página de herramienta: título,
 * descripción, canonical y OpenGraph/Twitter completos (necesario porque
 * Next.js no fusiona `openGraph` campo a campo con el del layout — si una
 * página define `openGraph`, sustituye por completo al del padre).
 */
export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
