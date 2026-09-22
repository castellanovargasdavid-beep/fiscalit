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
  /**
   * Endpoint de un proveedor de newsletter sin backend propio (Buttondown,
   * MailerLite, Formspree...) que acepte un POST con un campo `email`.
   * Vacío = las altas caen a un mailto: al email de contacto.
   */
  newsletterEndpoint: "",
  /** Titular del sitio (razón social o nombre y apellidos). Rellena antes de publicar el Aviso Legal. */
  legalName: "",
  /** NIF/CIF del titular. Rellena antes de publicar el Aviso Legal. */
  taxId: "",
  /** Domicilio a efectos de notificaciones (LSSI-CE art. 10). Rellena antes de publicar el Aviso Legal. */
  legalAddress: "",
  /**
   * Fecha (ISO) de la última revisión técnica global de la metodología y
   * las fuentes normativas de todas las calculadoras. Actualízala cada vez
   * que se revisen las herramientas contra un cambio normativo.
   */
  lastMethodologyReview: "2026-09-22",
  /**
   * Endpoint de un proveedor de analítica de eventos (no de cifras).
   * Vacío = `trackEvent()` es un no-op: Fiscalit no usa hoy ninguna
   * herramienta de analítica. Si se configura, ver `src/lib/analytics.ts`
   * para la única forma permitida de enviarle eventos.
   */
  analyticsEndpoint: "",
};

export const mainNav: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Herramientas", href: "/#herramientas" },
  { label: "Sobre Fiscalit", href: "/sobre-fiscalit" },
];
