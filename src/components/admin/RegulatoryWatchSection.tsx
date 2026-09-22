import { ExternalLink } from "lucide-react";
import { ENGINE_VERSIONS } from "@/config/engineVersions";
import { REGULATORY_WATCH_LINKS } from "@/config/adminOps";
import { siteConfig } from "@/config/site";
import { formatFechaISO } from "@/lib/format";

export function RegulatoryWatchSection() {
  return (
    <div>
      <h2 className="text-base font-semibold text-white">Vigilancia normativa y versiones</h2>
      <p className="mt-1 text-sm text-slate-400">
        Última revisión técnica global: <strong className="text-slate-200">{formatFechaISO(siteConfig.lastMethodologyReview)}</strong>.
        Misma fuente de datos que <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px] text-slate-300">/metodologia</code>.
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
              <th className="px-4 py-3 font-medium">Motor</th>
              <th className="px-4 py-3 font-medium">Versión</th>
              <th className="px-4 py-3 font-medium">Disposiciones aplicadas</th>
            </tr>
          </thead>
          <tbody>
            {ENGINE_VERSIONS.map((ficha) => (
              <tr key={ficha.version} className="border-b border-slate-800/70 bg-slate-950 align-top last:border-b-0">
                <td className="px-4 py-3 font-medium text-white">{ficha.motor}</td>
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-blue-400">{ficha.version}</td>
                <td className="px-4 py-3 text-xs leading-5 text-slate-400">{ficha.disposiciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 text-sm font-semibold text-white">Fuentes oficiales de monitorización</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {REGULATORY_WATCH_LINKS.map((link) => (
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
          </a>
        ))}
      </div>
    </div>
  );
}
