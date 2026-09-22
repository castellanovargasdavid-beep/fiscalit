import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationDisclaimerProps {
  className?: string;
}

/**
 * Aviso corto, visible pero discreto, situado antes del resultado de cada
 * calculadora: deja claro que la herramienta es divulgativa y no un
 * asesoramiento individualizado vinculante (requisito de seguridad
 * jurídica en un sitio YMYL de contenido fiscal).
 */
export function SimulationDisclaimer({ className }: SimulationDisclaimerProps) {
  return (
    <div
      className={cn(
        "mt-4 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs leading-5 text-slate-500 print:hidden",
        className,
      )}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
      <p>
        Herramienta de simulación orientativa y divulgativa. No constituye asesoramiento fiscal o contable
        individualizado vinculante.
      </p>
    </div>
  );
}
