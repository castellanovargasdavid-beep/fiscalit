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
