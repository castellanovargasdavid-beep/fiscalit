"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { compararAutonomoVsSL } from "@/lib/calculations/autonomoVsSL";
import { SliderInput } from "@/components/ui/SliderInput";
import { ScenarioPresets, type ScenarioPreset } from "@/components/ui/ScenarioPresets";
import { ScenarioActions } from "@/components/tools/ScenarioActions";
import { SplitBar, type SplitBarSegment } from "@/components/tools/SplitBar";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { useSyncScenarioToUrl, useUrlSeededScenario } from "@/lib/useScenarioShare";
import { downloadScenarioPdf } from "@/lib/generateScenarioPdf";
import { getAffiliate } from "@/config/affiliates";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AutonomoVsSLToolProps {
  faqItems: FAQItem[];
}

interface DetalleLinea {
  label: string;
  value: number;
}

interface Escenario {
  ingresosAnuales: number;
  gastosDeduciblesAnuales: number;
  salarioBrutoAdministrador: number;
}

const ESCENARIO_POR_DEFECTO: Escenario = {
  ingresosAnuales: 60_000,
  gastosDeduciblesAnuales: 12_000,
  salarioBrutoAdministrador: 18_000,
};

const PRESETS: ScenarioPreset<Escenario>[] = [
  {
    label: "Freelance Tech (55k / 5k)",
    values: { ingresosAnuales: 55_000, gastosDeduciblesAnuales: 5_000, salarioBrutoAdministrador: 16_000 },
  },
  {
    label: "E-commerce / Micropyme (130k / 45k)",
    values: { ingresosAnuales: 130_000, gastosDeduciblesAnuales: 45_000, salarioBrutoAdministrador: 24_000 },
  },
  {
    label: "Profesional de Servicios (30k / 3k)",
    values: { ingresosAnuales: 30_000, gastosDeduciblesAnuales: 3_000, salarioBrutoAdministrador: 12_000 },
  },
];

