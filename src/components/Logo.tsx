import Link from "next/link";
import { cn } from "@/lib/utils";

interface FiscalitMarkProps {
  className?: string;
}

/**
 * Isotipo propio de FiscalIT: monograma geométrico de la "F" construido a
 * partir del trazo vertical de la letra y tres barras horizontales de
 * longitud decreciente, evocando líneas de balance contable / un ledger.
 * Trazos sólidos de 2px, `currentColor` (sin relleno ni gradiente en el
 * propio símbolo: el color depende de dónde se use), viewBox 24x24 para
 * alinearse al mismo grid que el resto de iconos de Lucide del sitio.
 */
export function FiscalitMark({ className }: FiscalitMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 4v16" />
      <path d="M6 4h11" />
      <path d="M6 12h8" />
      <path d="M6 17h5" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
}

/** Isotipo + wordmark de FiscalIT, enlazado a inicio. Único punto de edición del logo en toda la web. */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5 transition-all duration-150 hover:opacity-95", className)}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/20 ring-1 ring-black/5">
        <FiscalitMark className="h-5 w-5 text-white" />
      </span>
      <span className="flex items-center">
        <span className="text-lg font-extrabold tracking-tight text-slate-900">Fiscal</span>
        <span className="text-lg font-black tracking-tight text-blue-600">it</span>
        <span className="ml-1 rounded-md border border-slate-200/80 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          .es
        </span>
      </span>
    </Link>
  );
}
