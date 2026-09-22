/**
 * Suite de tests normativos ("sanity checks") de los 6 motores de cálculo
 * puros de Fiscalit. Cada caso está calculado a mano contra las constantes
 * y tablas vigentes en el código (tablas 2026/2027) para detectar
 * regresiones si alguien cambia una fórmula, un tipo o una tabla sin
 * querer. No sustituye una auditoría normativa externa: si cambia una
 * tabla oficial, actualiza primero el motor y luego estos casos.
 */
import { describe, expect, it } from "vitest";
import { calcularCuotaAutonomo } from "../cuotaAutonomos";
import { compararAutonomoVsSL } from "../autonomoVsSL";
import { diagnosticarVerifactu } from "../verifactu";
import { calcularKilometrajeDietas } from "../kilometrajeDietas";
import { calcularRetencionIAE } from "../retencionIAE";
import { calcularPluriactividad } from "../pluriactividad";

describe("calcularCuotaAutonomo (RETA-2026.1)", () => {
  it("ubica un rendimiento medio en el tramo 9 (individual)", () => {
    const resultado = calcularCuotaAutonomo(30_000, "individual");
    expect(resultado.rendimientoNetoComputable).toBe(27_900);
    expect(resultado.rendimientoNetoMensual).toBe(2_325);
    expect(resultado.tramoAsignado.tramo).toBe(9);
    expect(resultado.cuotaMensualMinima).toBe(326.27);
    expect(resultado.cuotaMensualMaxima).toBe(726.96);
    expect(resultado.cuotaAnualMinimaEstimada).toBe(3_915.24);
  });

  it("ubica un rendimiento alto en el último tramo (15), sin límite superior", () => {
    const resultado = calcularCuotaAutonomo(80_000, "societario");
    expect(resultado.tramoAsignado.tramo).toBe(15);
    expect(resultado.cuotaMensualMinima).toBe(509.8);
    expect(resultado.cuotaMensualMaxima).toBe(1_291.49);
    expect(resultado.cuotaAnualMinimaEstimada).toBe(6_117.6);
  });

  it("nunca asigna el tramo 1 a un autónomo societario (excepción legal)", () => {
    const resultado = calcularCuotaAutonomo(3_000, "societario");
    // Con deducción del 3%, el rendimiento mensual (242,5€) cae en el tramo 1,
    // pero el societario se reubica en el tramo 2.
    expect(resultado.tramoAsignado.tramo).toBe(2);
    expect(resultado.cuotaMensualMinima).toBe(265.1);
    expect(resultado.cuotaMensualMaxima).toBe(280.8);
  });

  it("límite inferior de la tabla: rendimiento nulo cae en el tramo 1", () => {
    const resultado = calcularCuotaAutonomo(0, "individual");
    expect(resultado.rendimientoNetoMensual).toBe(0);
    expect(resultado.tramoAsignado.tramo).toBe(1);
    expect(resultado.cuotaMensualMinima).toBe(234.51);
    expect(resultado.cuotaMensualMaxima).toBe(265.1);
  });

  it("límite superior de la tabla: el tramo 15 no tiene techo de rendimiento", () => {
    const resultado = calcularCuotaAutonomo(1_000_000, "individual");
    expect(resultado.rendimientoNetoMensual).toBe(77_500);
    expect(resultado.tramoAsignado.tramo).toBe(15);
    expect(resultado.tramoAsignado.rendimientoNetoMaximo).toBeNull();
    expect(resultado.cuotaMensualMinima).toBe(509.8);
    expect(resultado.cuotaMensualMaxima).toBe(1_291.49);
  });
});

