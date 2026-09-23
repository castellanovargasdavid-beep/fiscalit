import { siteConfig } from "@/config/site";

/**
 * Lista cerrada de eventos permitidos. Cualquier evento nuevo debe añadirse
 * aquí explícitamente: no se pueden emitir nombres arbitrarios ni construir
 * eventos con datos dinámicos del usuario.
 */
export type AnalyticsEvent =
  | "tool_completed"
  | "pdf_downloaded"
  | "csv_downloaded"
  | "share_link_copied"
  | "embed_code_copied"
  | "newsletter_subscribed"
  | "lead_form_submitted"
  | "affiliate_click";

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

/** Se ha mostrado un resultado estable de la calculadora (embudo: "llegó a un resultado"). */
export function trackCalculationCompleted(toolSlug: string): void {
  trackEvent("tool_completed", { tool: toolSlug });
}

/** El usuario ha descargado el informe en PDF de su simulación. */
export function trackPdfDownload(toolSlug: string): void {
  trackEvent("pdf_downloaded", { tool: toolSlug });
}

/** El usuario ha copiado el enlace para compartir su simulación. */
export function trackSimulationShare(toolSlug: string): void {
  trackEvent("share_link_copied", { tool: toolSlug });
}

/** El usuario ha pulsado un enlace de afiliado hacia `partnerName` desde la herramienta `toolSlug`. */
export function trackAffiliateClick(partnerName: string, toolSlug: string): void {
  trackEvent("affiliate_click", { tool: toolSlug, partner: partnerName });
}
