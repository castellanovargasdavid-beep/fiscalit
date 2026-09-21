export const siteConfig = {
  name: "Fiscalit",
  description:
    "Herramientas fiscales gratuitas para autónomos y micropymes en España: calculadoras, generadores y guías para llevar tu negocio sin sorpresas de Hacienda.",
  url: "https://fiscalit.es",
};

export interface ToolLink {
  label: string;
  href: string;
  description: string;
}

/**
 * Enlazado interno SEO hacia las herramientas del sitio.
 * Añade aquí cada nueva calculadora/generador a medida que se publique.
 */
export const toolsNav: ToolLink[] = [
  {
    label: "Calculadora de cuota de autónomo",
    href: "/herramientas/cuota-autonomo",
    description: "Estima tu cuota mensual según la tarifa plana y tus ingresos.",
  },
  {
    label: "Calculadora de IRPF",
    href: "/herramientas/irpf",
    description: "Calcula la retención de IRPF aplicable a tus facturas.",
  },
  {
    label: "Calculadora de IVA",
    href: "/herramientas/iva",
    description: "Añade o desglosa el IVA de cualquier importe al instante.",
  },
  {
    label: "Generador de facturas",
    href: "/herramientas/generador-facturas",
    description: "Crea facturas profesionales en PDF en menos de un minuto.",
  },
  {
    label: "Calendario fiscal",
    href: "/herramientas/calendario-fiscal",
    description: "No te pierdas ningún modelo ni plazo de Hacienda.",
  },
];

export const mainNav: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Herramientas", href: "/herramientas" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre Fiscalit", href: "/sobre-fiscalit" },
];
