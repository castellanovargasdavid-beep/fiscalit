"use client";

import { Check, Link2, RotateCcw } from "lucide-react";
import { useCopyShareLink } from "@/lib/useScenarioShare";
import { cn } from "@/lib/utils";

interface ScenarioActionsProps {
  onReset: () => void;
}

/** Barra de acción contextual: compartir la simulación actual (vía URL) y restablecer los valores por defecto. */
export function ScenarioActions({ onReset }: ScenarioActionsProps) {
  const { copied, copyShareLink } = useCopyShareLink();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => void copyShareLink()}
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
          copied
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
        )}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copied ? "¡Enlace copiado!" : "Compartir simulación"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Restablecer
      </button>
    </div>
  );
}
