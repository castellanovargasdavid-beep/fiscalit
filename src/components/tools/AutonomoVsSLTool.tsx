"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Download, Loader2 } from "lucide-react";
import { compararAutonomoVsSL, type ComunidadAutonoma } from "@/lib/calculations/autonomoVsSL";
import { SliderInput } from "@/components/ui/SliderInput";
import { ScenarioPresets, type ScenarioPreset } from "@/components/ui/ScenarioPresets";
import { ScenarioActions } from "@/components/tools/ScenarioActions";
import { SplitBar, type SplitBarSegment } from "@/components/tools/SplitBar";
import { LegalSourceBadge } from "@/components/tools/LegalSourceBadge";
import { HighValueLeadCard } from "@/components/tools/HighValueLeadCard";
import { CompactSimulationNotice } from "@/components/tools/CompactSimulationNotice";
import { CalculationTransparencyDetails } from "@/components/tools/CalculationTransparencyDetails";
import { SimulationDisclaimer } from "@/components/tools/SimulationDisclaimer";
import { PrivacyLocalBadge } from "@/components/tools/PrivacyLocalBadge";
import { TerritorialScopeNotice } from "@/components/tools/TerritorialScopeNotice";
import { EmbedWidgetModal } from "@/components/EmbedWidgetModal";
import { PrintHeader } from "@/components/tools/PrintHeader";
import { AffiliateCard } from "@/components/AffiliateCard";
import { RelatedToolsMesh } from "@/components/RelatedToolsMesh";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { useSyncScenarioToUrl, useUrlSeededScenario } from "@/lib/useScenarioShare";
import { useTrackCalculationCompleted } from "@/lib/hooks";
import { downloadScenarioPdf } from "@/lib/generateScenarioPdf";
import { downloadScenarioCsv } from "@/lib/exportCsv";
import { trackAffiliateClick, trackPdfDownload } from "@/lib/analytics";
import { getAffiliate } from "@/config/affiliates";
import { siteConfig } from "@/config/site";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AutonomoVsSLToolProps {
  faqItems: FAQItem[];
}

interface DetalleLinea {
  label: string;
  value: number;
  /** Línea puramente informativa (p. ej. un subtotal intermedio dentro de la sociedad) que no se suma al resto. */
  esInformativa?: boolean;
}

interface Escenario {
  ingresosAnuales: number;
  gastosDeduciblesAnuales: number;
  salarioBrutoAdministrador: number;
  comunidadAutonoma: ComunidadAutonoma;
  gestoriaAnualAutonomo: number;
  gestoriaAnualSL: number;
}

