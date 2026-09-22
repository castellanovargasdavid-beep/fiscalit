export const siteConfig = {
  name: "Fiscalit",
  description:
    "Herramientas fiscales gratuitas para autónomos y micropymes en España: calculadoras, generadores y guías para llevar tu negocio sin sorpresas de Hacienda.",
  /** Dominio canónico del sitio, sin barra final. Sobrescribible vía NEXT_PUBLIC_SITE_URL en el entorno de build. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fiscalit.es",
  /** Email de contacto para leads de alto valor (auditoría gratuita). Configura un buzón real antes de recibir tráfico. */
  contactEmail: "hola@fiscalit.es",
  /** Número de WhatsApp Business en formato internacional sin espacios ni símbolos (p. ej. "34600000000"). Vacío = se oculta el botón de WhatsApp. */
  whatsappNumber: "",
  /** URL de un servicio de formularios sin backend (Formspree, Resend, un webhook propio...) para los leads de alto valor. Vacío = se usa solo el email de contacto. */
  leadWebhookUrl: "",
};

export const mainNav: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Herramientas", href: "/#herramientas" },
  { label: "Sobre Fiscalit", href: "/sobre-fiscalit" },
];
