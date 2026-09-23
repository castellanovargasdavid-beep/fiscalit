"use client";

import { useState } from "react";
import { Check, Download, FileSpreadsheet, Link2, Loader2, RotateCcw } from "lucide-react";
import { useCopyShareLink } from "@/lib/useScenarioShare";
import { trackPdfDownload, trackSimulationShare } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ScenarioActionsProps {
  /** Slug de la herramienta, para la analítica de embudo (descarga de PDF, compartir simulación). */
  toolSlug: string;
  onReset: () => void;
  /** Genera y descarga el informe en PDF de la simulación actual. Si se omite, el botón no se muestra. */
  onDownloadPdf?: () => void | Promise<void>;
  /** Genera y descarga el CSV/Excel de la simulación actual. Si se omite, el botón no se muestra. */
  onDownloadCsv?: () => void | Promise<void>;
}

/** Barra de acción contextual: compartir la simulación (vía URL), descargar el informe en PDF o CSV/Excel, y restablecer los valores por defecto. */
export function ScenarioActions({ toolSlug, onReset, onDownloadPdf, onDownloadCsv }: ScenarioActionsProps) {
  const { copied, copyShareLink } = useCopyShareLink();
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [generatingCsv, setGeneratingCsv] = useState(false);

  const handleShare = async () => {
    const ok = await copyShareLink();
    if (ok) trackSimulationShare(toolSlug);
  };

  const handleDownloadPdf = async () => {
    if (!onDownloadPdf || generatingPdf) return;
    setGeneratingPdf(true);
    try {
      await onDownloadPdf();
      trackPdfDownload(toolSlug);
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleDownloadCsv = async () => {
    if (!onDownloadCsv || generatingCsv) return;
    setGeneratingCsv(true);
    try {
      await onDownloadCsv();
    } finally {
      setGeneratingCsv(false);
    }
  };

  return (
    <div className="print:hidden">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void handleShare()}
          aria-live="polite"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
            copied
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
          )}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? "¡Enlace copiado!" : "Compartir simulación"}
        </button>

        {onDownloadPdf && (
          <button
            type="button"
            onClick={() => void handleDownloadPdf()}
            disabled={generatingPdf}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 disabled:cursor-wait disabled:opacity-60"
          >
            {generatingPdf ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {generatingPdf ? "Generando PDF…" : "Descargar informe (PDF)"}
          </button>
        )}

        {onDownloadCsv && (
          <button
            type="button"
            onClick={() => void handleDownloadCsv()}
            disabled={generatingCsv}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 disabled:cursor-wait disabled:opacity-60"
          >
            {generatingCsv ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {generatingCsv ? "Generando CSV…" : "Descargar Excel/CSV"}
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Restablecer
        </button>
      </div>

      {(onDownloadPdf || onDownloadCsv) && (
        <p className="mt-2 text-xs text-slate-500">
          📄 Generar informe técnico para tu asesor o archivo personal (PDF/CSV oficial)
        </p>
      )}
    </div>
  );
}
