import { round2 } from "./shared";

/**
 * Tope máximo anual de cotización por contingencias comunes a efectos de
 * pluriactividad (art. 313 del Real Decreto Legislativo 8/2015, TRLGSS). Se
 * publica cada año mediante Resolución de la Tesorería General de la
 * Seguridad Social: para 2026 el límite conjunto es de 17.323,68€ (frente a
 * los 16.672,66€ de 2025); actualízalo cada ejercicio.
 */
export const TOPE_MAXIMO_PLURIACTIVIDAD_ANUAL = 17_323.68;

/** Porcentaje del exceso cotizado que da derecho a devolución. */
export const PORCENTAJE_DEVOLUCION_EXCESO = 0.5;

export interface PluriactividadInput {
  /** Cuota anual ingresada por contingencias comunes en Régimen General (cuenta ajena). */
  cotizacionRegimenGeneralAnual: number;
  /** Cuota anual ingresada por contingencias comunes en RETA (cuenta propia). */
  cotizacionRETAAnual: number;
}

export interface PluriactividadResult {
  totalCotizado: number;
  topeMaximoAnual: number;
  excesoCotizado: number;
  tieneDerechoDevolucion: boolean;
  /**
   * 50% del exceso cotizado, limitado al 50% de las cuotas ingresadas en
   * el RETA por contingencias comunes de cobertura obligatoria.
   */
  importeDevolucion: number;
}

/**
 * Compara las cotizaciones simultáneas en Régimen General y RETA frente al
 * tope máximo legal anual y calcula el derecho a devolución por exceso de
 * cotización en situación de pluriactividad.
 */
export function calcularPluriactividad(input: PluriactividadInput): PluriactividadResult {
  const totalCotizado = round2(
    input.cotizacionRegimenGeneralAnual + input.cotizacionRETAAnual,
  );
  const excesoCotizado = round2(Math.max(0, totalCotizado - TOPE_MAXIMO_PLURIACTIVIDAD_ANUAL));
  const tieneDerechoDevolucion = excesoCotizado > 0;

  const limiteDevolucion = round2(input.cotizacionRETAAnual * PORCENTAJE_DEVOLUCION_EXCESO);
  const importeDevolucion = tieneDerechoDevolucion
    ? Math.min(round2(excesoCotizado * PORCENTAJE_DEVOLUCION_EXCESO), limiteDevolucion)
    : 0;

  return {
    totalCotizado,
    topeMaximoAnual: TOPE_MAXIMO_PLURIACTIVIDAD_ANUAL,
    excesoCotizado,
    tieneDerechoDevolucion,
    importeDevolucion: round2(importeDevolucion),
  };
}
