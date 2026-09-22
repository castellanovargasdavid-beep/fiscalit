/*
 * `useGrouping` se fija explícitamente a `true`: con el valor por defecto
 * ("auto"), algunos entornos de build aplican el `minimumGroupingDigits` del
 * locale es-ES y omiten el separador de miles en números de 4 cifras (p.
 * ej. formatean 2850 como "2850 €" en vez de "2.850 €", mientras que 31240 sí
 * sale agrupado) — inconsistencia solo visible según la build de ICU/Node,
 * así que se fuerza para que el resultado sea determinista en cualquier
 * entorno.
 */
const formatterSinDecimales = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: true,
});

const formatterConDecimales = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
  useGrouping: true,
});

export function formatEUR(value: number, decimals = false): string {
  return (decimals ? formatterConDecimales : formatterSinDecimales).format(value);
}

/** Formatea una fecha ISO (`"2026-09-22"`) en formato largo español, sin desajustes de zona horaria. */
export function formatFechaISO(fechaISO: string): string {
  return new Date(`${fechaISO}T00:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Formatea una fecha ISO (`"2026-09-22"`) como "mes año" en español (p. ej. "septiembre 2026"), sin el día. */
export function formatMesAnioISO(fechaISO: string): string {
  return new Date(`${fechaISO}T00:00:00Z`).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
