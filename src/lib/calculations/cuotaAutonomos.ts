import { round2 } from "./shared";

export type TipoAutonomo = "individual" | "societario";

/**
 * Deducción por gastos de difícil justificación que se resta del
 * rendimiento neto antes de ubicarlo en la tabla de tramos de cotización
 * (distinta de la deducción por gastos genéricos del IRPF).
 */
export const DEDUCCION_GASTOS_DIFICIL_JUSTIFICACION: Record<TipoAutonomo, number> = {
  individual: 0.07,
  societario: 0.03,
};

/**
 * Tipo de cotización total aproximado aplicado sobre la base elegida
 * (contingencias comunes + contingencias profesionales + cese de actividad
 * + formación profesional). Debe revisarse cada año con la Ley de
 * Presupuestos / normativa de cotización vigente.
 */
export const TIPO_COTIZACION_TOTAL_RETA = 0.312;

export interface TramoCotizacionRETA {
  tramo: number;
  /** Rendimiento neto mensual mínimo (incluido) para pertenecer al tramo. */
  rendimientoNetoMinimo: number;
  /** Rendimiento neto mensual máximo (excluido). `null` = sin límite superior. */
  rendimientoNetoMaximo: number | null;
  baseMinima: number;
  baseMaxima: number;
}

/**
 * Tabla general de tramos de cotización RETA por rendimientos netos reales
 * (Real Decreto-ley 13/2022 y desarrollos posteriores). Verifica y
 * actualiza estos importes cada ejercicio con la tabla publicada por la
 * Seguridad Social/BOE.
 */
export const TABLA_TRAMOS_RETA: TramoCotizacionRETA[] = [
  { tramo: 1, rendimientoNetoMinimo: 0, rendimientoNetoMaximo: 670, baseMinima: 751.63, baseMaxima: 849.67 },
  { tramo: 2, rendimientoNetoMinimo: 670, rendimientoNetoMaximo: 900, baseMinima: 849.67, baseMaxima: 900 },
  { tramo: 3, rendimientoNetoMinimo: 900, rendimientoNetoMaximo: 1_166.7, baseMinima: 898.69, baseMaxima: 1_166.7 },
  { tramo: 4, rendimientoNetoMinimo: 1_166.7, rendimientoNetoMaximo: 1_300, baseMinima: 900, baseMaxima: 1_300 },
  { tramo: 5, rendimientoNetoMinimo: 1_300, rendimientoNetoMaximo: 1_500, baseMinima: 960.78, baseMaxima: 1_500 },
  { tramo: 6, rendimientoNetoMinimo: 1_500, rendimientoNetoMaximo: 1_700, baseMinima: 960.78, baseMaxima: 1_700 },
  { tramo: 7, rendimientoNetoMinimo: 1_700, rendimientoNetoMaximo: 1_850, baseMinima: 1_013.07, baseMaxima: 1_850 },
  { tramo: 8, rendimientoNetoMinimo: 1_850, rendimientoNetoMaximo: 2_030, baseMinima: 1_029.41, baseMaxima: 2_030 },
  { tramo: 9, rendimientoNetoMinimo: 2_030, rendimientoNetoMaximo: 2_330, baseMinima: 1_045.75, baseMaxima: 2_330 },
  { tramo: 10, rendimientoNetoMinimo: 2_330, rendimientoNetoMaximo: 2_760, baseMinima: 1_078.43, baseMaxima: 2_760 },
  { tramo: 11, rendimientoNetoMinimo: 2_760, rendimientoNetoMaximo: 3_190, baseMinima: 1_143.79, baseMaxima: 3_190 },
  { tramo: 12, rendimientoNetoMinimo: 3_190, rendimientoNetoMaximo: 3_620, baseMinima: 1_209.15, baseMaxima: 3_620 },
  { tramo: 13, rendimientoNetoMinimo: 3_620, rendimientoNetoMaximo: 4_050, baseMinima: 1_274.51, baseMaxima: 4_050 },
  { tramo: 14, rendimientoNetoMinimo: 4_050, rendimientoNetoMaximo: 6_000, baseMinima: 1_372.55, baseMaxima: 4_139.4 },
  { tramo: 15, rendimientoNetoMinimo: 6_000, rendimientoNetoMaximo: null, baseMinima: 1_633.99, baseMaxima: 4_139.4 },
];

