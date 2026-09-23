import { ChevronDown } from "lucide-react";

interface CalculationTransparencyDetailsProps {
  /** Línea 1: metodología aplicada (fórmula, tramo o criterio concreto usado en este resultado). */
  metodologia: string;
  /** Línea 2: fuente normativa oficial (artículo, Orden ministerial o Real Decreto). */
  fuenteNormativa: string;
  /** URL de la fuente normativa, si se quiere enlazar (normalmente la misma que usa `LegalSourceBadge` en la misma herramienta). */
  fuenteUrl?: string;
  /** Línea 3: supuestos y límites del cálculo. Por defecto, el aviso de ámbito territorial estándar del sitio. */
  supuestosYLimites?: string;
}

const SUPUESTOS_POR_DEFECTO =
  "Cálculo orientativo en territorio común. No contempla deducciones autonómicas específicas.";

/**
 * Cápsula colapsable de transparencia, situada justo debajo del titular del
 * resultado: desglosa en 3 líneas fijas de qué depende esa cifra
 * (metodología, fuente normativa, supuestos y límites). Usa `<details>`
 * nativo, así que es accesible y navegable por teclado sin JavaScript.
 */
export function CalculationTransparencyDetails({
  metodologia,
  fuenteNormativa,
  fuenteUrl,
  supuestosYLimites = SUPUESTOS_POR_DEFECTO,
}: CalculationTransparencyDetailsProps) {
  return (
    <details className="group mt-3 rounded-lg border border-slate-200 bg-slate-50 print:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-slate-600">
        ¿Cómo se calcula este resultado?
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="space-y-1.5 border-t border-slate-200 px-3 py-2.5 text-xs leading-5 text-slate-600">
        <p>
          <strong className="font-medium text-slate-700">Metodología:</strong> {metodologia}
        </p>
        <p>
          <strong className="font-medium text-slate-700">Fuente normativa:</strong>{" "}
          {fuenteUrl ? (
            <a
              href={fuenteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-900"
            >
              {fuenteNormativa}
            </a>
          ) : (
            fuenteNormativa
          )}
        </p>
        <p>
          <strong className="font-medium text-slate-700">Supuestos y límites:</strong> {supuestosYLimites}
        </p>
      </div>
    </details>
  );
}
