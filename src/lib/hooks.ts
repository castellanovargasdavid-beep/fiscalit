import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  trackCalculationCompleted,
  trackCalculationInteraction,
  trackCalculationStarted,
  trackResultViewed,
  trackToolViewed,
} from "@/lib/analytics";

const emptySubscribe = () => () => {};

/**
 * `true` únicamente tras la hidratación en el cliente. Útil para evitar
 * discrepancias de hidratación con contenido que depende del reloj del
 * cliente (p. ej. `new Date()`), sin recurrir a `setState` dentro de un
 * efecto.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Instrumenta el embudo completo de una calculadora: `tool_viewed` una vez
 * al montar, y luego `calculation_started` / `calculation_interaction` /
 * `result_viewed` / `calculation_completed` ligados a interacción real del
 * usuario — nunca al render inicial con los valores por defecto, que es
 * exactamente lo que hacía la versión anterior de este hook.
 *
 * `resultKey` es cualquier valor que cambie cuando cambia el resultado
 * (normalmente el propio objeto de resultado del `useMemo` de la
 * herramienta). El primer cambio de `resultKey` tras el montaje se ignora
 * a efectos de "inicio de cálculo": corresponde al escenario por defecto,
 * no a una acción del usuario.
 */
export function useCalculationFunnel(toolSlug: string, resultKey: unknown): void {
  const esPrimerRender = useRef(true);
  const haInteractuado = useRef(false);
  const haCompletado = useRef(false);

  useEffect(() => {
    trackToolViewed(toolSlug);
    // Deliberadamente sin `resultKey` en las dependencias: es una vista de página al montar, no debe repetirse en cada cambio de resultado.
  }, [toolSlug]);

  useEffect(() => {
    if (esPrimerRender.current) {
      esPrimerRender.current = false;
      return;
    }

    if (!haInteractuado.current) {
      haInteractuado.current = true;
      trackCalculationStarted(toolSlug);
    } else {
      trackCalculationInteraction(toolSlug);
    }

    const id = window.setTimeout(() => {
      trackResultViewed(toolSlug);
      if (!haCompletado.current) {
        haCompletado.current = true;
        trackCalculationCompleted(toolSlug);
      }
    }, 800);
    return () => window.clearTimeout(id);
  }, [toolSlug, resultKey]);
}