describe("compararAutonomoVsSL (SL-2026.1)", () => {
  it("caso equilibrado: compensa seguir de autónomo", () => {
    const resultado = compararAutonomoVsSL({
      ingresosAnuales: 60_000,
      gastosDeduciblesAnuales: 12_000,
      salarioBrutoAdministrador: 18_000,
    });

    expect(resultado.autonomo.rendimientoNetoAnual).toBe(48_000);
    expect(resultado.autonomo.cuotaRetaAnual).toBe(4_771.8);
    expect(resultado.autonomo.cuotaIRPF).toBe(11_695.93);
    expect(resultado.autonomo.netoDisponible).toBe(31_532.27);

    expect(resultado.sociedadLimitada.tipoTributacionIS).toBe("microempresa");
    expect(resultado.sociedadLimitada.salarioNetoAdministrador).toBe(14_302.5);
    expect(resultado.sociedadLimitada.baseImponibleIS).toBe(25_228.2);
    // Base imponible por debajo de 50.000€: tributa íntegramente al 19%.
    expect(resultado.sociedadLimitada.cuotaImpuestoSociedades).toBe(4_793.36);
    expect(resultado.sociedadLimitada.netoDisponible).toBe(30_566.02);

    expect(resultado.diferenciaNeta).toBe(-966.25);
    expect(resultado.opcionMasVentajosa).toBe("autonomo");
  });

  it("facturación alta: compensa constituir Sociedad Limitada", () => {
    const resultado = compararAutonomoVsSL({
      ingresosAnuales: 200_000,
      gastosDeduciblesAnuales: 20_000,
      salarioBrutoAdministrador: 30_000,
    });

    expect(resultado.autonomo.netoDisponible).toBe(104_733.82);
    expect(resultado.sociedadLimitada.baseImponibleIS).toBe(143_882.4);
    // 50.000€ al 19% + el resto (93.882,4€) al 21%.
    expect(resultado.sociedadLimitada.cuotaImpuestoSociedades).toBe(29_215.3);
    expect(resultado.sociedadLimitada.netoDisponible).toBe(112_248.17);
    expect(resultado.diferenciaNeta).toBe(7_514.35);
    expect(resultado.opcionMasVentajosa).toBe("sociedad_limitada");
  });

  it("todo el rendimiento como nómina anula la base imponible del IS", () => {
    const resultado = compararAutonomoVsSL({
      ingresosAnuales: 20_000,
      gastosDeduciblesAnuales: 5_000,
      salarioBrutoAdministrador: 15_000,
    });

    expect(resultado.sociedadLimitada.baseImponibleIS).toBe(0);
    expect(resultado.sociedadLimitada.cuotaImpuestoSociedades).toBe(0);
    expect(resultado.sociedadLimitada.dividendosNetos).toBe(0);
    expect(resultado.sociedadLimitada.netoDisponible).toBe(12_022.5);
    expect(resultado.diferenciaNeta).toBe(2_597.89);
    expect(resultado.opcionMasVentajosa).toBe("sociedad_limitada");
  });

  it("salto de escalón del IS de microempresas: 19%/21% justo en los 50.000€ de base imponible", () => {
    // rendimientoNetoAnual = 100.000€ (ingresos 120.000€ − gastos 20.000€);
    // cuotaRetaSocietariaAnual en el tramo 15 es constante (6.117,6€), así que
    // ajustamos el salario del administrador para fijar baseImponibleIS exacta.
    const base = {
      ingresosAnuales: 120_000,
      gastosDeduciblesAnuales: 20_000,
    };

    const justoDebajo = compararAutonomoVsSL({ ...base, salarioBrutoAdministrador: 43_883.4 });
    expect(justoDebajo.sociedadLimitada.baseImponibleIS).toBe(49_999);
    expect(justoDebajo.sociedadLimitada.cuotaImpuestoSociedades).toBe(9_499.81);

    const exactoEnElLimite = compararAutonomoVsSL({ ...base, salarioBrutoAdministrador: 43_882.4 });
    expect(exactoEnElLimite.sociedadLimitada.baseImponibleIS).toBe(50_000);
    // Los 50.000€ tributan íntegramente al 19% (el tramo "hasta 50.000€" es inclusivo).
    expect(exactoEnElLimite.sociedadLimitada.cuotaImpuestoSociedades).toBe(9_500);

    const justoEncima = compararAutonomoVsSL({ ...base, salarioBrutoAdministrador: 43_881.4 });
    expect(justoEncima.sociedadLimitada.baseImponibleIS).toBe(50_001);
    // El euro que supera los 50.000€ tributa al 21%: 9.500€ + 0,21€.
    expect(justoEncima.sociedadLimitada.cuotaImpuestoSociedades).toBe(9_500.21);
  });
});

