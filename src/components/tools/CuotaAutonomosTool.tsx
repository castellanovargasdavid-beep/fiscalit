"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  TABLA_TRAMOS_RETA,
  calcularCuotaAutonomo,
  type TipoAutonomo,
} from "@/lib/calculations/cuotaAutonomos";
import { SliderInput } from "@/components/ui/SliderInput";
import { ScenarioPresets, type ScenarioPreset } from "@/components/ui/ScenarioPresets";
import { ScenarioActions } from "@/components/tools/ScenarioActions";
import { LegalSourceBadge } from "@/components/tools/LegalSourceBadge";
import { EmbedWidgetModal } from "@/components/EmbedWidgetModal";
import { PrintHeader } from "@/components/tools/PrintHeader";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { useSyncScenarioToUrl, useUrlSeededScenario } from "@/lib/useScenarioShare";
import { downloadScenarioPdf } from "@/lib/generateScenarioPdf";
import { downloadScenarioCsv } from "@/lib/exportCsv";
import { getAffiliate } from "@/config/affiliates";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CuotaAutonomosToolProps {
  faqItems: FAQItem[];
}

interface Escenario {
  ingresosAnuales: number;
  gastosDeduciblesAnuales: number;
  tipoAutonomo: TipoAutonomo;
}

const ESCENARIO_POR_DEFECTO: Escenario = {
  ingresosAnuales: 30_000,
  gastosDeduciblesAnuales: 6_000,
  tipoAutonomo: "individual",
};

const PRESETS: ScenarioPreset<Escenario>[] = [
  {
    label: "Inicio de actividad / Bajos ingresos (15k)",
    values: { ingresosAnuales: 15_000, gastosDeduciblesAnuales: 3_000 },
  },
  {
    label: "Rendimiento medio consolidado (38k)",
    values: { ingresosAnuales: 38_000, gastosDeduciblesAnuales: 7_000 },
  },
  {
    label: "Alta facturación / Tramo superior (65k)",
    values: { ingresosAnuales: 65_000, gastosDeduciblesAnuales: 12_000 },
  },
];

const OPCIONES_TIPO: { value: TipoAutonomo; label: string }[] = [
  { value: "individual", label: "Autónomo individual" },
  { value: "societario", label: "Autónomo societario" },
];

