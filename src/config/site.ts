export const siteConfig = {
  name: "Fiscalit",
  description:
    "Herramientas fiscales gratuitas para autónomos y micropymes en España: calculadoras, generadores y guías para llevar tu negocio sin sorpresas de Hacienda.",
  /** Dominio canónico del sitio, sin barra final. Sobrescribible vía NEXT_PUBLIC_SITE_URL en el entorno de build. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fiscalit.es",
};

export const mainNav: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Herramientas", href: "/herramientas" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre Fiscalit", href: "/sobre-fiscalit" },
];