describe("diagnosticarVerifactu (VF-2027.1)", () => {
  it("con sistema VeriFactu y cliente B2C, todos los puntos del checklist están cumplidos", () => {
    const resultado = diagnosticarVerifactu({
      tipoContribuyente: "autonomo",
      tipoCliente: "B2C",
      facturacionAnual: 500_000,
      sistemaActual: "software_verifactu",
      fechaConsulta: new Date("2020-01-01T00:00:00Z"),
    });

    expect(resultado.fechaLimiteVerifactu).toEqual(new Date("2027-07-01T00:00:00Z"));
    expect(resultado.obligadoVerifactu).toBe(false);
    expect(resultado.nivelUrgencia).toBe("sin_urgencia");
    expect(resultado.obligadoFacturaElectronicaB2B).toBe(false);
    expect(resultado.notaFacturaElectronicaB2B).toBeNull();
    expect(resultado.checklist.every((item) => item.cumplido)).toBe(true);
  });

  it("una sociedad tras su fecha límite (1 enero 2027) ya está obligada", () => {
    const resultado = diagnosticarVerifactu({
      tipoContribuyente: "sociedad",
      tipoCliente: "B2B",
      facturacionAnual: 9_000_000,
      sistemaActual: "hoja_calculo",
      fechaConsulta: new Date("2027-06-01T00:00:00Z"),
    });

    expect(resultado.fechaLimiteVerifactu).toEqual(new Date("2027-01-01T00:00:00Z"));
    expect(resultado.obligadoVerifactu).toBe(true);
    expect(resultado.nivelUrgencia).toBe("obligatorio_ya");
    expect(resultado.obligadoFacturaElectronicaB2B).toBe(true);
    expect(resultado.notaFacturaElectronicaB2B).toContain("plazo corto");
    const softwareCertificado = resultado.checklist.find((item) => item.id === "software_certificado");
    expect(softwareCertificado?.cumplido).toBe(false);
  });

  it("marca 'urgente' cuando quedan menos de 90 días para la fecha límite", () => {
    const resultado = diagnosticarVerifactu({
      tipoContribuyente: "sociedad",
      tipoCliente: "AMBOS",
      facturacionAnual: 100_000,
      sistemaActual: "software_no_verificable",
      fechaConsulta: new Date("2026-12-15T00:00:00Z"),
    });

    expect(resultado.obligadoVerifactu).toBe(false);
    expect(resultado.diasHastaLimiteVerifactu).toBe(17);
    expect(resultado.nivelUrgencia).toBe("urgente");
  });
});

describe("calcularKilometrajeDietas (KM-2026.1)", () => {
  it("combina kilometraje y dietas con y sin pernocta en España", () => {
    const resultado = calcularKilometrajeDietas({
      kilometrajes: [{ concepto: "Visitas a cliente", kilometros: 500 }],
      dietas: [
        { concepto: "Congreso", dias: 2, zona: "espana", pernocta: true },
        { concepto: "Reuniones", dias: 3, zona: "espana", pernocta: false },
      ],
    });

    expect(resultado.totalExentoKilometraje).toBe(130);
    expect(resultado.totalExentoDietas).toBe(186.69);
    expect(resultado.totalExentoIRPF).toBe(316.69);
  });

  it("aplica las tarifas de extranjero, más altas que las de España", () => {
    const resultado = calcularKilometrajeDietas({
      dietas: [
        { concepto: "Feria en Alemania", dias: 1, zona: "extranjero", pernocta: true },
        { concepto: "Reunión en Portugal", dias: 1, zona: "extranjero", pernocta: false },
      ],
    });

    expect(resultado.totalExentoKilometraje).toBe(0);
    expect(resultado.totalExentoDietas).toBe(139.43);
  });

  it("sin desplazamientos, el resultado es cero", () => {
    const resultado = calcularKilometrajeDietas({});
    expect(resultado.totalExentoIRPF).toBe(0);
    expect(resultado.resumen).toEqual([]);
  });
});

