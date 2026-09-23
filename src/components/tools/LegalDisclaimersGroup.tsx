import { ChevronDown, Info } from "lucide-react";
import { SimulationDisclaimer } from "@/components/tools/SimulationDisclaimer";
import { PrivacyLocalBadge } from "@/components/tools/PrivacyLocalBadge";
import { TerritorialScopeNotice } from "@/components/tools/TerritorialScopeNotice";

/**
 * Agrupa los tres avisos extensos (simulación orientativa, privacidad,
 * ámbito territorial) en un único bloque colapsado por defecto: evita la
 * "pared de texto jurídico" que suponía mostrarlos como tres cajas
 * apiladas a ancho completo justo después de cada resultado. Componente de
 * servidor puro: `<details>` nativo, sin JavaScript.
 */
export function LegalDisclaimersGroup() {
  return (
    <details className="group mt-4 rounded-xl border border-slate-200 bg-white print:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          Avisos legales, privacidad y ámbito territorial
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-4 pt-3 pb-4">
        <SimulationDisclaimer className="mt-0" />
        <PrivacyLocalBadge className="mt-0" />
        <TerritorialScopeNotice className="mt-0" />
      </div>
    </details>
  );
}