export interface ResultadoCuotaAutonomo {
  tipoAutonomo: TipoAutonomo;
  rendimientoNetoAnual: number;
  /** Rendimiento neto anual tras aplicar la deducción por gastos de difícil justificación. */
  rendimientoNetoComputable: number;
  rendimientoNetoMensual: number;
  tramoAsignado: TramoCotizacionRETA;
  baseMinima: number;
  baseMaxima: number;
  cuotaMensualMinima: number;
  cuotaMensualMaxima: number;
  cuotaAnualMinimaEstimada: number;
  cuotaAnualMaximaEstimada: number;
}

function localizarTramo(rendimientoNetoMensual: number): TramoCotizacionRETA {
  const rendimientoAcotado = Math.max(0, rendimientoNetoMensual);
  return (
    TABLA_TRAMOS_RETA.find(
      (tramo) =>
        rendimientoAcotado >= tramo.rendimientoNetoMinimo &&
        (tramo.rendimientoNetoMaximo === null || rendimientoAcotado < tramo.rendimientoNetoMaximo),
    ) ?? TABLA_TRAMOS_RETA[TABLA_TRAMOS_RETA.length - 1]
  );
}

/**
 * Calcula el tramo de cotización RETA y la cuota mensual/anual estimada a
 * partir del rendimiento neto anual real de la actividad.
 *
 * @param rendimientoNetoAnual Ingresos menos gastos deducibles del ejercicio.
 * @param tipoAutonomo `"individual"` aplica el 7% de deducción por gastos de
 *   difícil justificación; `"societario"` aplica el 3% y nunca puede
 *   cotizar por el tramo 1 (reservado a autónomos por cuenta propia).
 * @param mesesActividad Meses de alta en el ejercicio (12 por defecto).
 */
export function calcularCuotaAutonomo(
  rendimientoNetoAnual: number,
  tipoAutonomo: TipoAutonomo = "individual",
  mesesActividad: number = 12,
): ResultadoCuotaAutonomo {
  const deduccion = DEDUCCION_GASTOS_DIFICIL_JUSTIFICACION[tipoAutonomo];
  const rendimientoNetoComputable = rendimientoNetoAnual * (1 - deduccion);
  const meses = mesesActividad > 0 ? mesesActividad : 12;
  const rendimientoNetoMensual = rendimientoNetoComputable / meses;

  const tramoLocalizado = localizarTramo(rendimientoNetoMensual);
  const tramoAsignado =
    tipoAutonomo === "societario" && tramoLocalizado.tramo === 1
      ? TABLA_TRAMOS_RETA[1]
      : tramoLocalizado;

  const cuotaMensualMinima = round2(tramoAsignado.baseMinima * TIPO_COTIZACION_TOTAL_RETA);
  const cuotaMensualMaxima = round2(tramoAsignado.baseMaxima * TIPO_COTIZACION_TOTAL_RETA);

  return {
    tipoAutonomo,
    rendimientoNetoAnual: round2(rendimientoNetoAnual),
    rendimientoNetoComputable: round2(rendimientoNetoComputable),
    rendimientoNetoMensual: round2(rendimientoNetoMensual),
    tramoAsignado,
    baseMinima: tramoAsignado.baseMinima,
    baseMaxima: tramoAsignado.baseMaxima,
    cuotaMensualMinima,
    cuotaMensualMaxima,
    cuotaAnualMinimaEstimada: round2(cuotaMensualMinima * 12),
    cuotaAnualMaximaEstimada: round2(cuotaMensualMaxima * 12),
  };
}
