import { round2 } from "./shared";

/** Sección del IAE: "1" = actividad empresarial, "2" = actividad profesional. */
export type SeccionIAE = "1" | "2";
export type TipoActividad = "empresarial" | "profesional";

/** Tipos de IVA vigentes en España aplicables a la base imponible de una factura. */
export type TipoIVA = 21 | 10 | 4 | 0;

export const RETENCION_IRPF_PROFESIONAL_GENERAL = 0.15;
export const RETENCION_IRPF_PROFESIONAL_REDUCIDA_NUEVO_AUTONOMO = 0.07;

export interface RetencionIAEInput {
  seccionIAE: SeccionIAE;
  /** `true` si está en el ejercicio de alta o en los dos siguientes. */
  esNuevoAutonomo: boolean;
  baseImponible: number;
  tipoIVA: TipoIVA;
}

export interface RetencionIAEResult {
  seccionIAE: SeccionIAE;
  tipoActividad: TipoActividad;
  tipoRetencionIRPF: number;
  motivoRetencion: string;
  baseImponible: number;
  tipoIVA: TipoIVA;
  importeIVA: number;
  importeRetencionIRPF: number;
  totalFactura: number;
  totalLiquidoAPercibir: number;
}

/**
 * Determina el tipo de retención de IRPF aplicable a una factura según la
 * sección del IAE de la actividad y simula el líquido a percibir de una
 * factura proforma.
 *
 * Las actividades empresariales (Sección 1 IAE) no llevan retención en
 * factura. Las actividades profesionales (Sección 2 IAE) llevan un 15% de
 * retención general, reducido al 7% durante el año de alta y los dos
 * siguientes (art. 101 Ley IRPF).
 */
export function calcularRetencionIAE(input: RetencionIAEInput): RetencionIAEResult {
  const tipoActividad: TipoActividad = input.seccionIAE === "1" ? "empresarial" : "profesional";

  let tipoRetencionIRPF: number;
  let motivoRetencion: string;

  if (tipoActividad === "empresarial") {
    tipoRetencionIRPF = 0;
    motivoRetencion =
      "Actividad empresarial (Sección 1 IAE): no está sujeta a retención de IRPF en factura.";
  } else if (input.esNuevoAutonomo) {
    tipoRetencionIRPF = RETENCION_IRPF_PROFESIONAL_REDUCIDA_NUEVO_AUTONOMO;
    motivoRetencion =
      "Actividad profesional (Sección 2 IAE) con tipo reducido: año de alta y los dos siguientes.";
  } else {
    tipoRetencionIRPF = RETENCION_IRPF_PROFESIONAL_GENERAL;
    motivoRetencion = "Actividad profesional (Sección 2 IAE): retención general.";
  }

  const importeIVA = round2(input.baseImponible * (input.tipoIVA / 100));
  const importeRetencionIRPF = round2(input.baseImponible * tipoRetencionIRPF);
  const totalFactura = round2(input.baseImponible + importeIVA);
  const totalLiquidoAPercibir = round2(totalFactura - importeRetencionIRPF);

  return {
    seccionIAE: input.seccionIAE,
    tipoActividad,
    tipoRetencionIRPF,
    motivoRetencion,
    baseImponible: round2(input.baseImponible),
    tipoIVA: input.tipoIVA,
    importeIVA,
    importeRetencionIRPF,
    totalFactura,
    totalLiquidoAPercibir,
  };
}
