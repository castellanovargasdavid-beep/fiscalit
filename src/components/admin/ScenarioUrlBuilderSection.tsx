"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Link2 } from "lucide-react";
import { tools } from "@/config/tools";
import { SCENARIO_URL_TOOLS } from "@/config/adminOps";
import { siteConfig } from "@/config/site";

function ToolUrlBuilder({ config }: { config: (typeof SCENARIO_URL_TOOLS)[number] }) {
  const tool = tools.find((item) => item.slug === config.slug);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.fields.map((field) => [field.key, field.defaultValue])),
  );

  const url = useMemo(() => {
    if (!tool) return null;
    if (!config.supportsUrlParams) return `${siteConfig.url}${tool.href}`;
    const params = new URLSearchParams();
    for (const field of config.fields) {
      params.set(field.key, String(values[field.key] ?? field.defaultValue));
    }
    return `${siteConfig.url}${tool.href}?${params.toString()}`;
  }, [tool, config, values]);

  if (!tool || !url) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-white">{tool.title}</p>
        {config.supportsUrlParams ? (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            Lee parámetros de URL
          </span>
        ) : (
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            Sin parámetros
          </span>
        )}
      </div>

      {config.supportsUrlParams ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {config.fields.map((field) => (
            <label key={field.key} className="block text-xs text-slate-400">
              {field.label}
              <input
                type="number"
                value={values[field.key] ?? field.defaultValue}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, [field.key]: Number(event.target.value) }))
                }
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </label>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Esta herramienta no llama a <code className="rounded bg-slate-800 px-1 py-0.5">useUrlSeededScenario</code>:
          el enlace abre la calculadora con sus valores por defecto, sin poder precargar un escenario por URL.
        </p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <p className="flex-1 truncate rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-slate-400">
          {url}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          Abrir
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function ScenarioUrlBuilderSection() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Link2 className="h-4 w-4 text-blue-400" aria-hidden="true" />
        <h2 className="text-base font-semibold text-white">Simulador de escenarios y generador de URLs</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        Genera y abre en vivo una URL de prueba para cada herramienta. Solo{" "}
        <strong className="text-slate-300">Autónomo vs SL</strong> y{" "}
        <strong className="text-slate-300">Cuota de autónomos</strong> leen parámetros de la URL hoy (
        <code className="rounded bg-slate-800 px-1 py-0.5 text-[11px]">useUrlSeededScenario</code>); el resto se
        listan igualmente para tener un acceso directo de comprobación, pero sin parámetros.
      </p>

      <div className="mt-4 grid gap-3">
        {SCENARIO_URL_TOOLS.map((config) => (
          <ToolUrlBuilder key={config.slug} config={config} />
        ))}
      </div>
    </div>
  );
}
