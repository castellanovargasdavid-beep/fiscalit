import type { ReactNode } from "react";
import { AlertTriangle, Calculator, Lock, Receipt, Scale } from "lucide-react";
import { formatEUR } from "@/lib/format";

/**
 * Una sola copia de las tarjetas del carrusel. El track las renderiza dos
 * veces seguidas ([...CARDS, ...CARDS]) y la animación traslada el track
 * exactamente -50% de su propia altura: como esa mitad es una copia idéntica
 * de la otra, el bucle no da saltos visuales. Cada tarjeta declara su propio
 * ancho y alineación (`className` incluye `w-*`/`self-*`) para romper la
 * cuadrícula uniforme, siguiendo la referencia visual de Declarando.
 */
const CARDS: { key: string; className: string; content: ReactNode }[] = [
  {
    key: "gastos-combustible",
    className: "w-[95%] self-start",
    content: (
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-lg">
        <div className="flex items-center gap-1.5 p-4 pb-3">
          <Receipt className="h-3.5 w-3.5 text-slate-400" />
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
            Deducción de gastos y combustible
          </p>
        </div>

        <div className="mx-auto w-[90%] rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
            Gastos detectados · Trimestre en curso
          </p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-700">Ticket Combustible (Estación de Servicio)</span>
            <span className="flex shrink-0 items-center gap-1">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                ✓ Canjear factura
              </span>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {formatEUR(-64.2, true)}
              </span>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-700">Peaje AP-7</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              ✓ Deducible 100%
            </span>
          </div>
        </div>
        <div className="h-3" />
      </div>
    ),
  },
  {
    key: "reta",
    className: "max-w-sm self-end",
    content: (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            <Calculator className="h-3.5 w-3.5" />
            RETA · 2026
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Tramo 4 activo
          </span>
        </div>
        <p className="mt-3 text-xs font-medium tracking-wide text-slate-400 uppercase">Cuota estimada</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{formatEUR(347.82, true)}/mes</p>
      </div>
    ),
  },
  {
    key: "verifactu",
    className: "w-full self-center",
    content: (
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-amber-50 p-4 shadow-lg">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
        <div>
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
            Alerta técnica
          </span>
          <p className="mt-1 text-xs leading-5 text-amber-800">
            2 requisitos pendientes · Evita sanción art. 201 bis LGT
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "privacidad",
    className: "w-[88%] self-start",
    content: (
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-lg">
        <Lock className="h-4 w-4 shrink-0 text-emerald-600" />
        <p className="text-xs leading-5 text-slate-600">100% en local · Sin cookies ni trackers</p>
      </div>
    ),
  },
  {
    key: "autonomo-vs-sl",
    className: "w-full self-center",
    content: (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg">
        <div className="flex items-center gap-1.5">
          <Scale className="h-3.5 w-3.5 text-slate-400" />
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Autónomo vs SL (anual)</p>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Autónomo</span>
              <span className="font-medium text-slate-900">{formatEUR(31240)}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[68%] rounded-full bg-slate-400" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>SL</span>
              <span className="font-medium text-slate-900">{formatEUR(33180)}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[82%] rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

/**
 * Maqueta visual (Product UI Mockup) de la Hero: carrusel vertical continuo
 * de tarjetas con datos de ejemplo ilustrativos, no resultados reales de
 * ninguna simulación. Componente de servidor puro (sin "use client", sin
 * estado ni efectos): la animación es CSS-only, así que no hay riesgo de
 * desajuste de hidratación. El movimiento es ininterrumpido (no se pausa al
 * pasar el ratón), con anchos y alineaciones asimétricos por tarjeta.
 */
export function HeroProductMockup() {
  return (
    <div
      className="relative mx-auto h-[460px] w-full max-w-sm overflow-hidden lg:mx-0"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="motion-reduce:animate-none animate-marquee-vertical flex flex-col gap-4">
        {[...CARDS, ...CARDS].map((card, index) => (
          <div key={`${card.key}-${index}`} className={card.className}>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}
