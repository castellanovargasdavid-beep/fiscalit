import { Calculator, Scale, ShieldCheck } from "lucide-react";
import { formatEUR } from "@/lib/format";

/**
 * Maqueta visual estática (Product UI Mockup) de la Hero: 3 tarjetas
 * flotantes con datos de ejemplo ilustrativos, no resultados reales de
 * ninguna simulación. Componente de servidor puro (sin "use client", sin
 * estado ni efectos): la animación es CSS-only, así que no hay riesgo de
 * desajuste de hidratación.
 */
export function HeroProductMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-4">
        <div className="motion-reduce:animate-none animate-float-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg sm:ml-6">
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

        <div className="motion-reduce:animate-none animate-float-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg sm:mr-8">
          <div className="flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-slate-400" />
            <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Autónomo vs SL</p>
          </div>
          <div className="mt-3 space-y-2.5">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Autónomo</span>
                <span className="font-medium text-slate-900">{formatEUR(2210)}/mes</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[68%] rounded-full bg-slate-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Sociedad Limitada</span>
                <span className="font-medium text-slate-900">{formatEUR(2640)}/mes</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="motion-reduce:animate-none animate-float-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-md sm:ml-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Local-first · VeriFactu
          </span>
          <p className="mt-3 text-sm leading-6 text-slate-300">Cálculo 100% en navegador · Privacidad total</p>
        </div>
      </div>
    </div>
  );
}
