"use client";

import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { getAffiliate, type AffiliateId } from "@/config/affiliates";
import { trackAffiliateClick } from "@/lib/analytics";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AffiliateCardProps {
  partnerId: AffiliateId;
  /** Slug de la herramienta desde la que se muestra la tarjeta, para la analítica de clics de afiliado. */
  toolSlug: string;
  className?: string;
  /** "Análisis de tu resultado": resumen pedagógico breve de la cifra que acaba de obtener el usuario. */
  analysis: string;
  /** "Punto clave de atención": el riesgo o punto de fricción que conviene resolver a partir de ese resultado. */
  keyPoint: string;
  /** Frase que introduce al partner en "Siguiente paso recomendado", p. ej. "Para no dejar deducciones sin aplicar,". */
  nextStepIntro: string;
  /** Importe de ahorro/beneficio a destacar (en euros), mostrado como badge independiente. */
  dynamicSavingAmount?: number;
  /** Texto de una promoción/cupón real del partner, p. ej. "Prueba gratis 30 días". No inventar cupones que no existan. */
  promoBadgeText?: string;
}

/**
 * Bloque narrativo de conversión: análisis del resultado → punto de
 * atención → siguiente paso recomendado, con la colaboración comercial
 * señalada de forma explícita y permanente (no solo en la letra pequeña),
 * para que se lea como contenido editorial y no como un anuncio insertado.
 */
export function AffiliateCard({
  partnerId,
  toolSlug,
  className,
  analysis,
  keyPoint,
  nextStepIntro,
  dynamicSavingAmount,
  promoBadgeText,
}: AffiliateCardProps) {
  const partner = getAffiliate(partnerId);

  return (
    <aside
      className={cn("overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:hidden", className)}
      aria-label={`Análisis y recomendación: ${partner.name}`}
    >
      <div className="space-y-4 p-5 sm:p-6">
        <section>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Análisis de tu resultado</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{analysis}</p>
        </section>

        <section>
          <p className="text-xs font-semibold tracking-wide text-amber-600 uppercase">Punto clave de atención</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{keyPoint}</p>
        </section>

        <section className="border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">Siguiente paso recomendado</p>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              Colaboración / Enlace de afiliado
            </span>
          </div>

          <div className="mt-2.5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm leading-6 text-slate-700">
                {nextStepIntro} <strong className="text-slate-900">{partner.name}</strong>
                {partner.badge && (
                  <span className="ml-1.5 rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-medium text-white align-middle">
                    {partner.badge}
                  </span>
                )}
                {typeof dynamicSavingAmount === "number" && dynamicSavingAmount > 0 && (
                  <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 align-middle">
                    <TrendingUp className="h-3 w-3" aria-hidden="true" />+{formatEUR(dynamicSavingAmount)}/año
                  </span>
                )}
              </p>
              <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">{partner.description}</p>
              {promoBadgeText && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {promoBadgeText}
                </span>
              )}
            </div>

            <a
              href={`/go/${partner.id}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackAffiliateClick(partner.name, toolSlug)}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {partner.ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>

      <p className="border-t border-slate-100 bg-slate-50 px-5 py-2 text-[11px] text-slate-400 sm:px-6">
        Puede que recibamos una comisión sin coste adicional para ti.
      </p>
    </aside>
  );
}
