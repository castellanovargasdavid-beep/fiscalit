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
 *
 * Importante para la UI: la retención que aquí se calcula la ingresa en
 * Hacienda el CLIENTE (pagador/retenedor) mediante el Modelo 111, no el
 * autónomo que emite la factura. Para el autónomo funciona como un anticipo
 * de su propio IRPF, que se resta del Modelo 130 (pago fraccionado
 * trimestral); si al menos el 70% de sus ingresos del ejercicio anterior
 * llevaron retención, queda exento de ingresar cuota en el Modelo 130 (art.
 * 110.3 Reglamento IRPF). El IAE, por separado, está exento para personas
 * físicas y empresas con cifra de negocio inferior a 1.000.000 € (art. 82
 * TRLHL): no depende de la sección IAE ni del tipo de retención calculados
 * aquí.
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
