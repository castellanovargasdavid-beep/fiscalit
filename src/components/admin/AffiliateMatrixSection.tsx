import { CheckCircle2, CircleDashed } from "lucide-react";
import { affiliates } from "@/config/affiliates";
import { cn } from "@/lib/utils";

/** Notas de contacto/alta de cada programa de afiliación, para seguimiento manual del equipo. */
const PARTNER_CONTACT_NOTES: Record<string, string> = {
  holded: "Programa de afiliados propio de Holded: solicitar alta desde su web y sustituir la URL por el enlace de tracking.",
  quipu: "Quipu gestiona colaboraciones vía contacto comercial directo (partnerships@).",
  qonto: "Qonto opera su programa de afiliados a través de una plataforma de terceros (revisar alta vigente).",
  taxdown: "TaxDown gestiona afiliación B2B/B2C por contacto comercial directo.",
  "ayuda-t-pymes": "Gestoría de colaboración directa: acordar comisión y enlace de tracking por contrato propio.",
};

export function AffiliateMatrixSection() {
  const partners = Object.values(affiliates);

  return (
    <div>
      <h2 className="text-base font-semibold text-white">Matriz de control de afiliados</h2>
      <p className="mt-1 text-sm text-slate-400">
        Estado real de <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px] text-slate-300">src/config/affiliates.ts</code>.
        Todas las salidas del sitio pasan por <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px] text-slate-300">/go/[partner]</code>,
        así que cambiar la URL aquí basta para activar un partner sin tocar componentes.
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
              <th className="px-4 py-3 font-medium">Partner</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">URL de destino configurada</th>
              <th className="px-4 py-3 font-medium">Notas de contacto</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b border-slate-800/70 bg-slate-950 align-top last:border-b-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{partner.name}</p>
                  <p className="text-xs text-slate-500">{partner.category}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
                      partner.isLivePartner
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400",
                    )}
                  >
                    {partner.isLivePartner ? (
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {partner.isLivePartner ? "Activo" : "Placeholder"}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs break-all text-slate-300">{partner.url}</td>
                <td className="px-4 py-3 text-xs leading-5 text-slate-400">
                  {PARTNER_CONTACT_NOTES[partner.id] ?? "Sin notas registradas."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
