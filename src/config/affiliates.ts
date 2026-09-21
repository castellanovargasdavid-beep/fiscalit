export type AffiliateCategory =
  | "facturacion"
  | "contabilidad"
  | "banca"
  | "fiscal"
  | "gestoria";

export interface AffiliatePartner {
  id: string;
  name: string;
  category: AffiliateCategory;
  tagline: string;
  description: string;
  ctaLabel: string;
  url: string;
  badge?: string;
}

/**
 * Punto único de edición para todos los enlaces de afiliados del sitio.
 * Sustituye `url` por el enlace de tracking real de cada partner cuando
 * esté disponible; el resto de textos alimentan <AffiliateCard />.
 */
export const affiliates: Record<string, AffiliatePartner> = {
  holded: {
    id: "holded",
    name: "Holded",
    category: "facturacion",
    tagline: "Facturación y gestión todo en uno",
    description:
      "Factura, controla tus gastos y automatiza tu contabilidad desde un único ERP pensado para autónomos y pymes.",
    ctaLabel: "Probar Holded gratis",
    url: "https://www.holded.com/es?ref=fiscalit",
    badge: "Recomendado",
  },
  quipu: {
    id: "quipu",
    name: "Quipu",
    category: "contabilidad",
    tagline: "Contabilidad automática para autónomos",
    description:
      "Sincroniza tus bancos, automatiza tus impuestos y lleva tu contabilidad al día sin hojas de cálculo.",
    ctaLabel: "Empezar con Quipu",
    url: "https://getquipu.com/es/?ref=fiscalit",
  },
  qonto: {
    id: "qonto",
    name: "Qonto",
    category: "banca",
    tagline: "La cuenta business de autónomos y pymes",
    description:
      "Abre una cuenta profesional en minutos, con tarjetas, facturación integrada y gestión de gastos de equipo.",
    ctaLabel: "Abrir cuenta en Qonto",
    url: "https://qonto.com/es?ref=fiscalit",
  },
  taxdown: {
    id: "taxdown",
    name: "TaxDown",
    category: "fiscal",
    tagline: "Tu declaración de la renta, sin líos",
    description:
      "Asesores fiscales revisan tu declaración y encuentran deducciones que Hacienda no te va a recordar.",
    ctaLabel: "Hacer la renta con TaxDown",
    url: "https://taxdown.es?ref=fiscalit",
  },
  "ayuda-t-pymes": {
    id: "ayuda-t-pymes",
    name: "Ayuda T Pymes",
    category: "gestoria",
    tagline: "Gestoría online para autónomos y pymes",
    description:
      "Altas, impuestos y nóminas gestionados por una gestoría 100% online, con un gestor asignado a tu negocio.",
    ctaLabel: "Hablar con un gestor",
    url: "https://ayudatpymes.com?ref=fiscalit",
  },
};

export type AffiliateId = keyof typeof affiliates;

export function getAffiliate(id: AffiliateId): AffiliatePartner {
  const partner = affiliates[id];
  if (!partner) {
    throw new Error(`Affiliate partner "${id}" no existe en src/config/affiliates.ts`);
  }
  return partner;
}
