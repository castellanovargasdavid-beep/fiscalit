import { useEffect, useSyncExternalStore } from "react";
import { trackCalculationCompleted } from "@/lib/analytics";

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
 * Dispara `trackCalculationCompleted` cuando el resultado de una
 * calculadora lleva un momento estable (debounce de 1,5 s), en vez de en
 * cada cambio de slider: mide "el usuario llegó a un resultado", no cada
 * tecleo. `resultKey` es cualquier valor que cambie cuando cambia el
 * resultado (normalmente el propio objeto de resultado del `useMemo`).
 */
export function useTrackCalculationCompleted(toolSlug: string, resultKey: unknown): void {
  useEffect(() => {
    const id = window.setTimeout(() => trackCalculationCompleted(toolSlug), 1500);
    return () => window.clearTimeout(id);
  }, [toolSlug, resultKey]);
}
