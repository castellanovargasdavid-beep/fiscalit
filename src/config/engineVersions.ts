export interface FichaVersionMotor {
  motor: string;
  version: string;
  disposiciones: string;
}

/**
 * Fuente única de verdad del versionado normativo de los 6 motores de
 * cálculo: la consumen tanto `/metodologia` (cara pública) como el panel
 * interno `/control-interno-operaciones` (vigilancia normativa), para que
 * ambas vistas no puedan divergir entre sí.
 */
export const ENGINE_VERSIONS: FichaVersionMotor[] = [
  {
    motor: "Autónomo vs Sociedad Limitada",
    version: "SL-2026.1",
    disposiciones:
      "Real Decreto-ley 13/2022 (cotización RETA); Ley 7/2024, escala progresiva del tipo reducido de microempresas en el Impuesto sobre Sociedades para 2026 (19% hasta 50.000€ de base imponible, 21% al resto); Ley 35/2006 del IRPF.",
  },
  {
    motor: "Calculadora de cuota de autónomos",
    version: "RETA-2026.1",
    disposiciones:
      "Orden PJC/297/2026, de bases y tipos de cotización a la Seguridad Social para el ejercicio 2026; Real Decreto-ley 13/2022, nuevo sistema de cotización por rendimientos netos reales.",
  },
  {
    motor: "Diagnóstico VeriFactu",
    version: "VF-2027.1",
    disposiciones:
      "Real Decreto-ley 15/2025, ampliación de plazos de VeriFactu a 2027; Real Decreto 1007/2023 y Real Decreto 254/2025, Reglamento de facturación; Orden HAC/1177/2024, especificaciones técnicas.",
  },
  {
    motor: "Kilometraje y dietas exentas",
    version: "KM-2026.1",
    disposiciones:
      "Orden HFP/792/2023, revisión de dietas y gastos de locomoción (0,26 €/km exentos en rendimientos del trabajo); arts. 9 y 30.2.5ª de la Ley 35/2006 del IRPF; art. 22.4 del Reglamento del IRPF (Real Decreto 439/2007).",
  },
  {
    motor: "Retención IRPF en factura / IAE",
    version: "IAE-2026.1",
    disposiciones:
      "Art. 95 del Reglamento del IRPF (Real Decreto 439/2007), retención en factura de actividades profesionales; art. 82 del Texto Refundido de la Ley de Haciendas Locales (exención del IAE con cifra de negocio inferior a 1.000.000€); arts. 101 de la Ley 35/2006 del IRPF y 110.3 del Reglamento del IRPF.",
  },
  {
    motor: "Devolución por pluriactividad",
    version: "PLURI-2026.1",
    disposiciones:
      "Art. 313 del Real Decreto Legislativo 8/2015, Texto Refundido de la Ley General de la Seguridad Social; Resolución anual de la Tesorería General de la Seguridad Social, tope conjunto de cotización 2026 (17.323,68€).",
  },
];

/** Busca la ficha de versión de un motor por su nombre exacto (`motor`). Lanza si no existe: cada herramienta debe tener su ficha dada de alta aquí. */
export function getEngineVersion(motor: string): FichaVersionMotor {
  const ficha = ENGINE_VERSIONS.find((item) => item.motor === motor);
  if (!ficha) {
    throw new Error(`No existe ficha de versión de motor para "${motor}" en src/config/engineVersions.ts`);
  }
  return ficha;
}
