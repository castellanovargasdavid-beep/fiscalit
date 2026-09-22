import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Handshake, Landmark, Lock, Target } from "lucide-react";
import { buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo";

const PATH = "/sobre-fiscalit";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre Fiscalit: misión, privacidad y metodología",
  description:
    "Conoce cómo funciona Fiscalit: cálculos 100% en tu navegador, metodología basada en el BOE y la Seguridad Social, y cómo nos financiamos sin pedirte datos.",
  path: PATH,
});

const PRINCIPIOS = [
  {
    icon: Target,
    title: "Nuestra misión",
    description:
      "Ofrecer herramientas de cálculo fiscal, laboral y contable directas y actualizadas a la normativa española vigente, sin fricciones ni registros obligatorios. Ningún formulario te pide el email a cambio del resultado: escribes tus cifras y obtienes la respuesta al instante.",
  },
  {
    icon: Lock,
    title: "Privacidad por diseño",
    description:
      "Cálculo 100% en local: los datos financieros que introduces (facturación, gastos, salario...) no se envían a ningún servidor ni se almacenan en bases de datos. Todo el cálculo ocurre dentro de tu propio navegador.",
  },
  {
    icon: Landmark,
    title: "Metodología y rigor legal",
    description:
      "La lógica de cada calculadora está basada en la normativa publicada en el BOE, la Ley General Tributaria, las tablas oficiales de cotización de la Seguridad Social (RETA) y los criterios vigentes de la Agencia Tributaria. Revisamos las cifras cada vez que cambia la normativa aplicable.",
  },
  {
    icon: Handshake,
    title: "Transparencia en la financiación",
    description:
      "Fiscalit es gratuita y lo seguirá siendo. Se mantiene mediante acuerdos de afiliación con software de facturación, gestorías online y otros servicios contables de primer nivel: si contratas alguno a través de nuestros enlaces, podemos recibir una comisión sin coste adicional para ti. Esos acuerdos nunca influyen en el resultado de las calculadoras.",
  },
];

export default function SobreFiscalitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Sobre Fiscalit</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Fiscalit nace para que cualquier autónomo o micropyme en España pueda resolver sus dudas fiscales y
          laborales más frecuentes en segundos, sin depender de una hoja de cálculo improvisada ni de esperar la
          respuesta de una gestoría.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PRINCIPIOS.map((principio) => (
            <div key={principio.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <principio.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-semibold text-slate-900">{principio.title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{principio.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Descargo de responsabilidad</p>
            <p className="mt-1 text-sm leading-6 text-amber-800/90">
              Fiscalit es una herramienta de estimación y apoyo técnico, no un servicio de asesoramiento fiscal,
              laboral ni jurídico. Los resultados se basan en los datos que introduces y en una interpretación
              general de la normativa vigente, pero no sustituyen el análisis personalizado de un gestor o
              asesor colegiado. Antes de tomar decisiones vinculantes (presentar impuestos, darte de alta,
              constituir una sociedad...), te recomendamos siempre contrastar el resultado con un profesional.
            </p>
          </div>
        </div>

        <nav aria-label="Documentos legales" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/metodologia" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Metodología y fuentes
          </Link>
          <Link href="/aviso-legal" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Aviso legal
          </Link>
          <Link href="/privacidad" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Privacidad
          </Link>
          <Link href="/cookies" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Cookies
          </Link>
        </nav>
      </div>
    </>
  );
}
