import { getAffiliate } from "@/config/affiliates";
import { siteConfig } from "@/config/site";

export interface CsvReportRow {
  label: string;
  value: string;
  notes?: string;
}

export interface CsvReportSection {
  title: string;
  rows: CsvReportRow[];
}

export interface CsvReportData {
  /** Nombre de la herramienta, usado en la cabecera del archivo. */
  toolTitle: string;
  sections: CsvReportSection[];
  /** Nombre de archivo sin extensión. */
  fileName: string;
}

/** Envuelve un valor en comillas dobles y escapa las comillas internas, para máxima compatibilidad con Excel. */
function csvField(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function csvRow(...fields: string[]): string {
  return fields.map(csvField).join(",");
}

/**
 * Genera y descarga, 100% en el navegador (sin backend ni dependencias de
 * hojas de cálculo), un CSV con el resumen de la simulación actual.
 * Codificado en UTF-8 con BOM (`﻿`) para que Excel en español detecte
 * los acentos y el símbolo € correctamente al abrirlo.
 */
export function downloadScenarioCsv(data: CsvReportData): void {
  const lines: string[] = [];

  const fechaEmision = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  lines.push(csvRow("FiscalIT.es", data.toolTitle, `Informe generado el ${fechaEmision}`));
  lines.push("");
  lines.push(csvRow("Concepto", "Importe", "Notas"));

  for (const section of data.sections) {
    lines.push(csvRow(section.title, "", ""));
    for (const row of section.rows) {
      lines.push(csvRow(row.label, row.value, row.notes ?? ""));
    }
  }

  lines.push("");
  const holded = getAffiliate("holded");
  lines.push(
    csvRow(
      "Nota fiscal",
      `Plantilla generada por FiscalIT.es. Gestiona tus facturas con Holded (Prueba gratis: ${siteConfig.url}/go/${holded.id})`,
    ),
  );

  const csvContent = `﻿${lines.join("\r\n")}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
