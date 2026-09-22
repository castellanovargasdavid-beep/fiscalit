import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, BookOpen, CheckCircle2, ClipboardCheck, RefreshCw, ShieldCheck } from "lucide-react";
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

interface FichaVersionMotor {
  motor: string;
  version: string;
  disposiciones: string;
}

const FICHAS_VERSION: FichaVersionMotor[] = [
  {
    motor: "Autónomo vs Sociedad Limitada",
    version: "SL-2026.1",
    disposiciones:
      "Real Decreto-ley 13/2022 (cotización RETA); Ley 27/2014 y Ley 7/2024 (tipo reducido de microempresas en el Impuesto sobre Sociedades); Ley 35/2006 del IRPF.",
  },
  {
    motor: "Calculadora de cuota de autónomos",
    version: "RETA-2026.1",
    disposiciones:
      "Real Decreto-ley 13/2022, nuevo sistema de cotización por rendimientos netos reales; Orden PJC/297/2026, de cotización a la Seguridad Social para el ejercicio 2026.",
  },
  {
    motor: "Diagnóstico VeriFactu",
    version: "VF-2027.1",
    disposiciones:
      "Real Decreto 1007/2023, Reglamento de facturación; Real Decreto 254/2025 y Real Decreto-ley 15/2025 (aplazamiento de la entrada en vigor a 2027); Orden HAC/1177/2024, especificaciones técnicas.",
  },
  {
    motor: "Kilometraje y dietas exentas",
    version: "KM-2026.1",
    disposiciones:
      "Orden HFP/792/2023, revisión de dietas y gastos de locomoción; arts. 9 y 30.2.5ª de la Ley 35/2006 del IRPF; art. 22.4 del Reglamento del IRPF (Real Decreto 439/2007).",
  },
  {
    motor: "Retención IRPF en factura / IAE",
    version: "IAE-2026.1",
    disposiciones:
      "Art. 101 de la Ley 35/2006 del IRPF; arts. 95 y 110.3 del Reglamento del IRPF (Real Decreto 439/2007); art. 82 del Texto Refundido de la Ley de Haciendas Locales.",
  },
  {
    motor: "Devolución por pluriactividad",
    version: "PLURI-2026.1",
    disposiciones:
      "Art. 313 del Texto Refundido de la Ley General de la Seguridad Social (Real Decreto Legislativo 8/2015); Orden PJC/297/2026, tope de cotización 2026.",
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
          <ClipboardCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Ficha técnica de versionado
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Cada uno de los 6 motores de cálculo tiene su propio código de versión y su propio control de
          disposiciones normativas aplicadas. Los seis se verificaron en la última revisión técnica global (
          {formatFechaISO(siteConfig.lastMethodologyReview)}).
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className="px-4 py-3 font-medium">Motor</th>
                <th className="px-4 py-3 font-medium">Versión</th>
                <th className="px-4 py-3 font-medium">Última revisión</th>
                <th className="px-4 py-3 font-medium">Disposiciones aplicadas</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {FICHAS_VERSION.map((ficha) => (
                <tr key={ficha.version} className="border-b border-slate-100 align-top last:border-b-0">
                  <td className="px-4 py-3 font-medium text-slate-900">{ficha.motor}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{ficha.version}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                    {formatFechaISO(siteConfig.lastMethodologyReview)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{ficha.disposiciones}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Verificado y vigente
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          Auditoría de privacidad en cliente
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          En la revisión técnica del {formatFechaISO(siteConfig.lastMethodologyReview)} auditamos cada llamada de
          red del código fuente para verificar la promesa de «cálculo 100% en local». El resultado: Fiscalit no
          usa ninguna herramienta de analítica ni tracker, y el código solo contiene tres puntos que envían datos
          fuera del navegador, todos ellos opt-in y visibles para el usuario:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          <li>
            El alta a las alertas del BOE, que envía únicamente el email que escribes en el formulario.
          </li>
          <li>
            El formulario de auditoría gratuita (visible solo en escenarios de facturación elevada), que envía los
            datos de contacto que rellenas junto con la facturación que ya ves escrita en el propio formulario:
            es el dato que necesita el asesor para contactarte, no una fuga silenciosa.
          </li>
          <li>
            Un módulo de analítica de eventos (<code className="rounded bg-slate-100 px-1 py-0.5 text-xs">src/lib/analytics.ts</code>
            ) que hoy no envía nada porque no hay ningún proveedor configurado, y cuya firma de tipos impide
            estructuralmente adjuntar cifras: solo admite un nombre de evento de una lista cerrada (p. ej.{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">tool_completed</code>) y, como mucho, el
            slug de la herramienta.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Ningún ingreso, gasto, cuota, salario ni resultado calculado sale nunca del navegador salvo que tú
          decidas descargarlo o compartirlo tú mismo. Más detalle en{" "}
          <Link href="/privacidad" className="text-blue-700 underline underline-offset-2">
            Privacidad
          </Link>
          .
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
