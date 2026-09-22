export interface PdfReportRow {
  label: string;
  value: string;
}

export interface PdfReportSection {
  title: string;
  rows: PdfReportRow[];
}

export interface PdfReportPromo {
  partnerName: string;
  badgeText: string;
  ctaLabel: string;
  url: string;
}

export interface PdfReportData {
  /** Nombre de la herramienta, usado como título del informe. */
  toolTitle: string;
  /** Frase de conclusión destacada (opcional), p. ej. "Te conviene ser Autónomo: ganas 1.763 € más al año." */
  highlight?: string;
  sections: PdfReportSection[];
  promo?: PdfReportPromo;
  /** Nombre de archivo sin extensión. */
  fileName: string;
}

const AZUL_MARCA: [number, number, number] = [37, 99, 235]; // blue-600
const SLATE_900: [number, number, number] = [15, 23, 42];
const SLATE_500: [number, number, number] = [100, 116, 139];
const SLATE_200: [number, number, number] = [226, 232, 240];
const AMBER_50: [number, number, number] = [255, 251, 235];
const AMBER_200: [number, number, number] = [253, 230, 138];
const AMBER_800: [number, number, number] = [146, 64, 14];

/**
 * Genera y descarga, 100% en el navegador (sin backend), un PDF con el
 * resumen de la simulación actual: cabecera con la marca, tablas con los
 * datos introducidos y los resultados calculados, y una caja de promoción
 * del partner recomendado.
 */
export async function downloadScenarioPdf(data: PdfReportData): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const marginX = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  let cursorY = 18;

  // --- Cabecera: imagotipo + wordmark ---
  doc.setFillColor(...AZUL_MARCA);
  doc.roundedRect(marginX, cursorY, 10, 10, 2.5, 2.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("F", marginX + 5, cursorY + 6.8, { align: "center" });

  const wordmarkX = marginX + 14;
  const wordmarkY = cursorY + 7;
  doc.setFontSize(15);
  doc.setTextColor(...SLATE_900);
  doc.text("Fiscal", wordmarkX, wordmarkY);
  const fiscalWidth = doc.getTextWidth("Fiscal");
  doc.setTextColor(...AZUL_MARCA);
  doc.text("it", wordmarkX + fiscalWidth, wordmarkY);
  const itWidth = doc.getTextWidth("it");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...SLATE_500);
  doc.text(".es", wordmarkX + fiscalWidth + itWidth + 1, wordmarkY);

  cursorY += 16;
  doc.setDrawColor(...SLATE_200);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 9;

  // --- Título y metadatos ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...SLATE_900);
  doc.text(data.toolTitle, marginX, cursorY);
  cursorY += 6;

  const fechaEmision = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...SLATE_500);
  doc.text(`Informe de simulación generado el ${fechaEmision}`, marginX, cursorY);
  cursorY += 5;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.text("Estimación fiscal orientativa para el ejercicio 2026. No sustituye el asesoramiento", marginX, cursorY);
  cursorY += 4;
  doc.text("de un gestor o asesor colegiado.", marginX, cursorY);
  cursorY += 9;

  if (data.highlight) {
    doc.setFillColor(...AMBER_50);
    doc.setDrawColor(...AMBER_200);
    const highlightLines = doc.splitTextToSize(data.highlight, pageWidth - marginX * 2 - 8) as string[];
    const boxHeight = 6 + highlightLines.length * 5;
    doc.roundedRect(marginX, cursorY, pageWidth - marginX * 2, boxHeight, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...AMBER_800);
    doc.text(highlightLines, marginX + 4, cursorY + 6.5);
    cursorY += boxHeight + 8;
  }

  // --- Secciones de datos/resultados ---
  for (const section of data.sections) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...SLATE_900);
    doc.text(section.title, marginX, cursorY);
    cursorY += 3;

    autoTable(doc, {
      startY: cursorY,
      margin: { left: marginX, right: marginX },
      head: [],
      body: section.rows.map((row) => [row.label, row.value]),
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 9.5,
        cellPadding: 2.4,
        textColor: SLATE_900,
        lineColor: SLATE_200,
        lineWidth: 0.2,
      },
      columnStyles: {
        0: { textColor: SLATE_500, cellWidth: 95 },
        1: { fontStyle: "bold", halign: "right" },
      },
    });

    const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY;
    cursorY = (finalY ?? cursorY + section.rows.length * 8) + 9;
  }

  // --- Caja de promoción del partner ---
  if (data.promo) {
    const boxHeight = 28;
    if (cursorY + boxHeight > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      cursorY = 20;
    }

    doc.setFillColor(239, 246, 255); // blue-50
    doc.setDrawColor(191, 219, 254); // blue-200
    doc.roundedRect(marginX, cursorY, pageWidth - marginX * 2, boxHeight, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...AZUL_MARCA);
    doc.text(data.promo.badgeText, marginX + 5, cursorY + 8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...SLATE_900);
    doc.text(data.promo.partnerName, marginX + 5, cursorY + 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...AZUL_MARCA);
    doc.textWithLink(`${data.promo.ctaLabel} -> ${data.promo.url}`, marginX + 5, cursorY + 21, {
      url: data.promo.url,
    });

    cursorY += boxHeight + 6;
  }

  // --- Pie de página ---
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...SLATE_500);
    doc.text(
      `Generado con fiscalit.es — Página ${page} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    );
  }

  doc.save(`${data.fileName}.pdf`);
}
