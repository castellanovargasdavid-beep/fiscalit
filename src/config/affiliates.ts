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
  /**
   * Destino del enlace. Mientras `isLivePartner` sea `false`, apunta a la
   * landing oficial y pública del partner, SIN parámetro de afiliado
   * inventado (nunca un `?ref=` que no corresponda a un programa real: eso
   * generaría cero comisión y sería engañoso presentarlo como "enlace de
   * afiliado"). En cuanto se firme el acuerdo real, sustitúyela por el
   * enlace de tracking que entregue el programa de afiliación.
   */
  url: string;
  badge?: string;
  /**
   * `true` solo cuando existe un acuerdo de afiliación firmado y `url`
   * contiene el enlace de tracking real de ese programa. En `false`, el
   * enlace sigue siendo útil para el usuario (lleva a la web oficial del
   * partner) pero no genera comisión: es el estado honesto por defecto de
   * todos los partners hasta que se den de alta.
   */
  isLivePartner: boolean;
}

/**
 * Punto único de edición para todos los enlaces de afiliados del sitio.
 * Todas las salidas pasan por `/go/[partner]` (ver `src/app/go/[partner]/page.tsx`),
 * que redirige a `url`: así, en cuanto un partner pase a `isLivePartner: true`
 * con su enlace de tracking real, el cambio se propaga automáticamente a
 * todo el sitio y a los PDF ya generados (que enlazan a `/go/[partner]`, no
 * a la URL directa), sin tener que tocar ni un componente ni regenerar nada.
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
    url: "https://www.holded.com/es",
    badge: "Recomendado",
    isLivePartner: false,
  },
  quipu: {
    id: "quipu",
    name: "Quipu",
    category: "contabilidad",
    tagline: "Contabilidad automática para autónomos",
    description:
      "Sincroniza tus bancos, automatiza tus impuestos y lleva tu contabilidad al día sin hojas de cálculo.",
    ctaLabel: "Empezar con Quipu",
    url: "https://getquipu.com/es/",
    isLivePartner: false,
  },
  qonto: {
    id: "qonto",
    name: "Qonto",
    category: "banca",
    tagline: "La cuenta business de autónomos y pymes",
    description:
      "Abre una cuenta profesional en minutos, con tarjetas, facturación integrada y gestión de gastos de equipo.",
    ctaLabel: "Abrir cuenta en Qonto",
    url: "https://qonto.com/es",
    isLivePartner: false,
  },
  taxdown: {
    id: "taxdown",
    name: "TaxDown",
    category: "fiscal",
    tagline: "Tu declaración de la renta, sin líos",
    description:
      "Asesores fiscales revisan tu declaración y encuentran deducciones que Hacienda no te va a recordar.",
    ctaLabel: "Hacer la renta con TaxDown",
    url: "https://taxdown.es",
    isLivePartner: false,
  },
  "ayuda-t-pymes": {
    id: "ayuda-t-pymes",
    name: "Ayuda T Pymes",
    category: "gestoria",
    tagline: "Gestoría online para autónomos y pymes",
    description:
      "Altas, impuestos y nóminas gestionados por una gestoría 100% online, con un gestor asignado a tu negocio.",
    ctaLabel: "Hablar con un gestor",
    url: "https://ayudatpymes.com",
    isLivePartner: false,
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
