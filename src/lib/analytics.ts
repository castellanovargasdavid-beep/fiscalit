import { siteConfig } from "@/config/site";

/**
 * Lista cerrada de eventos permitidos. Cualquier evento nuevo debe añadirse
 * aquí explícitamente: no se pueden emitir nombres arbitrarios ni construir
 * eventos con datos dinámicos del usuario.
 *
 * El embudo de una calculadora, en orden: `tool_viewed` (se abre la
 * herramienta) → `calculation_started` (primer cambio real de un input,
 * nunca el render inicial con los valores por defecto) →
 * `calculation_interaction` (cambios posteriores) → `result_viewed` (se
 * muestra un resultado estable tras esa interacción; puede repetirse) →
 * `calculation_completed` (la primera vez que ese resultado estable se
 * alcanza tras interacción real; una sola vez por visita). Después,
 * acciones de conversión: `pdf_download`, `simulation_share`,
 * `affiliate_click`.
 */
export type AnalyticsEvent =
  | "tool_viewed"
  | "calculation_started"
  | "calculation_interaction"
  | "result_viewed"
  | "calculation_completed"
  | "pdf_download"
  | "simulation_share"
  | "affiliate_click"
  | "csv_downloaded"
  | "embed_code_copied"
  | "newsletter_subscribed"
  | "lead_form_submitted";

export interface AnalyticsPayload {
  /** Único dato de contexto permitido: el slug de la herramienta (p. ej. "calculadora-cuota-autonomos"). */
  tool?: string;
  /** Nombre del partner de afiliación (p. ej. "Quipu"), solo para "affiliate_click". Nunca datos del usuario. */
  partner?: string;
}

/**
 * Punto único y auditable por el que Fiscalit podría enviar analítica de
 * interacción. Es deliberadamente estrecho: solo acepta un nombre de
 * evento de la lista cerrada `AnalyticsEvent` y, como mucho, el slug de la
 * herramienta. La firma de tipos hace estructuralmente imposible adjuntar
 * ingresos, gastos, cuotas, salarios o cualquier otra cifra que el usuario
 * haya introducido en una calculadora: eso nunca debe salir del navegador.
 *
 * Hoy es un no-op: `siteConfig.analyticsEndpoint` está vacío porque
 * Fiscalit no usa ninguna herramienta de analítica. Si en el futuro se
 * configura un proveedor, esta función —y solo esta función— es la vía
 * permitida para enviarle eventos.
 */
export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (typeof window === "undefined" || !siteConfig.analyticsEndpoint) return;

  const body = JSON.stringify({ event, tool: payload?.tool, partner: payload?.partner, ts: Date.now() });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(siteConfig.analyticsEndpoint, body);
      return;
    }
    void fetch(siteConfig.analyticsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // El envío de analítica nunca debe romper la experiencia de la calculadora.
  }
}

/** Se ha abierto la herramienta (una vez por visita; es una vista de página, no una acción de cálculo). */
export function trackToolViewed(toolSlug: string): void {
  trackEvent("tool_viewed", { tool: toolSlug });
}

/** El usuario ha cambiado un input por primera vez en esta visita (nunca se dispara con los valores por defecto). */
export function trackCalculationStarted(toolSlug: string): void {
  trackEvent("calculation_started", { tool: toolSlug });
}

/** El usuario sigue ajustando inputs tras el primer cambio. */
export function trackCalculationInteraction(toolSlug: string): void {
  trackEvent("calculation_interaction", { tool: toolSlug });
}

/** Se muestra un resultado estable tras una interacción real (puede repetirse si el usuario sigue ajustando). */
export function trackResultViewed(toolSlug: string): void {
  trackEvent("result_viewed", { tool: toolSlug });
}

/** El usuario alcanza por primera vez un resultado estable tras interactuar de verdad (una sola vez por visita). */
export function trackCalculationCompleted(toolSlug: string): void {
  trackEvent("calculation_completed", { tool: toolSlug });
}

/** El usuario ha descargado el informe en PDF de su simulación. */
export function trackPdfDownload(toolSlug: string): void {
  trackEvent("pdf_download", { tool: toolSlug });
}

/** El usuario ha copiado el enlace para compartir su simulación. */
export function trackSimulationShare(toolSlug: string): void {
  trackEvent("simulation_share", { tool: toolSlug });
}

/** El usuario ha pulsado un enlace de afiliado hacia `partnerName` desde la herramienta `toolSlug`. */
export function trackAffiliateClick(partnerName: string, toolSlug: string): void {
  trackEvent("affiliate_click", { tool: toolSlug, partner: partnerName });
}