describe("calcularRetencionIAE (IAE-2026.1)", () => {
  it("la Sección 1 (empresarial) nunca lleva retención", () => {
    const resultado = calcularRetencionIAE({
      seccionIAE: "1",
      esNuevoAutonomo: false,
      baseImponible: 1_000,
      tipoIVA: 21,
    });

    expect(resultado.tipoRetencionIRPF).toBe(0);
    expect(resultado.importeRetencionIRPF).toBe(0);
    expect(resultado.totalLiquidoAPercibir).toBe(1_210);
  });

  it("Sección 2 con tipo reducido del 7% (año de alta)", () => {
    const resultado = calcularRetencionIAE({
      seccionIAE: "2",
      esNuevoAutonomo: true,
      baseImponible: 1_000,
      tipoIVA: 21,
    });

    expect(resultado.tipoRetencionIRPF).toBe(0.07);
    expect(resultado.importeRetencionIRPF).toBe(70);
    expect(resultado.totalLiquidoAPercibir).toBe(1_140);
  });

  it("Sección 2 con retención general del 15% e IVA reducido del 10%", () => {
    const resultado = calcularRetencionIAE({
      seccionIAE: "2",
      esNuevoAutonomo: false,
      baseImponible: 2_500,
      tipoIVA: 10,
    });

    expect(resultado.importeIVA).toBe(250);
    expect(resultado.importeRetencionIRPF).toBe(375);
    expect(resultado.totalLiquidoAPercibir).toBe(2_375);
  });
});

describe("calcularPluriactividad (PLURI-2026.1)", () => {
  it("sin superar el tope legal, no hay derecho a devolución", () => {
    const resultado = calcularPluriactividad({
      cotizacionRegimenGeneralAnual: 5_000,
      cotizacionRETAAnual: 3_000,
    });

    expect(resultado.tieneDerechoDevolucion).toBe(false);
    expect(resultado.importeDevolucion).toBe(0);
  });

  it("supera el tope y el 50% del exceso no llega al límite del RETA", () => {
    const resultado = calcularPluriactividad({
      cotizacionRegimenGeneralAnual: 15_000,
      cotizacionRETAAnual: 4_000,
    });

    expect(resultado.excesoCotizado).toBe(1_676.32);
    expect(resultado.tieneDerechoDevolucion).toBe(true);
    expect(resultado.importeDevolucion).toBe(838.16);
  });

  it("el límite del 50% de las cuotas RETA topa la devolución", () => {
    const resultado = calcularPluriactividad({
      cotizacionRegimenGeneralAnual: 20_000,
      cotizacionRETAAnual: 1_000,
    });

    expect(resultado.excesoCotizado).toBe(3_676.32);
    // El 50% del exceso (1.838,16 €) supera el 50% de la cuota RETA (500 €): topa en 500 €.
    expect(resultado.importeDevolucion).toBe(500);
  });

  it("justo en el tope legal de 2026 (17.323,68€) no hay derecho a devolución", () => {
    const resultado = calcularPluriactividad({
      cotizacionRegimenGeneralAnual: 12_323.68,
      cotizacionRETAAnual: 5_000,
    });

    expect(resultado.totalCotizado).toBe(17_323.68);
    expect(resultado.topeMaximoAnual).toBe(17_323.68);
    expect(resultado.excesoCotizado).toBe(0);
    expect(resultado.tieneDerechoDevolucion).toBe(false);
    expect(resultado.importeDevolucion).toBe(0);
  });

  it("un euro por encima del tope legal ya genera derecho a devolución", () => {
    const resultado = calcularPluriactividad({
      cotizacionRegimenGeneralAnual: 12_323.68,
      cotizacionRETAAnual: 5_001,
    });

    expect(resultado.excesoCotizado).toBe(1);
    expect(resultado.tieneDerechoDevolucion).toBe(true);
    expect(resultado.importeDevolucion).toBe(0.5);
  });
});
