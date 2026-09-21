"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  calcularKilometrajeDietas,
  type DesplazamientoDieta,
} from "@/lib/calculations/kilometrajeDietas";
import { SliderInput } from "@/components/ui/SliderInput";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { formatEUR } from "@/lib/format";

interface KilometrajeDietasToolProps {
  faqItems: FAQItem[];
}

const DOCUMENTACION_OBLIGATORIA = [
  "Tickets o facturas de peaje y aparcamiento asociados al desplazamiento.",
  "Justificante de la relación del viaje con tu actividad económica (cliente visitado, reunión, evento, obra).",
  "Fecha, lugar de origen/destino y medio de transporte utilizado.",
  "Un registro o agenda del kilometraje recorrido (hoja de ruta) que respalde los kilómetros declarados.",
  "Factura del alojamiento si hay pernocta, a nombre del autónomo o la empresa.",
];

export function KilometrajeDietasTool({ faqItems }: KilometrajeDietasToolProps) {
  const [kilometros, setKilometros] = useState(500);
  const [diasPernoctaEspana, setDiasPernoctaEspana] = useState(2);
  const [diasPernoctaExtranjero, setDiasPernoctaExtranjero] = useState(0);
  const [diasSinPernoctaEspana, setDiasSinPernoctaEspana] = useState(3);
  const [diasSinPernoctaExtranjero, setDiasSinPernoctaExtranjero] = useState(0);

  const resultado = useMemo(() => {
    const dietas: DesplazamientoDieta[] = [];
    if (diasPernoctaEspana > 0) {
      dietas.push({
        concepto: "Dietas con pernocta en España",
        dias: diasPernoctaEspana,
        zona: "espana",
        pernocta: true,
      });
    }
    if (diasPernoctaExtranjero > 0) {
      dietas.push({
        concepto: "Dietas con pernocta en el extranjero",
        dias: diasPernoctaExtranjero,
        zona: "extranjero",
        pernocta: true,
      });
    }
    if (diasSinPernoctaEspana > 0) {
      dietas.push({
        concepto: "Dietas sin pernocta en España",
        dias: diasSinPernoctaEspana,
        zona: "espana",
        pernocta: false,
      });
    }
    if (diasSinPernoctaExtranjero > 0) {
      dietas.push({
        concepto: "Dietas sin pernocta en el extranjero",
        dias: diasSinPernoctaExtranjero,
        zona: "extranjero",
        pernocta: false,
      });
    }

    return calcularKilometrajeDietas({
      kilometrajes:
        kilometros > 0
          ? [{ concepto: "Desplazamientos en vehículo propio", kilometros }]
          : [],
      dietas,
    });
  }, [kilometros, diasPernoctaEspana, diasPernoctaExtranjero, diasSinPernoctaEspana, diasSinPernoctaExtranjero]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        Calculadora de kilometraje y dietas exentas
      </h1>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <SliderInput
          label="Kilómetros recorridos en vehículo propio (0,26 €/km)"
          value={kilometros}
          onChange={setKilometros}
          min={0}
          max={5_000}
          step={10}
          formatValue={(value) => `${value.toLocaleString("es-ES")} km`}
        />

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <SliderInput
            label="Días con pernocta en España (53,34 €/día)"
            value={diasPernoctaEspana}
            onChange={setDiasPernoctaEspana}
            min={0}
            max={60}
            step={1}
          />
          <SliderInput
            label="Días con pernocta en el extranjero (91,35 €/día)"
            value={diasPernoctaExtranjero}
            onChange={setDiasPernoctaExtranjero}
            min={0}
            max={60}
            step={1}
          />
          <SliderInput
            label="Días sin pernocta en España (26,67 €/día)"
            value={diasSinPernoctaEspana}
            onChange={setDiasSinPernoctaEspana}
            min={0}
            max={60}
            step={1}
          />
          <SliderInput
            label="Días sin pernocta en el extranjero (48,08 €/día)"
            value={diasSinPernoctaExtranjero}
            onChange={setDiasSinPernoctaExtranjero}
            min={0}
            max={60}
            step={1}
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-900 bg-zinc-900 p-6 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
        <p className="text-sm text-zinc-300 dark:text-zinc-600">Total exento de IRPF</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight">{formatEUR(resultado.totalExentoIRPF)}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Desglose
        </h2>
        {resultado.resumen.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
            Introduce kilómetros o días de dieta para ver el desglose.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-900">
            {resultado.resumen.map((linea) => (
              <li key={linea.concepto} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">{linea.concepto}</span>
                <span className="font-medium whitespace-nowrap text-zinc-900 dark:text-zinc-50">
                  {formatEUR(linea.importeExento)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex items-center justify-between gap-4 border-t border-zinc-200 pt-3 text-sm font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          <span>Kilometraje</span>
          <span>{formatEUR(resultado.totalExentoKilometraje)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          <span>Dietas</span>
          <span>{formatEUR(resultado.totalExentoDietas)}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Documentación obligatoria para la AEAT
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-amber-800/90 dark:text-amber-300/90">
            {DOCUMENTACION_OBLIGATORIA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <AffiliateCard partnerId="qonto" />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}