export function CuotaAutonomosTool({ faqItems }: CuotaAutonomosToolProps) {
  const [escenario, setEscenario] = useState<Escenario>(ESCENARIO_POR_DEFECTO);
  useUrlSeededScenario(ESCENARIO_POR_DEFECTO, setEscenario);
  useSyncScenarioToUrl(escenario);

  const { ingresosAnuales, gastosDeduciblesAnuales, tipoAutonomo } = escenario;

  const aplicarPreset = (valores: Partial<Escenario>) => {
    setEscenario((prev) => ({ ...prev, ...valores }));
  };

  const rendimientoNetoAnual = Math.max(0, ingresosAnuales - gastosDeduciblesAnuales);

  const resultado = useMemo(
    () => calcularCuotaAutonomo(rendimientoNetoAnual, tipoAutonomo),
    [rendimientoNetoAnual, tipoAutonomo],
  );

  const ctaHolded = {
    dynamicHeadline: `Estás en el Tramo ${resultado.tramoAsignado.tramo}/15: lleva tus gastos e ingresos al céntimo con Holded para no pagar de más a la TGSS.`,
    promoBadgeText: "Prueba gratis 30 días",
  };

  const reportSections = [
    {
      title: "Datos introducidos",
      rows: [
        { label: "Ingresos brutos anuales", value: formatEUR(ingresosAnuales) },
        { label: "Gastos deducibles anuales", value: formatEUR(gastosDeduciblesAnuales) },
        {
          label: "Tipo de autónomo",
          value: tipoAutonomo === "individual" ? "Individual" : "Societario",
        },
      ],
    },
    {
      title: "Resultado",
      rows: [
        { label: "Tramo asignado", value: `${resultado.tramoAsignado.tramo} / 15` },
        { label: "Rendimiento neto mensual", value: formatEUR(resultado.rendimientoNetoMensual) },
        { label: "Rendimiento neto computable", value: formatEUR(resultado.rendimientoNetoComputable) },
        { label: "Cuota mensual mínima", value: formatEUR(resultado.cuotaMensualMinima) },
        { label: "Cuota mensual máxima", value: formatEUR(resultado.cuotaMensualMaxima) },
      ],
    },
  ];

  const handleDownloadPdf = () => {
    const partner = getAffiliate("holded");
    return downloadScenarioPdf({
      toolTitle: "Calculadora de cuota de autónomos por tramos",
      highlight: `Tramo asignado: ${resultado.tramoAsignado.tramo}/15 — cuota mensual entre ${formatEUR(resultado.cuotaMensualMinima)} y ${formatEUR(resultado.cuotaMensualMaxima)}.`,
      fileName: "fiscalit-cuota-autonomos",
      sections: reportSections,
      promo: {
        partnerName: partner.name,
        badgeText: ctaHolded.promoBadgeText,
        ctaLabel: partner.ctaLabel,
        url: partner.url,
      },
    });
  };

  const handleDownloadCsv = () => {
    downloadScenarioCsv({
      toolTitle: "Calculadora de cuota de autónomos por tramos",
      fileName: "fiscalit-cuota-autonomos",
      sections: reportSections,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PrintHeader toolTitle="Calculadora de cuota de autónomos por tramos" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Calculadora de cuota de autónomos por tramos
        </h1>
        <EmbedWidgetModal
          slug="calculadora-cuota-autonomos"
          toolTitle="Calculadora de cuota de autónomos por tramos"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ScenarioPresets presets={PRESETS} onSelect={aplicarPreset} />
        <ScenarioActions
          onReset={() => setEscenario(ESCENARIO_POR_DEFECTO)}
          onDownloadPdf={handleDownloadPdf}
          onDownloadCsv={handleDownloadCsv}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderInput
            label="Ingresos brutos anuales"
            value={ingresosAnuales}
            onChange={(value) => setEscenario((prev) => ({ ...prev, ingresosAnuales: value }))}
            min={0}
            max={150_000}
            step={500}
            formatValue={(value) => formatEUR(value)}
          />
          <SliderInput
            label="Gastos deducibles anuales"
            value={gastosDeduciblesAnuales}
            onChange={(value) => setEscenario((prev) => ({ ...prev, gastosDeduciblesAnuales: value }))}
            min={0}
            max={100_000}
            step={250}
            formatValue={(value) => formatEUR(value)}
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-700">Tipo de autónomo</p>
          <div className="mt-2 inline-flex rounded-full border border-slate-200 p-1 print:hidden">
            {OPCIONES_TIPO.map((opcion) => (
              <button
                key={opcion.value}
                type="button"
                onClick={() => setEscenario((prev) => ({ ...prev, tipoAutonomo: opcion.value }))}
                aria-pressed={tipoAutonomo === opcion.value}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  tipoAutonomo === opcion.value
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4 print:break-inside-avoid">
        <StatCard label="Tramo asignado" value={`Tramo ${resultado.tramoAsignado.tramo} / 15`} destacado />
        <StatCard label="Rendimiento neto mensual" value={formatEUR(resultado.rendimientoNetoMensual)} />
        <StatCard label="Cuota mensual mínima" value={formatEUR(resultado.cuotaMensualMinima)} />
        <StatCard label="Cuota mensual máxima" value={formatEUR(resultado.cuotaMensualMaxima)} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Deducción de gastos de difícil justificación aplicada:{" "}
        <strong className="text-slate-700">{tipoAutonomo === "individual" ? "7%" : "3%"}</strong> —
        rendimiento neto computable: {formatEUR(resultado.rendimientoNetoComputable)}/año.
      </p>

      <details className="group mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
          Ver los 15 tramos oficiales de cotización
          <ChevronDown
            className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
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
                    "border-b border-slate-100",
                    tramo.tramo === resultado.tramoAsignado.tramo && "bg-blue-50 font-medium",
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

      <LegalSourceBadge
        fuente="Basado en el Real Decreto-ley 13/2022 y tablas del BOE núm. 180."
        url="https://www.boe.es/buscar/act.php?id=BOE-A-2022-12482"
      />

      <div className="mt-10">
        <AffiliateCard partnerId="holded" {...ctaHolded} />
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
        "rounded-xl border p-4 shadow-sm",
        destacado ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white",
      )}
    >
      <p className={cn("text-xs", destacado ? "text-blue-100" : "text-slate-500")}>{label}</p>
      <p className={cn("mt-1 text-lg font-semibold", destacado ? "text-white" : "text-slate-900")}>{value}</p>
    </div>
  );
}
