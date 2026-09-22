import { CheckCircle2, XCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ComplianceField {
  label: string;
  value: string;
  envVar: string;
}

const FIELDS: ComplianceField[] = [
  { label: "Titular (razón social o nombre)", value: siteConfig.legalName, envVar: "NEXT_PUBLIC_LEGAL_NAME" },
  { label: "NIF / CIF", value: siteConfig.taxId, envVar: "NEXT_PUBLIC_LEGAL_TAX_ID" },
  { label: "Domicilio a efectos de notificaciones", value: siteConfig.legalAddress, envVar: "NEXT_PUBLIC_LEGAL_ADDRESS" },
  { label: "Email de contacto y notificaciones", value: siteConfig.contactEmail, envVar: "NEXT_PUBLIC_CONTACT_EMAIL" },
];

export function ComplianceChecklistSection() {
  const allFilled = FIELDS.every((field) => field.value.trim().length > 0);

  return (
    <div>
      <h2 className="text-base font-semibold text-white">Recordatorio de cumplimiento legal (LSSI / RGPD)</h2>
      <p className="mt-1 text-sm text-slate-400">
        Los mismos valores de <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px] text-slate-300">site.ts</code>{" "}
        que se publican en <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px] text-slate-300">/aviso-legal</code>{" "}
        y <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px] text-slate-300">/privacidad</code>: nunca deben
        quedar vacíos en producción (art. 10 LSSI-CE).
      </p>

      <div
        className={cn(
          "mt-4 rounded-xl border p-4 text-sm font-medium",
          allFilled
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border-rose-500/30 bg-rose-500/10 text-rose-400",
        )}
      >
        {allFilled
          ? "Todos los campos de titularidad están completos."
          : "Faltan campos de titularidad por completar: revísalos antes de indexar el sitio."}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
              <th className="px-4 py-3 font-medium">Campo</th>
              <th className="px-4 py-3 font-medium">Valor actual</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field) => {
              const filled = field.value.trim().length > 0;
              return (
                <tr key={field.envVar} className="border-b border-slate-800/70 bg-slate-950 align-top last:border-b-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{field.label}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-500">{field.envVar}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{field.value || "(vacío)"}</td>
                  <td className="px-4 py-3">
                    {filled ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-400" aria-hidden="true" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
