"use client";

import { useRef, useState } from "react";
import { Check, Code2, Copy, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface EmbedWidgetModalProps {
  /** Slug de la herramienta (coincide con `tools[].slug` y con la ruta /embed/[slug]). */
  slug: string;
  /** Nombre visible de la herramienta, solo para el título del modal. */
  toolTitle: string;
  className?: string;
}

function buildEmbedCode(slug: string): string {
  const embedUrl = `${siteConfig.url}/embed/${slug}`;
  return `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0"></iframe><p style="font-size:12px;color:#666;text-align:right;">Calculadora facilitada por <a href="${siteConfig.url}" target="_blank" rel="noopener">FiscalIT.es</a></p>`;
}

/** Botón discreto + modal accesible (`<dialog>` nativo) para copiar el código de inserción de una calculadora. */
export function EmbedWidgetModal({ slug, toolTitle, className }: EmbedWidgetModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copiado, setCopiado] = useState(false);
  const embedCode = buildEmbedCode(slug);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      // El navegador puede bloquear el portapapeles sin gesto directo del usuario; el código sigue visible para copiar a mano.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700",
          className,
        )}
      >
        <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
        Insertar en mi web
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="embed-modal-title"
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/50"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        onClose={() => setCopiado(false)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="embed-modal-title" className="text-base font-semibold text-slate-900">
                Insertar “{toolTitle}” en tu web
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Copia este código y pégalo donde quieras mostrar la calculadora. Incluye un enlace visible a
                Fiscalit.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Cerrar"
              className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <pre className="mt-4 max-h-40 overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-3.5 text-xs leading-5 text-slate-100">
            <code>{embedCode}</code>
          </pre>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {copiado ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                ¡Copiado al portapapeles!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copiar código
              </>
            )}
          </button>
        </div>
      </dialog>
    </>
  );
}
