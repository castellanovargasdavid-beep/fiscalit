import type { ReactNode } from "react";
import { AlertTriangle, Calculator, Car, CheckCircle2, Scale } from "lucide-react";
import { formatEUR } from "@/lib/format";

/**
 * Una sola copia de las tarjetas del carrusel. El track las renderiza dos
 * veces seguidas ([...CARDS, ...CARDS]) y la animación traslada el track
 * exactamente -50% de su propia altura: como esa mitad es una copia idéntica
 * de la otra, el bucle no da saltos visuales.
 */
const CARDS: { key: string; content: ReactNode }[] = [
  {
    key: "reta",
    content: (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            <Calculator className="h-3.5 w-3.5" />
            RETA 2026
          </span>
          <span className="text-xs text-slate-400">Rendimiento {formatEUR(2850)}/mes</span>
        </div>
        <p className="mt-3 text-xs font-medium tracking-wide text-slate-400 uppercase">Cuota estimada</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{formatEUR(347.82, true)}/mes</p>
      </div>
    ),
  },
  {
    key: "verifactu",
    content: (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
          <AlertTriangle className="h-3.5 w-3.5" />
          Diagnóstico VeriFactu
        </span>
        <p className="mt-3 text-sm font-medium text-amber-900">2 puntos pendientes de revisión</p>
        <p className="mt-1 text-xs text-amber-700">Sanciones evitadas</p>
      </div>
    ),
  },
  {
    key: "autonomo-vs-sl",
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
  {
    key: "kilometraje",
    content: (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 shadow-lg">
        <div className="flex items-center gap-1.5">
          <Car className="h-3.5 w-3.5 text-slate-400" />
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Kilometraje &amp; dietas</p>
        </div>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          Gasto compensado: {formatEUR(0.26, true)}/km
        </p>
        <p className="mt-1 text-xs text-slate-500">Exento de IRPF · Deducción 50% IVA</p>
      </div>
    ),
  },
  {
    key: "privacidad",
    content: (
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-lg">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-xs leading-5 text-slate-600">Cálculo local en navegador · 0 datos enviados</p>
      </div>
    ),
  },
];

/**
 * Maqueta visual (Product UI Mockup) de la Hero: carrusel vertical continuo
 * de tarjetas con datos de ejemplo ilustrativos, no resultados reales de
 * ninguna simulación. Componente de servidor puro (sin "use client", sin
 * estado ni efectos): la animación es CSS-only, así que no hay riesgo de
 * desajuste de hidratación.
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
      <div className="motion-reduce:animate-none animate-marquee-vertical flex flex-col gap-4 hover:[animation-play-state:paused]">
        {[...CARDS, ...CARDS].map((card, index) => (
          <div key={`${card.key}-${index}`}>{card.content}</div>
        ))}
      </div>
    </div>
  );
}
