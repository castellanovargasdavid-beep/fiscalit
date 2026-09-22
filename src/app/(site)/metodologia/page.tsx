import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, BookOpen, RefreshCw, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { formatFechaISO } from "@/lib/format";

const PATH = "/metodologia";

export const metadata: Metadata = buildPageMetadata({
  title: "Metodología y fuentes",
  description:
    "Cómo construimos y revisamos cada calculadora de Fiscalit: fuentes jurídicas (BOE, AEAT, TGSS), fecha de última revisión técnica y limitaciones conocidas.",
  path: PATH,
});

const FUENTES = [
  {
    organismo: "BOE (Boletín Oficial del Estado)",
    detalle:
      "Textos consolidados de las leyes y reglamentos que rigen cada cálculo: Ley 35/2006 del IRPF y su Reglamento (RD 439/2007), el Real Decreto-ley 13/2022 del nuevo sistema de cotización RETA, el Reglamento VeriFactu (RD 1007/2023, modificado por el RD 254/2025), la Orden HFP/792/2023 de dietas y kilometraje, la Ley 18/2022 «Crea y Crece», el Texto Refundido de la Ley General de la Seguridad Social (RD Legislativo 8/2015) y el Texto Refundido de la Ley de Haciendas Locales, entre otros.",
  },
  {
    organismo: "AEAT (Agencia Tributaria)",
    detalle:
      "Criterios técnicos publicados, notas informativas y modelos oficiales (130, 111, 303...) que aclaran cómo se aplica la normativa en la práctica: retenciones en factura, pagos fraccionados, requisitos técnicos de facturación y exenciones del IAE.",
  },
  {
    organismo: "TGSS (Tesorería General de la Seguridad Social)",
    detalle:
      "Tablas y tramos oficiales de cotización del RETA, tipos de cotización por contingencias comunes y resoluciones anuales que fijan el tope de cotización a efectos de la devolución por pluriactividad.",
  },
];

const LIMITACIONES = [
  "El ajuste por comunidad autónoma de la calculadora Autónomo vs SL es una aproximación orientativa (puntos porcentuales sobre la escala general), no la tabla oficial completa de cada comunidad.",
  "El simulador de pluriactividad asume que toda la cuota del RETA introducida corresponde a contingencias comunes, cuando en la práctica una cuota real incluye también cese de actividad, formación y otros conceptos.",
  "El simulador de kilometraje y dietas está pensado para asignaciones de empresa a trabajadores y administradores; para autónomos personas físicas, la deducción del kilometraje depende del criterio de afectación exclusiva del vehículo, no de un cálculo automático.",
  "Ninguna calculadora aplica mínimos personales o familiares, deducciones autonómicas específicas, ni particularidades de regímenes especiales (agrario, empleada de hogar, artistas...).",
];

export default function MetodologiaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Metodología y fuentes</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        Esta página explica de dónde sale la lógica de cada calculadora de Fiscalit, quién la mantiene y qué
        limitaciones conocidas tiene, para que puedas valorar con criterio hasta dónde llega cada resultado.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700">
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Última revisión técnica global: {formatFechaISO(siteConfig.lastMethodologyReview)}
      </div>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Fuentes jurídicas
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Cada calculadora se construye a partir de fuentes oficiales, no de interpretaciones de terceros.
          Trabajamos principalmente con estos tres organismos:
        </p>
        <div className="mt-4 space-y-4">
          {FUENTES.map((fuente) => (
            <div key={fuente.organismo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{fuente.organismo}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{fuente.detalle}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Cada herramienta enlaza, junto a su resultado, a la norma concreta del BOE en la que se basa: busca la
          franja «Normativa revisada» al pie de cada calculadora.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <RefreshCw className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Proceso de actualización
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Revisamos la lógica de cada calculadora cada vez que detectamos un cambio relevante en la normativa
          aplicable (una nueva ley, un aplazamiento de plazos, una actualización de tablas de cotización...), y
          además realizamos una revisión técnica periódica de todo el sitio. La fecha de la última revisión
          global figura arriba; cuando una calculadora concreta se revisa por un cambio normativo puntual, lo
          indicamos en su propia franja de rigor legal.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <ShieldCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Autoría y supervisión técnica
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          El equipo de Fiscalit diseña, programa y revisa la lógica de cálculo de cada herramienta directamente
          contra las fuentes oficiales citadas arriba. Fiscalit no es una asesoría fiscal ni cuenta con asesores
          o gestores colegiados en plantilla: es un proyecto de divulgación técnica que traduce normativa pública
          en calculadoras interactivas, no un servicio profesional de asesoramiento individualizado.
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Por eso cada resultado va acompañado del aviso «herramienta de simulación orientativa y divulgativa»:
          es una guía para entender el orden de magnitud y la mecánica de cada cálculo, no una liquidación
          vinculante. Antes de tomar decisiones con impacto económico o legal, contrasta siempre el resultado con
          un gestor o asesor colegiado.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
          Limitaciones conocidas
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Preferimos ser explícitos sobre dónde simplificamos, en lugar de dejar que lo descubras por sorpresa:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          {LIMITACIONES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm leading-6 text-amber-800">
          Fiscalit es una herramienta de estimación y apoyo técnico, no un servicio de asesoramiento fiscal,
          laboral ni jurídico. Consulta el{" "}
          <Link href="/sobre-fiscalit" className="font-medium underline underline-offset-2">
            descargo de responsabilidad completo
          </Link>{" "}
          en Sobre Fiscalit.
        </p>
      </div>
    </div>
  );
}
