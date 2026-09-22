import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalSourceBadgeProps {
  /** Texto que describe la norma en la que se basa el cálculo, p. ej. "Basado en el Real Decreto-ley 13/2022...". */
  fuente: string;
  /** URL oficial de boe.es a la norma citada en `fuente`. */
  url: string;
  /** Ejercicio fiscal para el que está verificado el cálculo. */
  ejercicioFiscal?: number;
  className?: string;
}

/**
 * Franja de rigor legal (E-E-A-T), situada justo debajo del resultado:
 * badge de vigencia normativa + enlace a la fuente oficial en boe.es +
 * enlace a la metodología y fuentes aplicadas en todo el sitio.
 */
export function LegalSourceBadge({ fuente, url, ejercicioFiscal = 2026, className }: LegalSourceBadgeProps) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm sm:flex-row sm:items-center sm:gap-3",
        className,
      )}
    >
      <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Normativa revisada: Ejercicio {ejercicioFiscal} / Actualización BOE
      </span>
      <p className="text-slate-600">
        {fuente}{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800"
        >
          Ver fuente oficial (BOE)
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>{" "}
        ·{" "}
        <Link
          href="/metodologia"
          className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800 print:hidden"
        >
          Metodología y fuentes
        </Link>
      </p>
    </div>
  );
}
