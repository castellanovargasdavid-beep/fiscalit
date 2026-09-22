"use client";

import { useCallback, useEffect, useState } from "react";

export type ScenarioValues = Record<string, number | string>;

/**
 * Restricción genérica para "objetos cuyos valores son todos number o
 * string", sin exigir una firma de índice explícita en el tipo del
 * llamador (a diferencia de `T extends ScenarioValues`). Así los tipos
 * `Escenario` de cada herramienta siguen siendo interfaces normales,
 * compatibles con `Partial<T>` y el spread de React sin fricción de tipos.
 */
type ScenarioLike<T> = { [K in keyof T]: number | string };

function parseValue(raw: string, sample: number | string): number | string {
  if (typeof sample === "number") {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : sample;
  }
  return raw;
}

/**
 * Lee de los query params de la URL actual los valores cuyas claves
 * coincidan con las de `defaults`, tipando cada uno según el tipo del
 * valor por defecto correspondiente. Devuelve `defaults` tal cual si no
 * hay ningún parámetro reconocido (o si se ejecuta fuera del navegador).
 */
export function readScenarioFromUrl<T extends ScenarioLike<T>>(defaults: T): T {
  if (typeof window === "undefined") return defaults;

  const params = new URLSearchParams(window.location.search);
  let changed = false;
  const result = { ...defaults };

  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const raw = params.get(String(key));
    if (raw !== null) {
      result[key] = parseValue(raw, defaults[key]) as T[keyof T];
      changed = true;
    }
  }

  return changed ? result : defaults;
}

/** Escribe los valores del escenario en la URL actual, sin recargar la página ni añadir entradas al historial. */
export function writeScenarioToUrl(values: ScenarioValues): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    params.set(key, String(value));
  }

  const query = params.toString();
  const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history.replaceState(null, "", newUrl);
}

/**
 * Aplica, una única vez justo después del montaje, los valores de escenario
 * presentes en la URL (si los hay) sobre el estado ya inicializado con los
 * valores por defecto. Al vivir en un efecto (que solo se ejecuta en el
 * cliente, tras la hidratación) la primera renderización siempre coincide
 * con el HTML estático —que no conoce la URL real— y nunca se produce un
 * desajuste de hidratación.
 */
export function useUrlSeededScenario<T extends ScenarioLike<T>>(
  defaults: T,
  setScenario: (values: T) => void,
): void {
  useEffect(() => {
    const fromUrl = readScenarioFromUrl(defaults);
    if (fromUrl !== defaults) {
      setScenario(fromUrl);
    }
  }, [defaults, setScenario]);
}

/** Mantiene la URL sincronizada con los valores actuales del escenario en cada cambio. */
export function useSyncScenarioToUrl<T extends ScenarioLike<T>>(values: T): void {
  useEffect(() => {
    writeScenarioToUrl(values);
  }, [values]);
}

/** Copia al portapapeles la URL actual (ya sincronizada) y expone un estado `copied` con reseteo automático. */
export function useCopyShareLink() {
  const [copied, setCopied] = useState(false);

  const copyShareLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { copied, copyShareLink };
}