export function AutonomoVsSLTool({ faqItems }: AutonomoVsSLToolProps) {
  const [escenario, setEscenario] = useState<Escenario>(ESCENARIO_POR_DEFECTO);
  useUrlSeededScenario(ESCENARIO_POR_DEFECTO, setEscenario);
  useSyncScenarioToUrl(escenario);

  const { ingresosAnuales, gastosDeduciblesAnuales, salarioBrutoAdministrador } = escenario;

  const aplicarPreset = (valores: Partial<Escenario>) => {
    setEscenario((prev) => ({ ...prev, ...valores }));
  };

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

  const ctaGestoria =
    opcionMasVentajosa === "sociedad_limitada"
      ? {
          dynamicHeadline: `Ahorra esos ${formatEUR(Math.abs(diferenciaNeta))} al año: constituye tu SL con Ayuda T Pymes en 48h.`,
          dynamicSavingAmount: Math.abs(diferenciaNeta),
          promoBadgeText: "Cupón exclusivo: -20% en tu primer año",
        }
      : {
          dynamicHeadline:
            "Te compensa seguir siendo autónomo: no dejes deducciones sin aplicar y optimiza tu contabilidad con Ayuda T Pymes.",
          promoBadgeText: "Primera consulta gratuita",
        };

  const conclusion =
    opcionMasVentajosa === "equivalente"
      ? "Ambas opciones te dejan un neto disponible prácticamente igual."
      : `Te conviene ser ${opcionMasVentajosa === "autonomo" ? "Autónomo" : "Sociedad Limitada"}: ganas ${formatEUR(Math.abs(diferenciaNeta))} más al año.`;

  const handleDownloadPdf = () => {
    const partner = getAffiliate("ayuda-t-pymes");
    return downloadScenarioPdf({
      toolTitle: "Autónomo vs Sociedad Limitada",
      highlight: conclusion,
      fileName: "fiscalit-autonomo-vs-sl",
      sections: [
        {
          title: "Datos introducidos",
          rows: [
            { label: "Facturación bruta anual", value: formatEUR(ingresosAnuales) },
            { label: "Gastos deducibles anuales", value: formatEUR(gastosDeduciblesAnuales) },
            { label: "Sueldo anual como administrador", value: formatEUR(salarioBrutoAdministrador) },
          ],
        },
        {
          title: "Resultado — Autónomo",
          rows: [
            { label: "Rendimiento neto", value: formatEUR(autonomo.rendimientoNetoAnual) },
            { label: "Cuota RETA anual", value: formatEUR(autonomo.cuotaRetaAnual) },
            { label: "IRPF", value: formatEUR(autonomo.cuotaIRPF) },
            { label: "Neto disponible al año", value: formatEUR(autonomo.netoDisponible) },
          ],
        },
        {
          title: "Resultado — Sociedad Limitada",
          rows: [
            { label: "Salario neto administrador", value: formatEUR(sociedadLimitada.salarioNetoAdministrador) },
            { label: "Impuesto sobre Sociedades", value: formatEUR(sociedadLimitada.cuotaImpuestoSociedades) },
            { label: "Cuota RETA societaria", value: formatEUR(sociedadLimitada.cuotaRetaSocietariaAnual) },
            { label: "Dividendos netos", value: formatEUR(sociedadLimitada.dividendosNetos) },
            { label: "Neto disponible al año", value: formatEUR(sociedadLimitada.netoDisponible) },
          ],
        },
      ],
      promo: {
        partnerName: partner.name,
        badgeText: ctaGestoria.promoBadgeText,
        ctaLabel: partner.ctaLabel,
        url: partner.url,
      },
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Autónomo vs Sociedad Limitada
      </h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ScenarioPresets presets={PRESETS} onSelect={aplicarPreset} />
        <ScenarioActions onReset={() => setEscenario(ESCENARIO_POR_DEFECTO)} onDownloadPdf={handleDownloadPdf} />
      </div>

      <div className="mt-4 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3">
        <SliderInput
          label="Facturación bruta anual"
          value={ingresosAnuales}
          onChange={(value) => setEscenario((prev) => ({ ...prev, ingresosAnuales: value }))}
          min={0}
          max={300_000}
          step={1_000}
          formatValue={(value) => formatEUR(value)}
        />
        <SliderInput
          label="Gastos deducibles anuales"
          value={gastosDeduciblesAnuales}
          onChange={(value) => setEscenario((prev) => ({ ...prev, gastosDeduciblesAnuales: value }))}
          min={0}
          max={150_000}
          step={500}
          formatValue={(value) => formatEUR(value)}
        />
        <SliderInput
          label="Sueldo anual como administrador (si creas SL)"
          value={salarioBrutoAdministrador}
          onChange={(value) => setEscenario((prev) => ({ ...prev, salarioBrutoAdministrador: value }))}
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
          opcionMasVentajosa === "equivalente" ? "border-slate-200 bg-white" : "border-emerald-200 bg-emerald-50",
        )}
      >
        {opcionMasVentajosa === "equivalente" ? (
          <p className="text-sm text-slate-600">{conclusion}</p>
        ) : (
          <p className="text-sm text-slate-700">
            Te conviene ser <strong className="text-slate-900">{opcionMasVentajosa === "autonomo" ? "Autónomo" : "Sociedad Limitada"}</strong>
            : ganas <strong className="text-emerald-600">{formatEUR(Math.abs(diferenciaNeta))}</strong> más al año.
          </p>
        )}
      </div>

      <div className="mt-10">
        <AffiliateCard partnerId="ayuda-t-pymes" {...ctaGestoria} />
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
        "rounded-2xl border bg-white p-6 shadow-sm",
        esGanador ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">{titulo}</h2>
        {esGanador && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Más ventajoso
          </span>
        )}
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-emerald-600">{formatEUR(neto)}</p>
      <p className="text-sm text-slate-500">Neto disponible al año</p>

      <div className="mt-4">
        <SplitBar segments={segments} />
      </div>

      <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
        {detalle.map((linea) => (
          <li key={linea.label} className="flex justify-between gap-4">
            <span>{linea.label}</span>
            <span className={linea.value < 0 ? "text-rose-600" : "text-slate-900"}>
              {linea.value < 0 ? "−" : ""}
              {formatEUR(Math.abs(linea.value))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
