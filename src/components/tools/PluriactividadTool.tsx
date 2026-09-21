"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import {
  PORCENTAJE_DEVOLUCION_EXCESO,
  calcularPluriactividad,
} from "@/lib/calculations/pluriactividad";
import { SliderInput } from "@/components/ui/SliderInput";
import { SplitBar } from "@/components/tools/SplitBar";
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
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        Calculadora de devolución por pluriactividad
      </h1>

      <div className="mt-6 grid gap-6 rounded-2xl border border-zinc-200 p-6 sm:grid-cols-2 dark:border-zinc-800">
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
          "mt-8 rounded-2xl border p-6 text-center",
          resultado.tieneDerechoDevolucion
            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
            : "border-zinc-200 dark:border-zinc-800",
        )}
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ¿Tienes derecho a devolución de oficio de la Seguridad Social?
        </p>
        <p
          className={cn(
            "mt-2 text-3xl font-semibold",
            resultado.tieneDerechoDevolucion
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-zinc-900 dark:text-zinc-50",
          )}
        >
          {resultado.tieneDerechoDevolucion ? "Sí" : "No"}
        </p>
      </div>

      {resultado.tieneDerechoDevolucion && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-900 bg-zinc-900 p-4 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <p className="text-xs text-zinc-300 dark:text-zinc-600">Importe estimado a devolver</p>
            <p className="mt-1 text-lg font-semibold">{formatEUR(resultado.importeDevolucion)}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Tope máximo de devolución legal</p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {formatEUR(limiteDevolucion)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Base conjunta cotizada vs. tope legal
        </h2>
        <div className="mt-4">
          <SplitBar
            segments={[
              {
                label: "Dentro del tope legal",
                value: Math.min(resultado.totalCotizado, resultado.topeMaximoAnual),
                className: "bg-zinc-900 dark:bg-zinc-50",
              },
              {
                label: "Exceso (con derecho a devolución)",
                value: resultado.excesoCotizado,
                className: "bg-emerald-500",
              },
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Total cotizado: <strong className="text-zinc-900 dark:text-zinc-50">{formatEUR(resultado.totalCotizado)}</strong>{" "}
          — Tope legal anual:{" "}
          <strong className="text-zinc-900 dark:text-zinc-50">{formatEUR(resultado.topeMaximoAnual)}</strong>
        </p>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950/30">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        <p className="text-sm text-sky-800 dark:text-sky-300">
          La Tesorería General de la Seguridad Social (TGSS) realiza esta devolución <strong>de oficio</strong>,
          sin que tengas que solicitarla, durante el primer semestre del año siguiente al que corresponde el
          exceso de cotización.
        </p>
      </div>

      <div className="mt-10">
        <AffiliateCard partnerId="ayuda-t-pymes" />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}
