import { calcularCuotaAutonomo, type ResultadoCuotaAutonomo } from "./cuotaAutonomos";
import { ESCALA_BASE_AHORRO_IRPF, ESCALA_GENERAL_IRPF, calcularImpuestoProgresivo, round2 } from "./shared";

export type TipoTributacionIS = "microempresa" | "general";

/**
 * Tipos del Impuesto sobre Sociedades. El tipo reducido de microempresas
 * (Ley 7/2024) aplica a entidades con cifra de negocio inferior al umbral;
 * revisa el porcentaje vigente cada ejercicio.
 */
export const TIPO_IMPUESTO_SOCIEDADES: Record<TipoTributacionIS, number> = {
  microempresa: 0.23,
  general: 0.25,
};

/** Cifra de negocio anual por debajo de la cual aplica el tipo reducido de microempresas. */
export const UMBRAL_FACTURACION_MICROEMPRESA = 1_000_000;

export interface AutonomoVsSLInput {
  /** Ingresos (facturación) anuales del negocio, antes de gastos. */
  ingresosAnuales: number;
  /** Gastos deducibles anuales (sin incluir cuotas RETA ni salario del administrador). */
  gastosDeduciblesAnuales: number;
  /**
   * Salario bruto anual que se asigna al administrador en el escenario de
   * Sociedad Limitada. No aplica al escenario de Autónomo.
   */
  salarioBrutoAdministrador: number;
}

export interface DesgloseImporte {
  concepto: string;
  importe: number;
}

export interface ResultadoEscenarioAutonomo {
  rendimientoNetoAnual: number;
  cuotaReta: ResultadoCuotaAutonomo;
  cuotaRetaAnual: number;
  baseImponibleIRPF: number;
  cuotaIRPF: number;
  netoDisponible: number;
  desglose: DesgloseImporte[];
}

export interface ResultadoEscenarioSL {
  tipoTributacionIS: TipoTributacionIS;
  tipoImpuestoSociedades: number;
  rendimientoNetoAnual: number;
  /** Cuota RETA societaria del administrador, tratada como gasto deducible de la sociedad. */
  cuotaRetaSocietaria: ResultadoCuotaAutonomo;
  cuotaRetaSocietariaAnual: number;
  salarioBrutoAdministrador: number;
  irpfNomina: number;
  salarioNetoAdministrador: number;
  baseImponibleIS: number;
  cuotaImpuestoSociedades: number;
  beneficioDespuesDeImpuestos: number;
  dividendosBrutos: number;
  tributacionDividendos: number;
  dividendosNetos: number;
  netoDisponible: number;
  desglose: DesgloseImporte[];
}

export interface ComparativaAutonomoVsSL {
  autonomo: ResultadoEscenarioAutonomo;
  sociedadLimitada: ResultadoEscenarioSL;
  /** Diferencia en euros: neto disponible SL − neto disponible Autónomo. */
  diferenciaNeta: number;
  opcionMasVentajosa: "autonomo" | "sociedad_limitada" | "equivalente";
}

/**
 * Compara el neto disponible anual entre operar como Autónomo (persona
 * física en RETA) y como Sociedad Limitada, incluyendo IRPF/RETA en el
 * primer caso e Impuesto sobre Sociedades + nómina del administrador +
 * tributación de dividendos en el segundo.
 *
 * Simplificaciones asumidas: la cuota RETA elegida es siempre la base
 * mínima del tramo correspondiente; la cuota RETA societaria se contabiliza
 * como gasto deducible de la sociedad; no se aplican mínimos personales ni
 * familiares al calcular el IRPF de la nómina del administrador.
 */
