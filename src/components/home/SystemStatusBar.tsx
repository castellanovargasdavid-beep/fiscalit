import { siteConfig } from "@/config/site";
import { formatMesAnioISO } from "@/lib/format";

const STATUS_ITEMS = [
  { label: "6/6 Motores normativos al día", withDot: true },
  { label: `Última revisión BOE: ${formatMesAnioISO(siteConfig.lastMethodologyReview)}` },
  { label: "Ámbito: Territorio Común (Península y Baleares)" },
  { label: "Privacidad: Local-First (0 bytes transmitidos)" },
];

/**
 * Barra compacta de "estado del sistema", con estética de consola: refuerza
 * en un vistazo que las 6 herramientas están al día y que el cálculo no
 * sale del navegador, justo antes del alta a las alertas del BOE.
 */
export function SystemStatusBar() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 font-mono text-xs text-slate-300"
      role="status"
    >
      {STATUS_ITEMS.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          {item.withDot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />}
          {item.label}
        </span>
      ))}
    </div>
  );
}
