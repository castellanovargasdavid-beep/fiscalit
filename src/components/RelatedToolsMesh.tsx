import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools, type Tool } from "@/config/tools";

/** Acción concreta que resuelve cada herramienta en 1 clic, para el copy de la malla de interconexión. */
const ACCION_EN_UN_CLIC: Record<string, string> = {
  "calculadora-cuota-autonomos": "Calcula tu tramo RETA y cuota mensual exacta.",
  "retencion-factura-iae": "Comprueba el % de retención IRPF de tu factura.",
  "autonomo-vs-sl": "Compara tu neto como autónomo o como SL.",
  "diagnostico-verifactu": "Revisa si tu sistema cumple VeriFactu.",
  "calculadora-kilometraje-dietas": "Calcula el importe exento de tus dietas y km.",
  "pluriactividad-devolucion": "Comprueba tu devolución por pluriactividad.",
};

interface RelatedToolsMeshProps {
  /** Slugs de las herramientas complementarias a sugerir (ver `src/config/tools.ts`), normalmente 2 o 3. */
  slugs: string[];
}

/**
 * Malla de interconexión de la suite: sugiere, al terminar una calculadora,
 * las herramientas complementarias que continúan el mismo ejercicio fiscal,
 * para retener al usuario dentro del ecosistema Fiscalit en vez de que
 * vuelva a buscar en Google.
 */
export function RelatedToolsMesh({ slugs }: RelatedToolsMeshProps) {
  const resueltas = slugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => tool !== undefined);

  if (resueltas.length === 0) return null;

  return (
    <section className="mt-10 print:hidden" aria-labelledby="related-tools-mesh-heading">
      <h2 id="related-tools-mesh-heading" className="text-lg font-semibold text-slate-900">
        Continúa optimizando tu ejercicio fiscal
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resueltas.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50/40"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-900">{tool.title}</p>
              </div>
              <p className="mt-2 text-sm leading-5 text-slate-600">
                {ACCION_EN_UN_CLIC[tool.slug] ?? tool.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-700">
                Ir a la herramienta
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
