"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { compararAutonomoVsSL } from "@/lib/calculations/autonomoVsSL";
import { SliderInput } from "@/components/ui/SliderInput";
import { SplitBar, type SplitBarSegment } from "@/components/tools/SplitBar";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AutonomoVsSLToolProps {
  faqItems: FAQItem[];
}

interface DetalleLinea {
  label: string;
  value: number;
}

export function AutonomoVsSLTool({ faqItems }: AutonomoVsSLToolProps) {
  const [ingresosAnuales, setIngresosAnuales] = useState(60_000);
  const [gastosDeduciblesAnuales, setGastosDeduciblesAnuales] = useState(12_000);
  const [salarioBrutoAdministrador, setSalarioBrutoAdministrador] = useState(18_000);

  const resultado = useMemo(
    () =>
      compararAutonomoVsSL({
        ingresosAnuales,
        gastosDeduciblesAnuales,
        salarioBrutoAdministrador,
      }),
    [ingresosAnuales, gastosDeduciblesAnuales, salarioBrutoAdministrador],
  );

  const { autonomo, sociedadLimitada, diferenciaNeta, opcionMasVentajosa } = resultado;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        Autónomo vs Sociedad Limitada
      </h1>

      <div className="mt-6 grid gap-6 rounded-2xl border border-zinc-200 p-6 sm:grid-cols-3 dark:border-zinc-800">
        <SliderInput
          label="Facturación bruta anual"
          value={ingresosAnuales}
          onChange={setIngresosAnuales}
          min={0}
          max={300_000}
          step={1_000}
          formatValue={(value) => formatEUR(value)}
        />
        <SliderInput
          label="Gastos deducibles anuales"
          value={gastosDeduciblesAnuales}
          onChange={setGastosDeduciblesAnuales}
          min={0}
          max={150_000}
          step={500}
          formatValue={(value) => formatEUR(value)}
        />
        <SliderInput
          label="Sueldo anual como administrador (si creas SL)"
          value={salarioBrutoAdministrador}
          onChange={setSalarioBrutoAdministrador}
          min={0}
          max={100_000}
          step={500}
          formatValue={(value) => formatEUR(value)}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ResultCard
          titulo="Autónomo"
          neto={autonomo.netoDisponible}
          esGanador={opcionMasVentajosa === "autonomo"}
          segments={[
            { label: "Neto disponible", value: autonomo.netoDisponible, className: "bg-emerald-500" },
            { label: "Cuota RETA", value: autonomo.cuotaRetaAnual, className: "bg-amber-500" },
            { label: "IRPF", value: autonomo.cuotaIRPF, className: "bg-rose-500" },
          ]}
          detalle={[
            { label: "Rendimiento neto", value: autonomo.rendimientoNetoAnual },
            { label: "Cuota RETA anual", value: -autonomo.cuotaRetaAnual },
            { label: "IRPF", value: -autonomo.cuotaIRPF },
          ]}
        />
        <ResultCard
          titulo="Sociedad Limitada"
          neto={sociedadLimitada.netoDisponible}
          esGanador={opcionMasVentajosa === "sociedad_limitada"}
          segments={[
            {
              label: "Neto disponible",
              value: sociedadLimitada.netoDisponible,
              className: "bg-emerald-500",
            },
            {
              label: "Impuesto Sociedades",
              value: sociedadLimitada.cuotaImpuestoSociedades,
              className: "bg-orange-500",
            },
            {
              label: "Cuota RETA societaria",
              value: sociedadLimitada.cuotaRetaSocietariaAnual,
              className: "bg-amber-500",
            },
            { label: "IRPF nómina", value: sociedadLimitada.irpfNomina, className: "bg-rose-500" },
            {
              label: "IRPF dividendos",
              value: sociedadLimitada.tributacionDividendos,
              className: "bg-purple-500",
            },
          ]}
          detalle={[
            { label: "Salario neto administrador", value: sociedadLimitada.salarioNetoAdministrador },
            { label: "Impuesto sobre Sociedades", value: -sociedadLimitada.cuotaImpuestoSociedades },
            { label: "Cuota RETA societaria", value: -sociedadLimitada.cuotaRetaSocietariaAnual },
            { label: "Dividendos netos", value: sociedadLimitada.dividendosNetos },
          ]}
        />
      </div>

      <div
        className={cn(
          "mt-6 rounded-2xl border p-5 text-center",
          opcionMasVentajosa === "equivalente"
            ? "border-zinc-200 dark:border-zinc-800"
            : "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
        )}
      >
        {opcionMasVentajosa === "equivalente" ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Ambas opciones te dejan un neto disponible prácticamente igual.
          </p>
        ) : (
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Te conviene ser{" "}
            <strong className="text-zinc-900 dark:text-zinc-50">
              {opcionMasVentajosa === "autonomo" ? "Autónomo" : "Sociedad Limitada"}
            </strong>
            : ganas{" "}
            <strong className="text-emerald-600 dark:text-emerald-400">
              {formatEUR(Math.abs(diferenciaNeta))}
            </strong>{" "}
            más al año.
          </p>
        )}
      </div>

      <div className="mt-10">
        <AffiliateCard partnerId="ayuda-t-pymes" />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}

interface ResultCardProps {
  titulo: string;
  neto: number;
  esGanador: boolean;
  segments: SplitBarSegment[];
  detalle: DetalleLinea[];
}

function ResultCard({ titulo, neto, esGanador, segments, detalle }: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        esGanador ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-200 dark:border-zinc-800",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{titulo}</h2>
        {esGanador && (
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-900">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Más ventajoso
          </span>
        )}
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {formatEUR(neto)}
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">Neto disponible al año</p>

      <div className="mt-4">
        <SplitBar segments={segments} />
      </div>

      <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        {detalle.map((linea) => (
          <li key={linea.label} className="flex justify-between gap-4">
            <span>{linea.label}</span>
            <span
              className={
                linea.value < 0
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-zinc-900 dark:text-zinc-50"
              }
            >
              {linea.value < 0 ? "−" : ""}
              {formatEUR(Math.abs(linea.value))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
