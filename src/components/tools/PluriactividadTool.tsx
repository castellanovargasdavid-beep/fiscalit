"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import {
  PORCENTAJE_DEVOLUCION_EXCESO,
  calcularPluriactividad,
} from "@/lib/calculations/pluriactividad";
import { SliderInput } from "@/components/ui/SliderInput";
import { SplitBar } from "@/components/tools/SplitBar";
import { LegalSourceBadge } from "@/components/tools/LegalSourceBadge";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PluriactividadToolProps {
  faqItems: FAQItem[];
}

/**
 * Tipo de cotización total por contingencias comunes en Régimen General
 * (23,60% empresa + 4,70% trabajador, tipos generales vigentes), usado para
 * estimar la cotización anual a partir del salario bruto introducido.
 */
const TIPO_COTIZACION_CC_REGIMEN_GENERAL = 0.283;

export function PluriactividadTool({ faqItems }: PluriactividadToolProps) {
  const [salarioBrutoAnual, setSalarioBrutoAnual] = useState(24_000);
  const [cuotaMensualRETA, setCuotaMensualRETA] = useState(300);

  const cotizacionRegimenGeneralAnual = salarioBrutoAnual * TIPO_COTIZACION_CC_REGIMEN_GENERAL;
  const cotizacionRETAAnual = cuotaMensualRETA * 12;

  const resultado = useMemo(
    () => calcularPluriactividad({ cotizacionRegimenGeneralAnual, cotizacionRETAAnual }),
    [cotizacionRegimenGeneralAnual, cotizacionRETAAnual],
  );

  const limiteDevolucion = cotizacionRETAAnual * PORCENTAJE_DEVOLUCION_EXCESO;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Calculadora de devolución por pluriactividad
      </h1>

      <div className="mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        <SliderInput
          label="Salario bruto anual en nómina (Régimen General)"
          value={salarioBrutoAnual}
          onChange={setSalarioBrutoAnual}
          min={0}
          max={80_000}
          step={500}
          formatValue={(value) => formatEUR(value)}
        />
        <SliderInput
          label="Cuota mensual media pagada en el RETA"
          value={cuotaMensualRETA}
          onChange={setCuotaMensualRETA}
          min={0}
          max={1_500}
          step={10}
          formatValue={(value) => formatEUR(value)}
        />
      </div>

      <div
        className={cn(
          "mt-8 rounded-2xl border p-6 text-center shadow-sm",
          resultado.tieneDerechoDevolucion ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white",
        )}
      >
        <p className="text-sm text-slate-600">¿Tienes derecho a devolución de oficio de la Seguridad Social?</p>
        <p
          className={cn(
            "mt-2 text-3xl font-semibold",
            resultado.tieneDerechoDevolucion ? "text-emerald-700" : "text-slate-900",
          )}
        >
          {resultado.tieneDerechoDevolucion ? "Sí" : "No"}
        </p>
      </div>

      {resultado.tieneDerechoDevolucion && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-600 bg-emerald-600 p-4 text-white shadow-sm">
            <p className="text-xs text-emerald-100">Importe estimado a devolver</p>
            <p className="mt-1 text-lg font-semibold">{formatEUR(resultado.importeDevolucion)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Tope máximo de devolución legal</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{formatEUR(limiteDevolucion)}</p>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Base conjunta cotizada vs. tope legal
        </h2>
        <div className="mt-4">
          <SplitBar
            segments={[
              {
                label: "Dentro del tope legal",
                value: Math.min(resultado.totalCotizado, resultado.topeMaximoAnual),
                className: "bg-blue-500",
              },
              {
                label: "Exceso (con derecho a devolución)",
                value: resultado.excesoCotizado,
                className: "bg-emerald-500",
              },
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Total cotizado: <strong className="text-slate-900">{formatEUR(resultado.totalCotizado)}</strong> —
          Tope legal anual: <strong className="text-slate-900">{formatEUR(resultado.topeMaximoAnual)}</strong>
        </p>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p className="text-sm text-blue-800">
          La Tesorería General de la Seguridad Social (TGSS) realiza esta devolución <strong>de oficio</strong>,
          sin que tengas que solicitarla, durante el primer semestre del año siguiente al que corresponde el
          exceso de cotización.
        </p>
      </div>

      <LegalSourceBadge
        fuente="Art. 313 del Texto Refundido de la Ley General de la Seguridad Social."
        url="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a313"
      />

      <div className="mt-10">
        <AffiliateCard partnerId="ayuda-t-pymes" />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}
