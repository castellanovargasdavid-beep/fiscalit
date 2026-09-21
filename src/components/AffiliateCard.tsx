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
      className={cn(
        "rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50",
        className,
      )}
      aria-label={`Recomendación de ${partner.name}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {partner.name}
            </p>
            {partner.badge && (
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-white dark:bg-zinc-50 dark:text-zinc-900">
                {partner.badge}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            {partner.tagline}
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-500">
            {partner.description}
          </p>
        </div>

        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {partner.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-600">
        Enlace de colaboración: puede que recibamos una comisión sin coste
        adicional para ti.
      </p>
    </aside>
  );
}