export function compararAutonomoVsSL(input: AutonomoVsSLInput): ComparativaAutonomoVsSL {
  const rendimientoNetoAnual = input.ingresosAnuales - input.gastosDeduciblesAnuales;

  // --- Escenario Autónomo ---
  const cuotaReta = calcularCuotaAutonomo(rendimientoNetoAnual, "individual");
  const cuotaRetaAnual = cuotaReta.cuotaAnualMinimaEstimada;
  const baseImponibleIRPFAutonomo = Math.max(0, rendimientoNetoAnual - cuotaRetaAnual);
  const cuotaIRPFAutonomo = round2(
    calcularImpuestoProgresivo(baseImponibleIRPFAutonomo, ESCALA_GENERAL_IRPF),
  );
  const netoDisponibleAutonomo = round2(rendimientoNetoAnual - cuotaRetaAnual - cuotaIRPFAutonomo);

  const autonomo: ResultadoEscenarioAutonomo = {
    rendimientoNetoAnual: round2(rendimientoNetoAnual),
    cuotaReta,
    cuotaRetaAnual,
    baseImponibleIRPF: round2(baseImponibleIRPFAutonomo),
    cuotaIRPF: cuotaIRPFAutonomo,
    netoDisponible: netoDisponibleAutonomo,
    desglose: [
      { concepto: "Rendimiento neto", importe: round2(rendimientoNetoAnual) },
      { concepto: "Cuota RETA anual", importe: -cuotaRetaAnual },
      { concepto: "IRPF", importe: -cuotaIRPFAutonomo },
      { concepto: "Neto disponible", importe: netoDisponibleAutonomo },
    ],
  };

  // --- Escenario Sociedad Limitada ---
  const tipoTributacionIS: TipoTributacionIS =
    input.ingresosAnuales <= UMBRAL_FACTURACION_MICROEMPRESA ? "microempresa" : "general";
  const tipoImpuestoSociedades = TIPO_IMPUESTO_SOCIEDADES[tipoTributacionIS];

  const cuotaRetaSocietaria = calcularCuotaAutonomo(rendimientoNetoAnual, "societario");
  const cuotaRetaSocietariaAnual = cuotaRetaSocietaria.cuotaAnualMinimaEstimada;

  const irpfNomina = round2(
    calcularImpuestoProgresivo(input.salarioBrutoAdministrador, ESCALA_GENERAL_IRPF),
  );
  const salarioNetoAdministrador = round2(input.salarioBrutoAdministrador - irpfNomina);

  const baseImponibleIS = Math.max(
    0,
    rendimientoNetoAnual - input.salarioBrutoAdministrador - cuotaRetaSocietariaAnual,
  );
  const cuotaImpuestoSociedades = round2(baseImponibleIS * tipoImpuestoSociedades);
  const beneficioDespuesDeImpuestos = round2(baseImponibleIS - cuotaImpuestoSociedades);

  const dividendosBrutos = beneficioDespuesDeImpuestos;
  const tributacionDividendos = round2(
    calcularImpuestoProgresivo(dividendosBrutos, ESCALA_BASE_AHORRO_IRPF),
  );
  const dividendosNetos = round2(dividendosBrutos - tributacionDividendos);

  const netoDisponibleSL = round2(salarioNetoAdministrador + dividendosNetos);

  const sociedadLimitada: ResultadoEscenarioSL = {
    tipoTributacionIS,
    tipoImpuestoSociedades,
    rendimientoNetoAnual: round2(rendimientoNetoAnual),
    cuotaRetaSocietaria,
    cuotaRetaSocietariaAnual,
    salarioBrutoAdministrador: round2(input.salarioBrutoAdministrador),
    irpfNomina,
    salarioNetoAdministrador,
    baseImponibleIS: round2(baseImponibleIS),
    cuotaImpuestoSociedades,
    beneficioDespuesDeImpuestos,
    dividendosBrutos,
    tributacionDividendos,
    dividendosNetos,
    netoDisponible: netoDisponibleSL,
    desglose: [
      { concepto: "Salario neto administrador", importe: salarioNetoAdministrador },
      { concepto: "Impuesto sobre Sociedades", importe: -cuotaImpuestoSociedades },
      { concepto: "Cuota RETA societaria anual", importe: -cuotaRetaSocietariaAnual },
      { concepto: "Dividendos netos", importe: dividendosNetos },
      { concepto: "Neto disponible", importe: netoDisponibleSL },
    ],
  };

  const diferenciaNeta = round2(netoDisponibleSL - netoDisponibleAutonomo);
  const opcionMasVentajosa =
    Math.abs(diferenciaNeta) < 1
      ? "equivalente"
      : diferenciaNeta > 0
        ? "sociedad_limitada"
        : "autonomo";

  return { autonomo, sociedadLimitada, diferenciaNeta, opcionMasVentajosa };
}
