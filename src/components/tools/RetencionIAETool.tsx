"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { calcularRetencionIAE, type SeccionIAE, type TipoIVA } from "@/lib/calculations/retencionIAE";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { SliderInput } from "@/components/ui/SliderInput";
import { LegalSourceBadge } from "@/components/tools/LegalSourceBadge";
import { SimulationDisclaimer } from "@/components/tools/SimulationDisclaimer";
import { PrivacyLocalBadge } from "@/components/tools/PrivacyLocalBadge";
import { TerritorialScopeNotice } from "@/components/tools/TerritorialScopeNotice";
import { EmbedWidgetModal } from "@/components/EmbedWidgetModal";
import { PrintHeader } from "@/components/tools/PrintHeader";
import { AffiliateCard } from "@/components/AffiliateCard";
import { RelatedToolsMesh } from "@/components/RelatedToolsMesh";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { formatEUR } from "@/lib/format";

interface RetencionIAEToolProps {
  faqItems: FAQItem[];
}

type RespuestaSiNo = "si" | "no";
type TipoIVAString = "21" | "10" | "4" | "0";

export function RetencionIAETool({ faqItems }: RetencionIAEToolProps) {
  const [seccionIAE, setSeccionIAE] = useState<SeccionIAE>("2");
  const [esNuevoAutonomo, setEsNuevoAutonomo] = useState<RespuestaSiNo>("no");
  const [baseImponible, setBaseImponible] = useState(1_000);
  const [tipoIVA, setTipoIVA] = useState<TipoIVAString>("21");

  const resultado = useMemo(
    () =>
      calcularRetencionIAE({
        seccionIAE,
        esNuevoAutonomo: esNuevoAutonomo === "si",
        baseImponible,
        tipoIVA: Number(tipoIVA) as TipoIVA,
      }),
    [seccionIAE, esNuevoAutonomo, baseImponible, tipoIVA],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PrintHeader toolTitle="Calculadora de retención IRPF en factura" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Simulador de factura con IRPF (7% o 15%), IVA y regla del 70% en el Modelo 130
        </h1>
        <EmbedWidgetModal slug="retencion-factura-iae" toolTitle="Calculadora de retención IRPF en factura" />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          <OptionGroup
            label="Sección IAE de tu actividad"
            columns={2}
            value={seccionIAE}
            onChange={setSeccionIAE}
            options={[
              {
                value: "1",
                label: "Empresarial",
                description: "Sección 1: comercio, industria, hostelería, servicios sin titulación",
              },
              {
                value: "2",
                label: "Profesional",
                description: "Sección 2: diseño, desarrollo, consultoría, abogacía...",
              },
            ]}
          />
          <OptionGroup
            label="¿Estás en el año de alta o en los 2 siguientes?"
            columns={2}
            value={esNuevoAutonomo}
            onChange={setEsNuevoAutonomo}
            options={[
              { value: "si", label: "Sí" },
              { value: "no", label: "No" },
            ]}
          />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <SliderInput
            label="Base imponible de la factura"
            value={baseImponible}
            onChange={setBaseImponible}
            min={0}
            max={20_000}
            step={50}
            formatValue={(value) => formatEUR(value)}
          />
          <OptionGroup
            label="Tipo de IVA"
            columns={4}
            value={tipoIVA}
            onChange={setTipoIVA}
            options={[
              { value: "21", label: "21%", description: "General" },
              { value: "10", label: "10%", description: "Reducido" },
              { value: "4", label: "4%", description: "Superreducido" },
              { value: "0", label: "0%", description: "Exento" },
            ]}
          />
        </div>
      </div>

      <SimulationDisclaimer />
      <PrivacyLocalBadge />
      <TerritorialScopeNotice />

      <div className="mt-8 grid gap-4 sm:grid-cols-[220px_1fr] print:break-inside-avoid">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-600 bg-blue-600 p-6 text-center text-white shadow-sm">
          <p className="text-xs text-blue-100">Retención IRPF a aplicar</p>
          <p className="mt-1 text-4xl font-semibold">{(resultado.tipoRetencionIRPF * 100).toFixed(0)}%</p>
        </div>
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">{resultado.motivoRetencion}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-100 p-6 shadow-sm print:break-inside-avoid">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Factura proforma</h2>
        <div className="mt-4 space-y-2 font-mono text-sm text-slate-800">
          <div className="flex justify-between">
            <span className="text-slate-500">Base imponible</span>
            <span>{formatEUR(resultado.baseImponible, true)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">+ Cuota de IVA ({resultado.tipoIVA}%)</span>
            <span>{formatEUR(resultado.importeIVA, true)}</span>
          </div>
          <div className="flex justify-between text-rose-600">
            <span>− Retención IRPF ({(resultado.tipoRetencionIRPF * 100).toFixed(0)}%)</span>
            <span>−{formatEUR(resultado.importeRetencionIRPF, true)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-dashed border-slate-300 pt-2 text-base font-semibold text-emerald-600">
            <span>= Total líquido a cobrar</span>
            <span>{formatEUR(resultado.totalLiquidoAPercibir, true)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm text-amber-800">
          <strong>Importante:</strong> la retención de IRPF solo se aplica cuando el cliente es otra empresa o
          autónomo en España. Si facturas a un particular (B2C) o a un cliente extranjero, nunca debes aplicar
          retención de IRPF.
        </p>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 print:break-inside-avoid">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>La retención no la declaras tú:</strong> es tu cliente (el pagador/retenedor) quien la ingresa
            en Hacienda cada trimestre mediante el Modelo 111 — no es una deducción que tú presentes. Para ti, es
            un anticipo de tu propio IRPF que restas del Modelo 130, el pago fraccionado trimestral que adelanta
            todo autónomo en estimación directa. Si al menos el 70% de tus ingresos del ejercicio anterior
            llevaron retención o ingreso a cuenta, quedas exento de ingresar cuota en el Modelo 130 (art. 110.3
            del Reglamento del IRPF).
          </p>
          <p>
            <strong>El IAE no suele suponer coste:</strong> las personas físicas y las empresas con un importe
            neto de cifra de negocios inferior a 1.000.000 € están exentas de pagar el Impuesto sobre Actividades
            Económicas (art. 82 Texto Refundido de la Ley de Haciendas Locales); solo debes darte de alta en el
            epígrafe correspondiente al presentar el modelo censal, sin cuota a ingresar por este impuesto.
          </p>
        </div>
      </div>

      <LegalSourceBadge
        fuente="Art. 95 del Reglamento del IRPF (RD 439/2007)."
        url="https://www.boe.es/buscar/act.php?id=BOE-A-2007-6820#a95"
      />

      <div className="mt-10">
        <AffiliateCard
          partnerId="taxdown"
          analysis={`Con una base imponible de ${formatEUR(resultado.baseImponible, true)} y una retención del ${(resultado.tipoRetencionIRPF * 100).toFixed(0)}%, tu líquido a cobrar es ${formatEUR(resultado.totalLiquidoAPercibir, true)}.`}
          keyPoint="Esa retención es un anticipo de tu IRPF anual, no un gasto perdido: si no declaras bien tus deducciones en la renta, puedes estar dejando dinero sobre la mesa que ya has adelantado a Hacienda."
          nextStepIntro="Para asegurarte de recuperar cada deducción a la que tienes derecho, un servicio como"
        />
      </div>

      <RelatedToolsMesh slugs={["diagnostico-verifactu", "calculadora-cuota-autonomos"]} />

      <FAQAccordion items={faqItems} title="Escenarios frecuentes y supuestos normativos" />
    </div>
  );
}
