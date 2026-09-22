import { siteConfig } from "@/config/site";

/**
 * Token de desbloqueo del panel interno `/control-interno-operaciones`.
 * Sobrescribible vía NEXT_PUBLIC_ADMIN_ACCESS_TOKEN en el entorno de build.
 *
 * ADVERTENCIA DE SEGURIDAD: esto es una barrera de acceso en CLIENTE, no una
 * autenticación real. Fiscalit es una exportación 100% estática
 * (`output: "export"`) sin backend ni sesiones de servidor, así que
 * cualquier valor `NEXT_PUBLIC_*` queda embebido en texto plano en el
 * JavaScript que se sirve a quien visite la URL. Alguien con conocimientos
 * técnicos que abra las herramientas de desarrollador puede leer este token
 * o simplemente ejecutar `localStorage.setItem(...)` para saltarse el
 * formulario. Su única función real es evitar que un visitante casual o un
 * buscador topen con el panel por accidente, no proteger datos sensibles:
 * por eso ninguna sección de este panel expone secretos reales (API keys,
 * credenciales...), solo enlaces públicos y la misma información que ya es
 * pública en /aviso-legal. Cambia el valor por defecto antes de desplegar.
 */
export const ADMIN_ACCESS_TOKEN = process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN ?? "fiscalit-ops-2026";

/** Clave de localStorage donde se guarda el desbloqueo (no el token: solo un booleano). */
export const ADMIN_UNLOCKED_STORAGE_KEY = "fiscalit_admin_unlocked";

export interface AdminOpsLink {
  label: string;
  description: string;
  href: string;
}

/**
 * Enlaces operativos externos. `vercelProjectUrl`/`gscPropertyUrl` son
 * sobrescribibles por entorno porque dependen del proyecto/cuenta real
 * (Vercel, Search Console); sin configurar, caen a la pantalla genérica de
 * login de cada servicio.
 */
export const OPERATIONAL_LINKS: AdminOpsLink[] = [
  {
    label: "Google Search Console",
    description: "Rendimiento en buscadores, cobertura de indexación y sitemap enviado.",
    href:
      process.env.NEXT_PUBLIC_GSC_PROPERTY_URL ??
      `https://search.google.com/search-console?resource_id=${encodeURIComponent(`sc-domain:${new URL(siteConfig.url).hostname}`)}`,
  },
  {
    label: "Panel de Vercel",
    description: "Deployments, logs de build y variables de entorno del proyecto.",
    href: process.env.NEXT_PUBLIC_VERCEL_PROJECT_URL ?? "https://vercel.com/dashboard",
  },
  {
    label: "Validador de sitemap.xml",
    description: "Sitemap generado en el último build estático.",
    href: `${siteConfig.url}/sitemap.xml`,
  },
  {
    label: "Comprobador de robots.txt",
    description: "Reglas de rastreo servidas en producción.",
    href: `${siteConfig.url}/robots.txt`,
  },
];

/**
 * Enlaces oficiales de vigilancia normativa. Verificados manualmente
 * (no inventados): apuntan a las sedes/portales reales de cada organismo,
 * no a una búsqueda pre-rellenada inexistente.
 */
export const REGULATORY_WATCH_LINKS: AdminOpsLink[] = [
  {
    label: "Sede Electrónica AEAT",
    description: "Novedades normativas, notas informativas y modelos oficiales.",
    href: "https://sede.agenciatributaria.gob.es/",
  },
  {
    label: "Seguridad Social — Noticias",
    description: "Novedades de la TGSS y el Ministerio de Inclusión, Seguridad Social y Migraciones.",
    href: "https://www.seg-social.es/wps/portal/wss/internet/Novedades",
  },
  {
    label: "BOE — Buscador de legislación",
    description: "Legislación consolidada estatal (IRPF, Seguridad Social, Haciendas Locales...).",
    href: "https://www.boe.es/buscar/",
  },
];

export interface ScenarioUrlField {
  /** Debe coincidir exactamente con la clave del `Escenario` de la herramienta (ver `useScenarioShare.ts`). */
  key: string;
  label: string;
  defaultValue: number;
}

export interface ScenarioUrlToolConfig {
  /** Slug de `src/config/tools.ts`: de ahí se toman el título y el href reales. */
  slug: string;
  /**
   * `true` solo en las herramientas que llaman a `useUrlSeededScenario`
   * (hoy: Autónomo vs SL y Cuota de autónomos). En el resto, la propia
   * herramienta ignora los parámetros de la URL, así que el generador no
   * debe fingir que funcionan.
   */
  supportsUrlParams: boolean;
  fields: ScenarioUrlField[];
}

export const SCENARIO_URL_TOOLS: ScenarioUrlToolConfig[] = [
  {
    slug: "autonomo-vs-sl",
    supportsUrlParams: true,
    fields: [
      { key: "ingresosAnuales", label: "Ingresos anuales (€)", defaultValue: 60_000 },
      { key: "gastosDeduciblesAnuales", label: "Gastos deducibles anuales (€)", defaultValue: 12_000 },
      { key: "salarioBrutoAdministrador", label: "Salario bruto administrador (€)", defaultValue: 18_000 },
    ],
  },
  {
    slug: "calculadora-cuota-autonomos",
    supportsUrlParams: true,
    fields: [
      { key: "ingresosAnuales", label: "Ingresos anuales (€)", defaultValue: 30_000 },
      { key: "gastosDeduciblesAnuales", label: "Gastos deducibles anuales (€)", defaultValue: 6_000 },
    ],
  },
  { slug: "diagnostico-verifactu", supportsUrlParams: false, fields: [] },
  { slug: "calculadora-kilometraje-dietas", supportsUrlParams: false, fields: [] },
  { slug: "retencion-factura-iae", supportsUrlParams: false, fields: [] },
  { slug: "pluriactividad-devolucion", supportsUrlParams: false, fields: [] },
];
