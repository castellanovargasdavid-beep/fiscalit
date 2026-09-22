import {
  ArrowLeftRight,
  Calculator,
  Car,
  Receipt,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type ToolCategory = "fiscal" | "cotizaciones" | "facturacion";

export interface ToolCategoryInfo {
  id: ToolCategory;
  label: string;
}

export const TOOL_CATEGORIES: ToolCategoryInfo[] = [
  { id: "fiscal", label: "Fiscal & Impuestos" },
  { id: "cotizaciones", label: "Cotizaciones & Seguridad Social" },
  { id: "facturacion", label: "Facturación & Normativa" },
];

export interface Tool {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  /** Palabras clave adicionales para el buscador (sinónimos, términos coloquiales). */
  keywords: string[];
}

/**
 * Catálogo único de las herramientas publicadas. Fuente de verdad para la
 * home (buscador y grid) y el enlazado interno del footer.
 */
export const tools: Tool[] = [
  {
    slug: "autonomo-vs-sl",
    href: "/herramientas/autonomo-vs-sl",
    title: "Autónomo vs Sociedad Limitada",
    description:
      "Compara cuánto te quedaría neto como autónomo o creando una SL, con IRPF, cuota RETA e Impuesto de Sociedades.",
    category: "fiscal",
    icon: Scale,
    keywords: ["autonomo", "sl", "sociedad limitada", "sociedad", "impuesto de sociedades", "neto"],
  },
  {
    slug: "calculadora-cuota-autonomos",
    href: "/herramientas/calculadora-cuota-autonomos",
    title: "Calculadora de cuota de autónomos",
    description: "Descubre tu tramo de cotización RETA y la cuota mensual según tu rendimiento neto real.",
    category: "cotizaciones",
    icon: Calculator,
    keywords: ["cuota", "autonomos", "reta", "tramos", "seguridad social", "cotizacion"],
  },
  {
    slug: "diagnostico-verifactu",
    href: "/herramientas/diagnostico-verifactu",
    title: "Diagnóstico VeriFactu",
    description:
      "Comprueba si tu sistema actual cumple los requisitos técnicos de facturación para la entrada en vigor obligatoria de VeriFactu y la Ley Crea y Crece, en 2027.",
    category: "facturacion",
    icon: ShieldCheck,
    keywords: ["verifactu", "factura", "crea y crece", "aeat", "software facturacion", "sancion"],
  },
  {
    slug: "calculadora-kilometraje-dietas",
    href: "/herramientas/calculadora-kilometraje-dietas",
    title: "Kilometraje y dietas exentas",
    description:
      "Calcula el importe exento de IRPF por kilometraje y dietas de manutención para empleados y administradores en sus desplazamientos.",
    category: "fiscal",
    icon: Car,
    keywords: ["kilometraje", "dietas", "km", "desplazamiento", "manutencion", "exento", "empleados", "administradores"],
  },
  {
    slug: "retencion-factura-iae",
    href: "/herramientas/retencion-factura-iae",
    title: "Retención IRPF en factura",
    description:
      "Averigua si tu factura lleva retención (0%, 7% o 15%) según tu epígrafe del IAE y simula el líquido a cobrar.",
    category: "facturacion",
    icon: Receipt,
    keywords: ["retencion", "iae", "factura", "irpf", "epigrafe", "iva"],
  },
  {
    slug: "pluriactividad-devolucion",
    href: "/herramientas/pluriactividad-devolucion",
    title: "Devolución por pluriactividad",
    description:
      "Comprueba si tienes derecho a que la Seguridad Social te devuelva el exceso cotizado entre Régimen General y RETA.",
    category: "cotizaciones",
    icon: ArrowLeftRight,
    keywords: ["pluriactividad", "devolucion", "reta", "regimen general", "seguridad social", "exceso"],
  },
];
