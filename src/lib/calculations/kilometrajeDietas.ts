import { round2 } from "./shared";

export type ZonaDesplazamiento = "espana" | "extranjero";

/** Importe exento por kilómetro recorrido con vehículo propio (art. 9 Reglamento IRPF). */
export const TARIFA_KM_EXENTO = 0.26;

/** Importes exentos de dietas de manutención según haya o no pernocta. */
export const IMPORTE_DIETA_MANUTENCION: Record<
  ZonaDesplazamiento,
  { conPernocta: number; sinPernocta: number }
> = {
  espana: { conPernocta: 53.34, sinPernocta: 26.67 },
  extranjero: { conPernocta: 91.35, sinPernocta: 48.08 },
};

export interface DesplazamientoKilometraje {
  concepto: string;
  kilometros: number;
}

export interface DesplazamientoDieta {
  concepto: string;
  dias: number;
  zona: ZonaDesplazamiento;
  pernocta: boolean;
}

export interface KilometrajeDietasInput {
  kilometrajes?: DesplazamientoKilometraje[];
  dietas?: DesplazamientoDieta[];
}

export interface LineaResumenExencion {
  concepto: string;
  importeExento: number;
}

export interface KilometrajeDietasResult {
  totalKilometrosRecorridos: number;
  totalExentoKilometraje: number;
  totalExentoDietas: number;
  totalExentoIRPF: number;
  resumen: LineaResumenExencion[];
}

/**
 * Calcula el importe total exento de IRPF por kilometraje y dietas de
 * manutención, con el desglose línea a línea de cada desplazamiento.
 */
export function calcularKilometrajeDietas(
  input: KilometrajeDietasInput,
): KilometrajeDietasResult {
  const kilometrajes = input.kilometrajes ?? [];
  const dietas = input.dietas ?? [];

  const resumen: LineaResumenExencion[] = [];

  let totalKilometrosRecorridos = 0;
  let totalExentoKilometraje = 0;
  for (const viaje of kilometrajes) {
    const importe = round2(viaje.kilometros * TARIFA_KM_EXENTO);
    totalKilometrosRecorridos += viaje.kilometros;
    totalExentoKilometraje += importe;
    resumen.push({
      concepto: `${viaje.concepto} — ${viaje.kilometros} km × ${TARIFA_KM_EXENTO} €/km`,
      importeExento: importe,
    });
  }

  let totalExentoDietas = 0;
  for (const dieta of dietas) {
    const tarifaDiaria = dieta.pernocta
      ? IMPORTE_DIETA_MANUTENCION[dieta.zona].conPernocta
      : IMPORTE_DIETA_MANUTENCION[dieta.zona].sinPernocta;
    const importe = round2(dieta.dias * tarifaDiaria);
    totalExentoDietas += importe;
    resumen.push({
      concepto: `${dieta.concepto} — ${dieta.dias} día(s), ${dieta.zona === "espana" ? "España" : "extranjero"}, ${dieta.pernocta ? "con" : "sin"} pernocta`,
      importeExento: importe,
    });
  }

  return {
    totalKilometrosRecorridos,
    totalExentoKilometraje: round2(totalExentoKilometraje),
    totalExentoDietas: round2(totalExentoDietas),
    totalExentoIRPF: round2(totalExentoKilometraje + totalExentoDietas),
    resumen,
  };
}
