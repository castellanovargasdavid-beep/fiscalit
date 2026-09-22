import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivacyLocalBadgeProps {
  className?: string;
}

/**
 * Micro-badge corporativo de privacidad: refuerza un atributo diferencial
 * de la suite (todo el cálculo ocurre en el navegador, sin backend) frente
 * a competidores que sí procesan los datos introducidos en servidor.
 */
export function PrivacyLocalBadge({ className }: PrivacyLocalBadgeProps) {
  return (
    <div
      className={cn(
        "mt-3 flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/60 px-4 py-2.5 text-xs leading-5 text-emerald-800 print:hidden",
        className,
      )}
    >
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
      <p>
        <span aria-hidden="true">🔒</span> Procesamiento en local: ningún dato financiero introducido sale de este
        dispositivo ni se envía a servidores.
      </p>
    </div>
  );
}
