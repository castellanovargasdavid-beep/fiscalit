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
  | "lead_form_submitted";

export interface AnalyticsPayload {
  /** Único dato de contexto permitido: el slug de la herramienta (p. ej. "calculadora-cuota-autonomos"). */
  tool?: string;
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

  const body = JSON.stringify({ event, tool: payload?.tool, ts: Date.now() });

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
