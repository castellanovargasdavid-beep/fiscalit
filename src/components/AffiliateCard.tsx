import { ArrowUpRight } from "lucide-react";
import { getAffiliate, type AffiliateId } from "@/config/affiliates";
import { cn } from "@/lib/utils";

interface AffiliateCardProps {
  partnerId: AffiliateId;
  className?: string;
}

export function AffiliateCard({ partnerId, className }: AffiliateCardProps) {
  const partner = getAffiliate(partnerId);

  return (
    <aside
      className={cn("rounded-xl border border-slate-200 bg-white p-5 shadow-sm", className)}
      aria-label={`Recomendación de ${partner.name}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">{partner.name}</p>
            {partner.badge && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-medium text-white">
                {partner.badge}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-600">{partner.tagline}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{partner.description}</p>
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
