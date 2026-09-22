const formatterSinDecimales = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const formatterConDecimales = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
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
