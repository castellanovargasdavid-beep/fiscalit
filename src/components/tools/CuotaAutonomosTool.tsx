"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  TABLA_TRAMOS_RETA,
  calcularCuotaAutonomo,
  type TipoAutonomo,
} from "@/lib/calculations/cuotaAutonomos";
import { SliderInput } from "@/components/ui/SliderInput";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CuotaAutonomosToolProps {
  faqItems: FAQItem[];
}

const OPCIONES_TIPO: { value: TipoAutonomo; label: string }[] = [
  { value: "individual", label: "Autónomo individual" },
  { value: "societario", label: "Autónomo societario" },
];

export function CuotaAutonomosTool({ faqItems }: CuotaAutonomosToolProps) {
  const [ingresosAnuales, setIngresosAnuales] = useState(30_000);
  const [gastosDeduciblesAnuales, setGastosDeduciblesAnuales] = useState(6_000);
  const [tipoAutonomo, setTipoAutonomo] = useState<TipoAutonomo>("individual");

  const rendimientoNetoAnual = Math.max(0, ingresosAnuales - gastosDeduciblesAnuales);

  const resultado = useMemo(
    () => calcularCuotaAutonomo(rendimientoNetoAnual, tipoAutonomo),
    [rendimientoNetoAnual, tipoAutonomo],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        Calculadora de cuota de autónomos por tramos
      </h1>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderInput
            label="Ingresos brutos anuales"
            value={ingresosAnuales}
            onChange={setIngresosAnuales}
            min={0}
            max={150_000}
            step={500}
            formatValue={(value) => formatEUR(value)}
          />
          <SliderInput
            label="Gastos deducibles anuales"
            value={gastosDeduciblesAnuales}
            onChange={setGastosDeduciblesAnuales}
            min={0}
            max={100_000}
            step={250}
            formatValue={(value) => formatEUR(value)}
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tipo de autónomo</p>
          <div className="mt-2 inline-flex rounded-full border border-zinc-200 p-1 dark:border-zinc-800">
            {OPCIONES_TIPO.map((opcion) => (
              <button
                key={opcion.value}
                type="button"
                onClick={() => setTipoAutonomo(opcion.value)}
                aria-pressed={tipoAutonomo === opcion.value}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  tipoAutonomo === opcion.value
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                )}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <StatCard label="Tramo asignado" value={`Tramo ${resultado.tramoAsignado.tramo} / 15`} destacado />
        <StatCard label="Rendimiento neto mensual" value={formatEUR(resultado.rendimientoNetoMensual)} />
        <StatCard label="Cuota mensual mínima" value={formatEUR(resultado.cuotaMensualMinima)} />
        <StatCard label="Cuota mensual máxima" value={formatEUR(resultado.cuotaMensualMaxima)} />
      </div>

      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
        Deducción de gastos de difícil justificación aplicada:{" "}
        <strong className="text-zinc-700 dark:text-zinc-300">
          {tipoAutonomo === "individual" ? "7%" : "3%"}
        </strong>{" "}
        — rendimiento neto computable: {formatEUR(resultado.rendimientoNetoComputable)}/año.
      </p>

      <details className="group mt-8 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Ver los 15 tramos oficiales de cotización
          <ChevronDown
            className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
                <th className="py-2 pr-4 font-medium">Tramo</th>
                <th className="py-2 pr-4 font-medium">Rendimiento neto mensual</th>
                <th className="py-2 pr-4 font-medium">Base mínima</th>
                <th className="py-2 pr-4 font-medium">Base máxima</th>
              </tr>
            </thead>
            <tbody>
              {TABLA_TRAMOS_RETA.map((tramo) => (
                <tr
                  key={tramo.tramo}
                  className={cn(
                    "border-b border-zinc-100 dark:border-zinc-900",
                    tramo.tramo === resultado.tramoAsignado.tramo &&
                      "bg-zinc-100 font-medium dark:bg-zinc-800",
                  )}
                >
                  <td className="py-2 pr-4">{tramo.tramo}</td>
                  <td className="py-2 pr-4">
                    {formatEUR(tramo.rendimientoNetoMinimo)} –{" "}
                    {tramo.rendimientoNetoMaximo ? formatEUR(tramo.rendimientoNetoMaximo) : "sin límite"}
                  </td>
                  <td className="py-2 pr-4">{formatEUR(tramo.baseMinima, true)}</td>
                  <td className="py-2 pr-4">{formatEUR(tramo.baseMaxima, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="mt-10">
        <AffiliateCard partnerId="holded" />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}

function StatCard({
  label,
  value,
  destacado,
}: {
  label: string;
  value: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        destacado
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
          : "border-zinc-200 dark:border-zinc-800",
      )}
    >
      <p
        className={cn(
          "text-xs",
          destacado ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-500",
        )}
      >
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
