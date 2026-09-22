import { ExternalLink } from "lucide-react";
import { OPERATIONAL_LINKS } from "@/config/adminOps";

export function DeploymentLinksSection() {
  return (
    <div>
      <h2 className="text-base font-semibold text-white">Estado del despliegue y enlaces operativos</h2>
      <p className="mt-1 text-sm text-slate-400">
        Accesos directos a los paneles externos de indexación e infraestructura. Cada uno requiere tu propia sesión
        iniciada en ese servicio: este panel no almacena ni transmite credenciales.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {OPERATIONAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-blue-500/50 hover:bg-slate-800"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{link.label}</p>
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0 text-slate-500 transition-colors group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">{link.description}</p>
            </div>
            <p className="mt-3 truncate font-mono text-[11px] text-slate-500">{link.href}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
