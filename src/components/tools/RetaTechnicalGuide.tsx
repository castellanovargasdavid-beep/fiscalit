import Link from "next/link";
import { BookOpen, Gavel, Receipt, RefreshCw } from "lucide-react";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { getAffiliate } from "@/config/affiliates";

/**
 * Preguntas frecuentes propias de este bloque de guía técnica (distintas de
 * las "Escenarios frecuentes y supuestos normativos" que ya muestra
 * CuotaAutonomosTool): están pensadas como respuestas directas y
 * autocontenidas para fragmentos destacados de búsqueda, no como casos de
 * borde numéricos.
 */
export const RETA_LANDING_FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Puedo cambiar de tramo de cotización durante el año?",
    answer:
      "Sí. La Seguridad Social permite solicitar un cambio de base de cotización hasta seis veces al año, en las ventanas que marca el calendario oficial (aproximadamente cada dos meses). El cambio se aplica desde el primer día del periodo siguiente a la solicitud, nunca con efecto retroactivo.",
  },
  {
    question: "¿Qué gastos se consideran deducibles para el cálculo del rendimiento neto?",
    answer:
      "Los mismos que en el IRPF en estimación directa: compras y suministros de la actividad, cuotas de autónomos ya abonadas, alquiler del local, seguros vinculados al negocio, gestoría, amortizaciones... Además, antes de ubicarte en un tramo, se aplica automáticamente una deducción adicional del 7% (3% si eres societario) por gastos de difícil justificación, sin necesidad de aportar factura por ese concepto.",
  },
  {
    question: "¿Cómo afecta ser autónomo societario al cálculo de la cuota?",
    answer:
      "El autónomo societario (administrador o socio con control efectivo de una sociedad) aplica una deducción del 3% en lugar del 7% sobre su rendimiento neto, y nunca puede quedar ubicado en el tramo 1: si su rendimiento neto mensual cae en ese rango, el sistema lo reubica automáticamente en el tramo 2, con una base de cotización algo superior.",
  },
];

/**
 * Bloque técnico "Tool-Led SEO" para la calculadora de cuota de autónomos:
 * metodología, fundamento legal, regularización anual y FAQ, renderizado
 * 100% en servidor (sin "use client") para que sea íntegramente rastreable.
 * Se monta en page.tsx, después de la herramienta interactiva.
 */
export function RetaTechnicalGuide() {
  const quipu = getAffiliate("quipu");

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
      <section aria-labelledby="reta-metodologia-heading">
        <h2
          id="reta-metodologia-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Metodología: cómo calcula la Seguridad Social tu base de cotización
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El simulador reproduce, paso a paso, el mismo cálculo que aplica la TGSS para ubicarte en uno de los 15
          tramos oficiales de cotización:
        </p>
        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
              1
            </span>
            <span>
              Se parte de tu <strong className="text-slate-900">rendimiento neto anual</strong> (ingresos menos
              gastos deducibles del ejercicio).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
              2
            </span>
            <span>
              Se resta la <strong className="text-slate-900">deducción por gastos genéricos</strong>: el 7% si eres
              autónomo individual, o el 3% si eres autónomo societario.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
              3
            </span>
            <span>
              El resultado (rendimiento neto computable) se divide entre{" "}
              <strong className="text-slate-900">12 meses</strong> para obtener tu rendimiento neto mensual.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
              4
            </span>
            <span>
              Ese importe mensual determina el tramo de cotización aplicable y, con él, la base mínima y máxima
              sobre la que se calcula tu cuota.
            </span>
          </li>
        </ol>
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600">
          Rendimiento neto mensual = [Rendimiento neto anual × (1 − 7% o 3%)] ÷ 12
        </p>
      </section>

      <section aria-labelledby="reta-normativa-heading">
        <h2 id="reta-normativa-heading" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <Gavel className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Normativa y fundamento legal
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          <li>
            <strong className="text-slate-900">Real Decreto-ley 13/2022</strong>, de 26 de julio: introduce el
            sistema de cotización de autónomos por rendimientos netos reales, con la tabla de 15 tramos que usa este
            simulador.
          </li>
          <li>
            <strong className="text-slate-900">Orden PJC/297/2026</strong>: fija las bases y tipos de cotización a
            la Seguridad Social vigentes para el ejercicio 2026, con las tablas oficiales publicadas en el BOE.
          </li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          Motor de cálculo RETA-2026.1 actualizado conforme a tablas de cotización vigentes
        </p>
        <p className="mt-3 text-sm text-slate-600">
          <Link href="/metodologia" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Consulta la metodología y fuentes completas de las 6 herramientas de FiscalIT
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="reta-regularizacion-heading">
        <h2
          id="reta-regularizacion-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <RefreshCw className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Regularización anual de la TGSS: escenarios posibles
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Tras la campaña de la Renta, la TGSS compara tu rendimiento neto anual real (el que declaras a Hacienda)
          con las cuotas que efectivamente ingresaste mes a mes según el tramo elegido. De esa comparación surgen
          dos escenarios:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">Cotizaste por debajo de tu rendimiento real</p>
            <p className="mt-1.5 text-sm leading-6 text-amber-800/90">
              La TGSS te reclama la diferencia entre lo ingresado y lo que te correspondía según tu tramo real. Se
              notifica con un plazo de pago, sin recargo si se abona dentro de ese plazo.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-900">Cotizaste por encima de tu rendimiento real</p>
            <p className="mt-1.5 text-sm leading-6 text-emerald-800/90">
              La TGSS te devuelve el exceso <strong>de oficio</strong>, sin que tengas que solicitarlo, dentro de
              los límites de tu tramo real.
            </p>
          </div>
        </div>
      </section>

      <FAQAccordion items={RETA_LANDING_FAQ_ITEMS} title="Preguntas frecuentes" headingId="reta-faq-heading" />

      <section
        aria-labelledby="reta-siguiente-paso-heading"
        className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6"
      >
        <h2
          id="reta-siguiente-paso-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <Receipt className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Próximo paso: control de tus ingresos reales
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          La clave para no llevarte sustos en la regularización anual no es acertar con la calculadora una vez al
          año, sino llevar tus ingresos y gastos al día durante todo el ejercicio. Digitalizar tus tickets y
          facturas de gastos deducibles en el momento en que se producen evita errores de cálculo y te da, en
          cualquier momento, una cifra real de rendimiento neto — la misma que necesitas para saber si tu tramo de
          cotización actual sigue siendo el correcto.
        </p>
        <a
          href={quipu.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Automatiza tus gastos deducibles con {quipu.name}
        </a>
        <p className="mt-2 text-xs text-slate-500">Puede que recibamos una comisión sin coste adicional para ti.</p>
      </section>
    </div>
  );
}
