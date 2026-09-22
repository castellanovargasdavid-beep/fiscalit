import { calcularCuotaAutonomo, type ResultadoCuotaAutonomo } from "./cuotaAutonomos";
import {
  ESCALA_BASE_AHORRO_IRPF,
  calcularImpuestoProgresivo,
  escalaGeneralIrpfPorComunidad,
  round2,
  type ComunidadAutonoma,
  type TramoImpositivo,
} from "./shared";

export type { ComunidadAutonoma } from "./shared";

export type TipoTributacionIS = "microempresa" | "general";

/** Tipo general del Impuesto sobre Sociedades (art. 29.1 LIS). */
export const TIPO_IMPUESTO_SOCIEDADES_GENERAL = 0.25;

/**
 * Escala progresiva del tipo reducido de "microempresas" (cifra de negocio
 * inferior al umbral) introducida por la Ley 7/2024, en su calendario de
 * implantación para el ejercicio 2026: 19% hasta los primeros 50.000€ de
 * base imponible, 21% al resto (art. 29 LIS). Revisa los porcentajes cada
 * ejercicio: 2025 fue 21%/22% y 2027 tiene previsto un nuevo descenso a
 * 17%/20%.
 */
export const ESCALA_IS_MICROEMPRESA_2026: TramoImpositivo[] = [
  { desde: 0, hasta: 50_000, tipo: 0.19 },
  { desde: 50_000, hasta: null, tipo: 0.21 },
];

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
  /** Comunidad autónoma para aplicar un ajuste aproximado de IRPF (opcional, por defecto "general"). */
  comunidadAutonoma?: ComunidadAutonoma;
  /** Gasto anual de gestoría en el escenario Autónomo (opcional, por defecto 0). */
  gestoriaAnualAutonomo?: number;
  /** Gasto anual de gestoría en el escenario Sociedad Limitada (opcional, por defecto 0). */
  gestoriaAnualSL?: number;
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
  /**
   * Tipo efectivo de Impuesto sobre Sociedades aplicado (cuota / base
   * imponible). En "microempresa" surge de la escala progresiva 19%/21% y
   * puede ser un tipo medio entre ambos tramos; en "general" coincide con
   * el tipo fijo del 25%.
   */
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
  const comunidadAutonoma = input.comunidadAutonoma ?? "general";
  const escalaGeneralAjustada = escalaGeneralIrpfPorComunidad(comunidadAutonoma);
  const gestoriaAnualAutonomo = input.gestoriaAnualAutonomo ?? 0;
  const gestoriaAnualSL = input.gestoriaAnualSL ?? 0;

  // --- Escenario Autónomo ---
  const cuotaReta = calcularCuotaAutonomo(rendimientoNetoAnual, "individual");
  const cuotaRetaAnual = cuotaReta.cuotaAnualMinimaEstimada;
  const baseImponibleIRPFAutonomo = Math.max(0, rendimientoNetoAnual - cuotaRetaAnual);
  const cuotaIRPFAutonomo = round2(
    calcularImpuestoProgresivo(baseImponibleIRPFAutonomo, escalaGeneralAjustada),
  );
  const netoDisponibleAutonomo = round2(
    rendimientoNetoAnual - cuotaRetaAnual - cuotaIRPFAutonomo - gestoriaAnualAutonomo,
  );

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
      ...(gestoriaAnualAutonomo > 0
        ? [{ concepto: "Gestoría", importe: -round2(gestoriaAnualAutonomo) }]
        : []),
      { concepto: "Neto disponible", importe: netoDisponibleAutonomo },
    ],
  };

  // --- Escenario Sociedad Limitada ---
  const tipoTributacionIS: TipoTributacionIS =
    input.ingresosAnuales <= UMBRAL_FACTURACION_MICROEMPRESA ? "microempresa" : "general";

  const cuotaRetaSocietaria = calcularCuotaAutonomo(rendimientoNetoAnual, "societario");
  const cuotaRetaSocietariaAnual = cuotaRetaSocietaria.cuotaAnualMinimaEstimada;

  const irpfNomina = round2(
    calcularImpuestoProgresivo(input.salarioBrutoAdministrador, escalaGeneralAjustada),
  );
  const salarioNetoAdministrador = round2(input.salarioBrutoAdministrador - irpfNomina);

  const baseImponibleIS = Math.max(
    0,
    rendimientoNetoAnual - input.salarioBrutoAdministrador - cuotaRetaSocietariaAnual,
  );
  const cuotaImpuestoSociedades = round2(
    tipoTributacionIS === "microempresa"
      ? calcularImpuestoProgresivo(baseImponibleIS, ESCALA_IS_MICROEMPRESA_2026)
      : baseImponibleIS * TIPO_IMPUESTO_SOCIEDADES_GENERAL,
  );
  const tipoImpuestoSociedades =
    baseImponibleIS > 0
      ? round2(cuotaImpuestoSociedades / baseImponibleIS)
      : tipoTributacionIS === "microempresa"
        ? ESCALA_IS_MICROEMPRESA_2026[0].tipo
        : TIPO_IMPUESTO_SOCIEDADES_GENERAL;
  const beneficioDespuesDeImpuestos = round2(baseImponibleIS - cuotaImpuestoSociedades);

  const dividendosBrutos = beneficioDespuesDeImpuestos;
  const tributacionDividendos = round2(
    calcularImpuestoProgresivo(dividendosBrutos, ESCALA_BASE_AHORRO_IRPF),
  );
  const dividendosNetos = round2(dividendosBrutos - tributacionDividendos);

  const netoDisponibleSL = round2(salarioNetoAdministrador + dividendosNetos - gestoriaAnualSL);

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
      ...(gestoriaAnualSL > 0 ? [{ concepto: "Gestoría", importe: -round2(gestoriaAnualSL) }] : []),
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
