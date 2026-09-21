export type TipoContribuyente = "autonomo" | "sociedad";
export type TipoCliente = "B2B" | "B2C" | "AMBOS";
export type SistemaFacturacionActual =
  | "sin_sistema_o_manual"
  | "hoja_calculo"
  | "software_no_verificable"
  | "software_verifactu";

export interface DiagnosticoVerifactuInput {
  tipoContribuyente: TipoContribuyente;
  tipoCliente: TipoCliente;
  facturacionAnual: number;
  sistemaActual: SistemaFacturacionActual;
  /** Fecha de referencia para el diagnóstico; por defecto, la fecha actual. */
  fechaConsulta?: Date;
}

export interface ChecklistItemVerifactu {
  id: string;
  titulo: string;
  descripcion: string;
  cumplido: boolean;
}

export type NivelUrgencia = "sin_urgencia" | "proximo" | "urgente" | "obligatorio_ya";

export interface DiagnosticoVerifactuResult {
  tipoContribuyente: TipoContribuyente;
  obligadoVerifactu: boolean;
  fechaLimiteVerifactu: Date;
  diasHastaLimiteVerifactu: number;
  nivelUrgencia: NivelUrgencia;
  obligadoFacturaElectronicaB2B: boolean;
  notaFacturaElectronicaB2B: string | null;
  checklist: ChecklistItemVerifactu[];
}

/**
 * Fechas límite de entrada en vigor de VeriFactu (Reglamento de facturación
 * aprobado por el RD 1007/2023, en desarrollo de la Ley 11/2021 antifraude).
 * La AEAT ha aplazado estos plazos en el pasado: verifica la fecha vigente
 * antes de usar este diagnóstico en producción.
 */
export const FECHA_LIMITE_VERIFACTU: Record<TipoContribuyente, Date> = {
  sociedad: new Date("2026-01-01T00:00:00Z"),
  autonomo: new Date("2026-07-01T00:00:00Z"),
};

/** Umbral de facturación (Ley 18/2022 "Crea y Crece") que acorta el plazo de adaptación a la factura electrónica B2B. */
export const UMBRAL_FACTURACION_FACTURA_ELECTRONICA_RAPIDA = 8_000_000;

const MS_POR_DIA = 1000 * 60 * 60 * 24;

/**
 * Diagnostica la situación de un negocio frente a VeriFactu y la
 * obligación de factura electrónica B2B de la Ley Crea y Crece.
 */
export function diagnosticarVerifactu(
  input: DiagnosticoVerifactuInput,
): DiagnosticoVerifactuResult {
  const fechaConsulta = input.fechaConsulta ?? new Date();
  const fechaLimiteVerifactu = FECHA_LIMITE_VERIFACTU[input.tipoContribuyente];
  const diasHastaLimiteVerifactu = Math.ceil(
    (fechaLimiteVerifactu.getTime() - fechaConsulta.getTime()) / MS_POR_DIA,
  );
  const obligadoVerifactu = diasHastaLimiteVerifactu <= 0;

  let nivelUrgencia: NivelUrgencia;
  if (obligadoVerifactu) {
    nivelUrgencia = "obligatorio_ya";
  } else if (diasHastaLimiteVerifactu <= 90) {
    nivelUrgencia = "urgente";
  } else if (diasHastaLimiteVerifactu <= 180) {
    nivelUrgencia = "proximo";
  } else {
    nivelUrgencia = "sin_urgencia";
  }

  const obligadoFacturaElectronicaB2B = input.tipoCliente !== "B2C";
  const notaFacturaElectronicaB2B = !obligadoFacturaElectronicaB2B
    ? null
    : input.facturacionAnual > UMBRAL_FACTURACION_FACTURA_ELECTRONICA_RAPIDA
      ? "Facturación superior a 8M€: la Ley Crea y Crece te obliga a emitir factura electrónica estructurada B2B en el plazo corto (1 año desde el desarrollo reglamentario)."
      : "La Ley Crea y Crece te obligará a emitir factura electrónica estructurada B2B en el plazo largo (2 años desde el desarrollo reglamentario). Pendiente de la entrada en vigor del reglamento.";

  const tieneSoftwareVerifactu = input.sistemaActual === "software_verifactu";

  const checklist: ChecklistItemVerifactu[] = [
    {
      id: "software_certificado",
      titulo: "Software de facturación certificado VeriFactu",
      descripcion:
        "Tu programa debe declarar responsablemente que cumple el Reglamento y figurar en el listado de sistemas informáticos de la AEAT.",
      cumplido: tieneSoftwareVerifactu,
    },
    {
      id: "registro_facturacion",
      titulo: "Registro de facturación con huella encadenada",
      descripcion:
        "Cada factura debe generar un registro con huella (hash) encadenado al registro anterior, de forma inalterable.",
      cumplido: tieneSoftwareVerifactu,
    },
    {
      id: "codigo_qr",
      titulo: "Código QR y leyenda «VeriFactu» en cada factura",
      descripcion:
        "Las facturas deben incluir un código QR y, si el sistema es VeriFactu, la leyenda «Factura verificable en la sede electrónica de la AEAT».",
      cumplido: tieneSoftwareVerifactu,
    },
    {
      id: "envio_aeat",
      titulo: "Remisión de registros a la AEAT",
      descripcion:
        "Los sistemas VeriFactu envían automáticamente cada registro de facturación a la AEAT de forma cuasi-inmediata.",
      cumplido: tieneSoftwareVerifactu,
    },
    {
      id: "conservacion_registros",
      titulo: "Conservación de los registros de facturación",
      descripcion:
        "Debes conservar los registros de facturación y de eventos del sistema mientras no haya prescrito la obligación tributaria.",
      cumplido: input.sistemaActual !== "sin_sistema_o_manual",
    },
    {
      id: "factura_electronica_b2b",
      titulo: "Factura electrónica estructurada B2B",
      descripcion:
        "Si facturas a otras empresas o profesionales, deberás emitir en formato estructurado (Facturae u otro homologado) cuando entre en vigor el reglamento de la Ley Crea y Crece.",
      cumplido: !obligadoFacturaElectronicaB2B,
    },
  ];

  return {
    tipoContribuyente: input.tipoContribuyente,
    obligadoVerifactu,
    fechaLimiteVerifactu,
    diasHastaLimiteVerifactu,
    nivelUrgencia,
    obligadoFacturaElectronicaB2B,
    notaFacturaElectronicaB2B,
    checklist,
  };
}
