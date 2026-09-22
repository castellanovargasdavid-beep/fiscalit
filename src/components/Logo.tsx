import Link from "next/link";
import { cn } from "@/lib/utils";

interface FiscalitMarkProps {
  className?: string;
}

/**
 * Isotipo propio de FiscalIT: monograma geométrico y modular de la "F",
 * construido con bloques sólidos (no trazos) sobre su propia caja azul
 * corporativa redondeada. El SVG incluye su fondo: no necesita un
 * contenedor exterior que lo recorte ni lo coloree.
 */
export function FiscalitMark({ className }: FiscalitMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2563EB" />
      <rect x="7" y="7" width="4.5" height="18" rx="2" fill="white" />
      <rect x="13.5" y="7" width="11.5" height="4.5" rx="2" fill="white" />
      <rect x="13.5" y="13.5" width="8" height="4.5" rx="2" fill="white" fillOpacity="0.8" />
      <circle cx="22.5" cy="22.5" r="2.5" fill="white" fillOpacity="0.5" />
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
      <FiscalitMark className="h-9 w-9 shrink-0 shadow-sm shadow-blue-600/20" />
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
