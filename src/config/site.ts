export const siteConfig = {
  name: "Fiscalit",
  description:
    "Herramientas fiscales gratuitas para autónomos y micropymes en España: calculadoras, generadores y guías para llevar tu negocio sin sorpresas de Hacienda.",
  /** Dominio canónico del sitio, sin barra final. Sobrescribible vía NEXT_PUBLIC_SITE_URL en el entorno de build. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fiscalit.es",
  /**
   * Email de contacto para leads de alto valor (auditoría gratuita) y para
   * el resto de avisos legales. Sobrescribible vía NEXT_PUBLIC_CONTACT_EMAIL
   * en el entorno de build. Buzón personal provisional del titular: cambiar
   * en cuanto exista un buzón del dominio (p. ej. contacto@fiscalit.es).
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "lecastvarg@gmail.com",
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
  /**
   * Titular del sitio a efectos del art. 10 LSSI-CE. Sobrescribible vía
   * NEXT_PUBLIC_LEGAL_NAME en el entorno de build (p. ej. si más adelante
   * se constituye una sociedad y el titular pasa a ser esa razón social).
   */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Leexny David Castellano Vargas",
  /** NIF/CIF del titular. Sobrescribible vía NEXT_PUBLIC_LEGAL_TAX_ID en el entorno de build. */
  taxId: process.env.NEXT_PUBLIC_LEGAL_TAX_ID ?? "Y1578539V",
  /** Domicilio a efectos de notificaciones (LSSI-CE art. 10). Sobrescribible vía NEXT_PUBLIC_LEGAL_ADDRESS. */
  legalAddress: process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? "Calle Reial, 9, 2º-3ª, 43003 Tarragona (España)",
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
