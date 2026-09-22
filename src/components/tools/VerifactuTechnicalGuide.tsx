import Link from "next/link";
import { CalendarClock, Fingerprint, Gavel, Receipt } from "lucide-react";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { getAffiliate } from "@/config/affiliates";

/**
 * Preguntas frecuentes propias de este bloque de guía técnica (distintas de
 * las que ya muestra VerifactuTool): pensadas como respuestas directas y
 * autocontenidas para fragmentos destacados de búsqueda.
 */
export const VERIFACTU_LANDING_FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Puedo seguir facturando con hojas de cálculo (Excel, Word) o plantillas PDF?",
    answer:
      "No, si esas hojas o plantillas actúan como tu sistema de facturación. El Reglamento VeriFactu se aplica a cualquier sistema informático que genere, conserve o remita registros de facturación, y Excel o Word no pueden generar la huella o «hash» encadenado ni el código QR tributario que exige la norma. Solo se libran del reglamento quienes facturan a mano, en papel, sin ningún sistema informático de por medio.",
  },
  {
    question: "¿Qué significa la modalidad 'VeriFactu' frente a un sistema no VeriFactu?",
    answer:
      "Ambas modalidades deben generar el registro de facturación con huella encadenada y el código QR, pero se diferencian en qué hacen con esos registros: un sistema VeriFactu los remite a la AEAT de forma automática e inmediata tras emitir cada factura, mientras que un sistema no VeriFactu se limita a conservarlos íntegros y disponibles para una eventual comprobación, sin enviarlos por su cuenta. Optar por VeriFactu simplifica la parte de conservación, a cambio de compartir cada factura con la AEAT en tiempo real.",
  },
  {
    question: "¿Afecta esta normativa a los autónomos que no tienen empleados?",
    answer:
      "Sí. La obligación no depende de tener empleados ni de la forma jurídica, sino de emitir facturas con un sistema informático: un autónomo sin trabajadores que factura con cualquier programa de facturación, incluida una app o una plantilla que rellena un ordenador, está igualmente obligado, con fecha límite del 1 de julio de 2027.",
  },
];

/**
 * Bloque técnico "Tool-Led SEO" para el diagnóstico VeriFactu: marco legal,
 * requisitos técnicos de los SIF, calendario y régimen sancionador, y FAQ,
 * renderizado 100% en servidor (sin "use client") para que sea íntegramente
 * rastreable. Se monta en page.tsx, después de la herramienta interactiva.
 */
export function VerifactuTechnicalGuide() {
  const holded = getAffiliate("holded");

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
      <section aria-labelledby="vf-marco-legal-heading">
        <h2
          id="vf-marco-legal-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <Gavel className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Marco legal y doble obligación
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          En la práctica conviven dos obligaciones distintas que conviene no confundir, porque tienen normas,
          plazos y alcance diferentes:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Reglamento VeriFactu</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              Aprobado por el <strong className="text-slate-900">Real Decreto 1007/2023</strong>, en desarrollo de la{" "}
              <strong className="text-slate-900">Ley 11/2021</strong> de medidas de prevención del fraude fiscal.
              Regula los requisitos técnicos que debe cumplir cualquier sistema informático de facturación (SIF):
              integridad, inalterabilidad y trazabilidad de los registros.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Factura electrónica B2B</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              Obligación distinta introducida por la <strong className="text-slate-900">Ley 18/2022</strong>{" "}
              &ldquo;Crea y Crece&rdquo;: exige emitir la factura en formato electrónico estructurado cuando se
              factura a otras empresas o profesionales, con un calendario de despliegue propio y aún pendiente de
              desarrollo reglamentario completo.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="vf-requisitos-tecnicos-heading">
        <h2
          id="vf-requisitos-tecnicos-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <Fingerprint className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Requisitos técnicos de los sistemas informáticos de facturación (SIF)
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El reglamento exige que cualquier SIF garantice tres propiedades sobre cada registro de facturación:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          <li>
            <strong className="text-slate-900">Integridad e inalterabilidad</strong>: cada factura genera una huella
            o «hash» criptográfico que se encadena con el de la factura anterior, de modo que modificar o eliminar un
            registro pasado rompería la cadena y quedaría detectado.
          </li>
          <li>
            <strong className="text-slate-900">Trazabilidad</strong>: el sistema debe conservar, además de las
            facturas, un registro de eventos (encendido, apagado, exportaciones, incidencias) que permita reconstruir
            su funcionamiento ante una comprobación.
          </li>
          <li>
            <strong className="text-slate-900">Código QR tributario</strong>: obligatorio en toda factura impresa o
            en PDF, junto con la leyenda «Factura verificable en la sede electrónica de la AEAT» (o «VeriFactu» si el
            sistema opera en esa modalidad).
          </li>
        </ul>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          A partir de ahí, cada SIF elige una de dos modalidades: remitir automáticamente cada registro a la AEAT en
          el momento de facturar (<strong className="text-slate-900">modalidad VeriFactu</strong>), o conservarlos
          íntegros y disponibles para cuando la AEAT los requiera, sin envío automático.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          <Link href="/metodologia" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Consulta la metodología y fuentes completas de las 6 herramientas de FiscalIT
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="vf-calendario-heading">
        <h2 id="vf-calendario-heading" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <CalendarClock className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Calendario de entrada en vigor y régimen sancionador
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Los productores y comercializadores de software de facturación ya están obligados a que sus sistemas
          cumplan el reglamento. Para los obligados tributarios que los usan, el calendario se divide en dos fechas:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">1 de enero de 2027</p>
            <p className="mt-1.5 text-sm leading-6 text-amber-800/90">
              Fecha límite para los contribuyentes del Impuesto sobre Sociedades (empresas).
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">1 de julio de 2027</p>
            <p className="mt-1.5 text-sm leading-6 text-amber-800/90">
              Fecha límite para autónomos y el resto de obligados tributarios.
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
          El <strong className="text-red-900">art. 201 bis de la Ley General Tributaria</strong> tipifica como
          infracción muy grave el uso, producción o tenencia de sistemas de facturación no adaptados o «de doble
          uso» (que permiten ocultar u omitir facturas), con multas de hasta{" "}
          <strong className="text-red-900">50.000 € por ejercicio</strong> para quien los use, y de hasta 150.000 €
          para quien los produzca o comercialice.
        </p>
      </section>

      <FAQAccordion items={VERIFACTU_LANDING_FAQ_ITEMS} title="Preguntas frecuentes" headingId="vf-faq-heading" />

      <section
        aria-labelledby="vf-siguiente-paso-heading"
        className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6"
      >
        <h2
          id="vf-siguiente-paso-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <Receipt className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Próximo paso: adapta tu facturación antes de la fecha límite
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Adaptar tu sistema de facturación con margen, en lugar de esperar a última hora, evita quedarte expuesto al
          régimen sancionador del art. 201 bis LGT por seguir usando (o simplemente conservar instalado) un programa
          no conforme. Plataformas de facturación en la nube como Holded ya cuentan con el motor adaptado, con
          encadenamiento criptográfico de cada factura y generación automática del código QR tributario.
        </p>
        <a
          href={holded.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Adapta tu facturación con {holded.name}
        </a>
        <p className="mt-2 text-xs text-slate-500">Puede que recibamos una comisión sin coste adicional para ti.</p>
      </section>
    </div>
  );
}
