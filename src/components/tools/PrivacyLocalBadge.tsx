import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivacyLocalBadgeProps {
  className?: string;
}

/**
 * Micro-badge corporativo de privacidad: refuerza un atributo diferencial
 * de la suite (todo el cálculo ocurre en el navegador, sin backend) frente
 * a competidores que sí procesan los datos introducidos en servidor. El
 * texto matiza explícitamente la única excepción real del sitio (el
 * formulario opt-in de auditoría gratuita en HighValueLeadCard) para que
 * la promesa de privacidad sea exacta en cualquier página, la muestre o no.
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
        <span aria-hidden="true">🔒</span> Los cálculos se realizan exclusivamente en local en tu navegador. Si
        solicitas voluntariamente la auditoría fiscal gratuita, únicamente los datos de contacto y facturación
        que introduzcas en el formulario se remitirán de forma segura para gestionar tu petición.
      </p>
    </div>
  );
}
