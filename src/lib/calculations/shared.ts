/**
 * Utilidades y escalas fiscales compartidas entre las calculadoras de
 * `src/lib/calculations/`. Los tipos impositivos son los vigentes al cierre
 * de este bloque; revísalos cada año contra las leyes de PGE/IRPF/IS.
 */

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export interface TramoImpositivo {
  desde: number;
  /** `null` = sin límite superior (último tramo). */
  hasta: number | null;
  /** Tipo marginal aplicable al tramo, en tanto por uno (0.19 = 19%). */
  tipo: number;
}

/** Aplica una escala de tramos progresivos sobre una base imponible. */
export function calcularImpuestoProgresivo(
  baseImponible: number,
  tramos: TramoImpositivo[],
): number {
  if (baseImponible <= 0) return 0;

  let impuesto = 0;
  for (const tramo of tramos) {
    if (baseImponible <= tramo.desde) break;
    const limiteSuperior = tramo.hasta ?? Infinity;
    const baseEnTramo = Math.min(baseImponible, limiteSuperior) - tramo.desde;
    if (baseEnTramo <= 0) continue;
    impuesto += baseEnTramo * tramo.tipo;
  }
  return impuesto;
}

/**
 * Escala general de IRPF (estatal + autonómica media) para rendimientos del
 * trabajo/actividades económicas. Aproximación estándar usada por la mayoría
 * de simuladores cuando no se conoce la comunidad autónoma del usuario.
 */
export const ESCALA_GENERAL_IRPF: TramoImpositivo[] = [
  { desde: 0, hasta: 12_450, tipo: 0.19 },
  { desde: 12_450, hasta: 20_200, tipo: 0.24 },
  { desde: 20_200, hasta: 35_200, tipo: 0.3 },
  { desde: 35_200, hasta: 60_000, tipo: 0.37 },
  { desde: 60_000, hasta: 300_000, tipo: 0.45 },
  { desde: 300_000, hasta: null, tipo: 0.47 },
];

/**
 * Escala del ahorro (dividendos, intereses, ganancias patrimoniales),
 * común a todo el territorio y sin desglose autonómico.
 */
export const ESCALA_BASE_AHORRO_IRPF: TramoImpositivo[] = [
  { desde: 0, hasta: 6_000, tipo: 0.19 },
  { desde: 6_000, hasta: 50_000, tipo: 0.21 },
  { desde: 50_000, hasta: 200_000, tipo: 0.23 },
  { desde: 200_000, hasta: 300_000, tipo: 0.27 },
  { desde: 300_000, hasta: null, tipo: 0.3 },
];

export type ComunidadAutonoma = "general" | "madrid" | "cataluna" | "andalucia" | "comunidad_valenciana";

/**
 * Ajuste APROXIMADO (en puntos porcentuales, sumado al tipo marginal de
 * `ESCALA_GENERAL_IRPF`) para reflejar, de forma orientativa, que cada
 * comunidad autónoma fija su propio tramo autonómico de IRPF. No reproduce
 * la tabla real de cada comunidad tramo a tramo: Madrid tiende a tributar
 * por debajo de la media estatal, Cataluña y la Comunitat Valenciana por
 * encima (sobre todo en tramos altos), y Andalucía se sitúa cerca de la
 * media tras su rebaja de 2022. Úsalo solo como orientación relativa entre
 * comunidades, no como sustituto de la tabla oficial de cada una.
 */
export const AJUSTE_AUTONOMICO_IRPF: Record<ComunidadAutonoma, number> = {
  general: 0,
  madrid: -0.02,
  cataluna: 0.015,
  andalucia: -0.005,
  comunidad_valenciana: 0.01,
};

/** Aplica el ajuste autonómico aproximado a la escala general de IRPF, sin bajar ningún tramo de 0%. */
export function escalaGeneralIrpfPorComunidad(comunidad: ComunidadAutonoma): TramoImpositivo[] {
  const ajuste = AJUSTE_AUTONOMICO_IRPF[comunidad];
  if (ajuste === 0) return ESCALA_GENERAL_IRPF;
  return ESCALA_GENERAL_IRPF.map((tramo) => ({ ...tramo, tipo: Math.max(0, tramo.tipo + ajuste) }));
}
