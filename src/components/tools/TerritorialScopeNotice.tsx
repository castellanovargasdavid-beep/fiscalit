import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerritorialScopeNoticeProps {
  className?: string;
}

/**
 * Aviso de ámbito territorial para calculadoras cuya normativa (IRPF, IVA,
 * Impuesto de Sociedades) varía por régimen foral o insular: el sistema
 * tributario español no es uniforme en todo el territorio (concierto
 * económico vasco, convenio navarro, REF canario, IPSI en Ceuta y Melilla).
 */
export function TerritorialScopeNotice({ className }: TerritorialScopeNoticeProps) {
  return (
    <div
      className={cn(
        "mt-4 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs leading-5 text-slate-500 print:hidden",
        className,
      )}
    >
      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
      <p>
        <strong className="font-medium text-slate-600">
          Ámbito de aplicación: Territorio Común (Península y Baleares).
        </strong>{" "}
        No contempla regímenes forales ni especialidades de Canarias (IGIC) o Ceuta/Melilla (IPSI). Si operas en
        estos territorios, consulta la normativa foral/insular aplicable.
      </p>
    </div>
  );
}
