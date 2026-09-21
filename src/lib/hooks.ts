import { useSyncExternalStore } from "react";

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
