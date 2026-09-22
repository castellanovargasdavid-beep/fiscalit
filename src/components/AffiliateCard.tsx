import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { getAffiliate, type AffiliateId } from "@/config/affiliates";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AffiliateCardProps {
  partnerId: AffiliateId;
  className?: string;
  /** Titular contextual al resultado del usuario; sustituye al tagline genérico del partner cuando se indica. */
  dynamicHeadline?: string;
  /** Importe de ahorro/beneficio a destacar (en euros), mostrado como badge independiente. */
  dynamicSavingAmount?: number;
  /** Texto de una promoción/cupón destacado, p. ej. "Cupón exclusivo: -20% en tu primer año". */
  promoBadgeText?: string;
}

export function AffiliateCard({
  partnerId,
  className,
  dynamicHeadline,
  dynamicSavingAmount,
  promoBadgeText,
}: AffiliateCardProps) {
  const partner = getAffiliate(partnerId);

  return (
    <aside
      className={cn("rounded-xl border border-slate-200 bg-white p-5 shadow-sm print:hidden", className)}
      aria-label={`Recomendación de ${partner.name}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">{partner.name}</p>
            {partner.badge && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-medium text-white">
                {partner.badge}
              </span>
            )}
            {typeof dynamicSavingAmount === "number" && dynamicSavingAmount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" aria-hidden="true" />+{formatEUR(dynamicSavingAmount)}/año
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-600">{dynamicHeadline ?? partner.tagline}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{partner.description}</p>
          {promoBadgeText && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {promoBadgeText}
            </span>
          )}
        </div>

        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {partner.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        Enlace de colaboración: puede que recibamos una comisión sin coste adicional para ti.
      </p>
    </aside>
  );
}