const ESCENARIO_POR_DEFECTO: Escenario = {
  ingresosAnuales: 60_000,
  gastosDeduciblesAnuales: 12_000,
  salarioBrutoAdministrador: 18_000,
  comunidadAutonoma: "general",
  gestoriaAnualAutonomo: 600,
  gestoriaAnualSL: 1_800,
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

const OPCIONES_COMUNIDAD: { value: ComunidadAutonoma; label: string }[] = [
  { value: "general", label: "Resto / General" },
  { value: "madrid", label: "Madrid" },
  { value: "cataluna", label: "Cataluña" },
  { value: "andalucia", label: "Andalucía" },
  { value: "comunidad_valenciana", label: "Comunidad Valenciana" },
];

/** Facturación bruta anual a partir de la cual se ofrece la auditoría mercantil gratuita (lead B2B de alto valor). */
const UMBRAL_LEAD_ALTO_VALOR = 80_000;

export function AutonomoVsSLTool({ faqItems }: AutonomoVsSLToolProps) {
  const [escenario, setEscenario] = useState<Escenario>(ESCENARIO_POR_DEFECTO);
  useUrlSeededScenario(ESCENARIO_POR_DEFECTO, setEscenario);
  useSyncScenarioToUrl(escenario);
  const [generandoInformeDestacado, setGenerandoInformeDestacado] = useState(false);

  const {
    ingresosAnuales,
    gastosDeduciblesAnuales,
    salarioBrutoAdministrador,
    comunidadAutonoma,
    gestoriaAnualAutonomo,
    gestoriaAnualSL,
  } = escenario;

  const aplicarPreset = (valores: Partial<Escenario>) => {
    setEscenario((prev) => ({ ...prev, ...valores }));
  };

  const resultado = useMemo(
    () =>
      compararAutonomoVsSL({
        ingresosAnuales,
        gastosDeduciblesAnuales,
        salarioBrutoAdministrador,
        comunidadAutonoma,
        gestoriaAnualAutonomo,
        gestoriaAnualSL,
      }),
    [
      ingresosAnuales,
      gastosDeduciblesAnuales,
      salarioBrutoAdministrador,
      comunidadAutonoma,
      gestoriaAnualAutonomo,
      gestoriaAnualSL,
    ],
  );

  useTrackCalculationCompleted("autonomo-vs-sl", resultado);

  const { autonomo, sociedadLimitada, diferenciaNeta, opcionMasVentajosa } = resultado;

  const ctaRecomendacion =
    opcionMasVentajosa === "sociedad_limitada"
      ? {
          partnerId: "ayuda-t-pymes" as const,
          analysis: `Con estos números, tu capital neto disponible estimado como Sociedad Limitada es ${formatEUR(Math.abs(diferenciaNeta))} superior al de autónomo, antes de costes mercantiles y contables.`,
          keyPoint:
            "Constituir una SL implica trámites notariales y registrales, y una contabilidad más exigente (Impuesto de Sociedades, libros mercantiles, cuentas anuales) que no se gestiona igual que en el régimen de autónomos.",
          nextStepIntro:
            "Para dar el paso sin errores, una gestoría especializada en constitución de sociedades como",
          promoBadgeText: "Cupón exclusivo: -20% en tu primer año",
        }
      : {
          partnerId: "quipu" as const,
          analysis:
            opcionMasVentajosa === "autonomo"
              ? `Con estos números, seguir como autónomo te deja ${formatEUR(Math.abs(diferenciaNeta))} más de capital neto disponible que crear una SL, sin asumir sus costes mercantiles y contables.`
              : "Con estos números, ambas opciones te dejan un capital neto disponible prácticamente igual, así que de momento no compensa asumir los costes mercantiles y contables de una SL.",
          keyPoint:
            "Como autónomo, cada gasto deducible que se te escape es dinero que pagas de más en IRPF: llevar la contabilidad al día marca la diferencia entre aprovechar todas las deducciones o no.",
          nextStepIntro: "Para no dejar deducciones sin aplicar, un software de contabilidad automática como",
          promoBadgeText: undefined as string | undefined,
        };

  const veredictoTitulo =
    opcionMasVentajosa === "equivalente"
      ? "En este escenario, ambas opciones dejan un capital neto disponible prácticamente igual"
      : `En este escenario, ${opcionMasVentajosa === "autonomo" ? "Autónomo" : "Sociedad Limitada"} deja ${formatEUR(Math.abs(diferenciaNeta))} más de capital neto disponible`;

  const contextoEscenario = `Facturación: ${formatEUR(ingresosAnuales)} · Gastos: ${formatEUR(gastosDeduciblesAnuales)} · Salario administrador: ${formatEUR(salarioBrutoAdministrador)} · Territorio común · Simulación orientativa.`;

  const conclusion =
    opcionMasVentajosa === "equivalente"
      ? "Bajo estos supuestos, el capital neto disponible estimado es prácticamente igual en ambas opciones."
      : `Bajo estos supuestos, el capital neto disponible estimado difiere en ${formatEUR(Math.abs(diferenciaNeta))} a favor de ${opcionMasVentajosa === "autonomo" ? "Autónomo" : "Sociedad Limitada"}, antes de costes mercantiles y contables (constitución, gestoría, Registro Mercantil...).`;

  const reportSections = [
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
        { label: "Impuesto sobre Sociedades", value: formatEUR(sociedadLimitada.cuotaImpuestoSociedades) },
        { label: "Cuota RETA societaria", value: formatEUR(sociedadLimitada.cuotaRetaSocietariaAnual) },
        {
          label: "Beneficio de la sociedad (tras Impuesto de Sociedades)",
          value: formatEUR(sociedadLimitada.beneficioDespuesDeImpuestos),
        },
        { label: "Remuneración neta (nómina del socio)", value: formatEUR(sociedadLimitada.salarioNetoAdministrador) },
        { label: "Dividendo neto en el bolsillo", value: formatEUR(sociedadLimitada.dividendosNetos) },
        { label: "Neto disponible al año", value: formatEUR(sociedadLimitada.netoDisponible) },
      ],
    },
  ];

  const handleDownloadPdf = () => {
    const partner = getAffiliate(ctaRecomendacion.partnerId);
    return downloadScenarioPdf({
      toolTitle: "Autónomo vs Sociedad Limitada",
      highlight: conclusion,
      fileName: "fiscalit-autonomo-vs-sl",
      sections: reportSections,
      promo: {
        partnerName: partner.name,
        badgeText: ctaRecomendacion.promoBadgeText ?? partner.tagline,
        ctaLabel: partner.ctaLabel,
        url: `${siteConfig.url}/go/${partner.id}`,
      },
    });
  };

  const handleDownloadCsv = () => {
    downloadScenarioCsv({
      toolTitle: "Autónomo vs Sociedad Limitada",
      fileName: "fiscalit-autonomo-vs-sl",
      sections: reportSections,
    });
  };

  const handleDownloadPdfDestacado = async () => {
    if (generandoInformeDestacado) return;
    setGenerandoInformeDestacado(true);
    try {
      await handleDownloadPdf();
      trackPdfDownload("autonomo-vs-sl");
    } finally {
      setGenerandoInformeDestacado(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <PrintHeader toolTitle="Autónomo vs Sociedad Limitada" />

      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Simulador Autónomo vs SL: comparativa de disponible neto, IS e IRPF
      </h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ScenarioPresets presets={PRESETS} onSelect={aplicarPreset} />
        <ScenarioActions
          toolSlug="autonomo-vs-sl"
          onReset={() => setEscenario(ESCENARIO_POR_DEFECTO)}
          onDownloadPdf={handleDownloadPdf}
          onDownloadCsv={handleDownloadCsv}
        />
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

      <details className="group mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
          Ajustes avanzados
          <ChevronDown
            className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="mt-5">
          <p className="text-sm font-medium text-slate-700">Comunidad autónoma</p>
          <p className="mt-1 text-xs text-slate-500">
            Aplica un ajuste aproximado sobre la escala general de IRPF según tu comunidad. Es orientativo, no
            sustituye la tabla oficial de tu comunidad.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {OPCIONES_COMUNIDAD.map((opcion) => (
              <button
                key={opcion.value}
                type="button"
                onClick={() => setEscenario((prev) => ({ ...prev, comunidadAutonoma: opcion.value }))}
                aria-pressed={comunidadAutonoma === opcion.value}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  comunidadAutonoma === opcion.value
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:text-slate-900",
                )}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <SliderInput
            label="Gasto de gestoría anual — Autónomo"
            value={gestoriaAnualAutonomo}
            onChange={(value) => setEscenario((prev) => ({ ...prev, gestoriaAnualAutonomo: value }))}
            min={0}
            max={5_000}
            step={50}
            formatValue={(value) => formatEUR(value)}
          />
          <SliderInput
            label="Gasto de gestoría anual — Sociedad Limitada"
            value={gestoriaAnualSL}
            onChange={(value) => setEscenario((prev) => ({ ...prev, gestoriaAnualSL: value }))}
            min={0}
            max={8_000}
            step={50}
            formatValue={(value) => formatEUR(value)}
          />
        </div>
      </details>

      <CompactSimulationNotice />

      <div
        className={cn(
          "mt-6 rounded-2xl border p-6 text-center print:break-inside-avoid",
          opcionMasVentajosa === "equivalente" ? "border-slate-200 bg-white" : "border-emerald-200 bg-emerald-50",
        )}
      >
        <h2
          className={cn(
            "text-2xl font-bold tracking-tight sm:text-3xl",
            opcionMasVentajosa === "equivalente" ? "text-slate-900" : "text-emerald-700",
          )}
        >
          {veredictoTitulo}
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">{contextoEscenario}</p>

        <CalculationTransparencyDetails
          metodologia="Compara el neto disponible como autónomo (rendimiento neto − cuota RETA − IRPF) frente a Sociedad Limitada (Impuesto sobre Sociedades + nómina del administrador + dividendos), con las tablas y tipos vigentes en 2026."
          fuenteNormativa="Real Decreto-ley 13/2022 y tablas de cotización del BOE núm. 180"
          fuenteUrl="https://www.boe.es/buscar/act.php?id=BOE-A-2022-12482"
        />

        <p className="mt-2 text-sm text-slate-600">{conclusion}</p>

        <button
          type="button"
          onClick={() => void handleDownloadPdfDestacado()}
          disabled={generandoInformeDestacado}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 print:hidden"
        >
          {generandoInformeDestacado ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="h-4 w-4" aria-hidden="true" />
          )}
          {generandoInformeDestacado ? "Generando informe…" : "Descargar informe de simulación (PDF)"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 print:break-inside-avoid">
        <ResultCard
          titulo="Autónomo"
          neto={autonomo.netoDisponible}
          esGanador={opcionMasVentajosa === "autonomo"}
          segments={[
            { label: "Neto disponible", value: autonomo.netoDisponible, className: "bg-emerald-500" },
            { label: "Cuota RETA", value: autonomo.cuotaRetaAnual, className: "bg-amber-500" },
            { label: "IRPF", value: autonomo.cuotaIRPF, className: "bg-rose-500" },
            ...(gestoriaAnualAutonomo > 0
              ? [{ label: "Gestoría", value: gestoriaAnualAutonomo, className: "bg-slate-400" }]
              : []),
          ]}
          detalle={[
            { label: "Rendimiento neto", value: autonomo.rendimientoNetoAnual },
            { label: "Cuota RETA anual", value: -autonomo.cuotaRetaAnual },
            { label: "IRPF", value: -autonomo.cuotaIRPF },
            ...(gestoriaAnualAutonomo > 0 ? [{ label: "Gestoría", value: -gestoriaAnualAutonomo }] : []),
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
            ...(gestoriaAnualSL > 0
              ? [{ label: "Gestoría", value: gestoriaAnualSL, className: "bg-slate-400" }]
              : []),
          ]}
          detalle={[
            {
              label: "Beneficio de la sociedad (tras Impuesto de Sociedades)",
              value: sociedadLimitada.beneficioDespuesDeImpuestos,
              esInformativa: true,
            },
            { label: "Remuneración neta (nómina del socio)", value: sociedadLimitada.salarioNetoAdministrador },
            { label: "Dividendo neto en el bolsillo", value: sociedadLimitada.dividendosNetos },
            ...(gestoriaAnualSL > 0 ? [{ label: "Gestoría", value: -gestoriaAnualSL }] : []),
          ]}
        />
      </div>

      <LegalSourceBadge
        fuente="Basado en el Real Decreto-ley 13/2022 y tablas del BOE núm. 180."
        url="https://www.boe.es/buscar/act.php?id=BOE-A-2022-12482"
        motor="Autónomo vs Sociedad Limitada"
      />

      <SimulationDisclaimer />
      <PrivacyLocalBadge />
      <TerritorialScopeNotice />

      {ingresosAnuales > UMBRAL_LEAD_ALTO_VALOR && <HighValueLeadCard facturacionAnual={ingresosAnuales} />}

      <div className="mt-10">
        <AffiliateCard
          partnerId={ctaRecomendacion.partnerId}
          toolSlug="autonomo-vs-sl"
          analysis={ctaRecomendacion.analysis}
          keyPoint={ctaRecomendacion.keyPoint}
          nextStepIntro={ctaRecomendacion.nextStepIntro}
          promoBadgeText={ctaRecomendacion.promoBadgeText}
        />
        <p className="mt-3 text-center text-sm text-slate-600 print:hidden">
          Para formalizar el cambio a SL o gestionar tu contabilidad sin errores, conecta con{" "}
          <a
            href={`/go/${getAffiliate("quipu").id}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick("Quipu", "autonomo-vs-sl")}
            className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            Quipu
          </a>
          .
        </p>
      </div>

      <RelatedToolsMesh slugs={["pluriactividad-devolucion", "calculadora-cuota-autonomos"]} />

      <FAQAccordion items={faqItems} title="Escenarios frecuentes y supuestos normativos" />

      <div className="mt-8 flex justify-center print:hidden">
        <EmbedWidgetModal slug="autonomo-vs-sl" toolTitle="Autónomo vs Sociedad Limitada" />
      </div>
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
        "rounded-2xl border bg-white p-6 shadow-sm print:break-inside-avoid",
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
            <span className={linea.esInformativa ? "text-slate-400 italic" : undefined}>{linea.label}</span>
            <span
              className={cn(
                linea.esInformativa
                  ? "text-slate-400 italic"
                  : linea.value < 0
                    ? "text-rose-600"
                    : "text-slate-900",
              )}
            >
              {!linea.esInformativa && linea.value < 0 ? "−" : ""}
              {formatEUR(Math.abs(linea.value))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
