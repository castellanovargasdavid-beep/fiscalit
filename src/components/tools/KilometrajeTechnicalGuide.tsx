import Link from "next/link";
import { BookOpen, FileCheck, Gavel, Receipt } from "lucide-react";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { getAffiliate } from "@/config/affiliates";

/**
 * Preguntas frecuentes propias de este bloque de guía técnica (distintas de
 * las que ya muestra KilometrajeDietasTool): pensadas como respuestas
 * directas y autocontenidas para fragmentos destacados de búsqueda.
 */
export const KILOMETRAJE_LANDING_FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Puedo deducirme la gasolina si uso mi coche particular para visitar clientes?",
    answer:
      "Como autónomo persona física, no de forma directa: la AEAT exige que el vehículo esté afecto de forma exclusiva (100%) a tu actividad económica para deducir sus gastos (art. 22 RIRPF), algo que en la práctica solo se admite sin más para taxistas, autoescuelas, agentes comerciales o transporte de viajeros. Lo que sí puedes aplicar, uses el vehículo que uses, es la asignación exenta de 0,26 €/km si actúas como administrador o recibes esa compensación de una empresa, más los peajes y aparcamientos justificados.",
  },
  {
    question: "¿Qué diferencia hay entre ticket y factura completa a efectos de IVA?",
    answer:
      "Un ticket simple no permite deducir el IVA soportado: solo una factura completa, con tus datos fiscales como destinatario, desglose de base imponible y cuota de IVA, habilita esa deducción. Pide siempre el canje de ticket por factura nominativa en gasolineras y parkings si quieres recuperar el IVA del gasto.",
  },
  {
    question: "¿Cómo tributan los 0,26 €/km en la nómina de un administrador o empleado?",
    answer:
      "Mientras la compensación no supere 0,26 €/km (más peajes y aparcamiento justificados) y el desplazamiento esté acreditado por motivos de trabajo, el importe está exento de IRPF y no tributa como mayor retribución en nómina. El exceso sobre esa cuantía sí se considera mayor renta del trabajo y tributa como tal.",
  },
];

/**
 * Bloque técnico "Tool-Led SEO" para la calculadora de kilometraje y dietas:
 * metodología, criterio AEAT en IRPF vs. IVA, justificación documental y
 * FAQ, renderizado 100% en servidor (sin "use client") para que sea
 * íntegramente rastreable. Se monta en page.tsx, después de la herramienta
 * interactiva.
 */
export function KilometrajeTechnicalGuide() {
  const quipu = getAffiliate("quipu");

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
      <section aria-labelledby="km-metodologia-heading">
        <h2
          id="km-metodologia-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Metodología y límite legal exento
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El simulador calcula el importe exento de IRPF de tus desplazamientos por motivos de trabajo con tu
          vehículo particular, sumando dos conceptos independientes:
        </p>
        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
              1
            </span>
            <span>
              Una compensación de <strong className="text-slate-900">0,26 €/km</strong> por el uso del vehículo,
              multiplicada por los kilómetros justificados del desplazamiento.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
              2
            </span>
            <span>
              Los <strong className="text-slate-900">peajes y aparcamientos</strong> del trayecto, siempre que estén
              justificados con su ticket o factura.
            </span>
          </li>
        </ol>
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600">
          Importe exento = (km justificados × 0,26 €/km) + peajes y aparcamientos justificados
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          La tarifa de 0,26 €/km, junto con las cuantías de dietas de manutención con y sin pernocta, está fijada por
          la <strong className="text-slate-900">Orden HFP/792/2023</strong>. No existe un tope máximo en euros: el
          importe exento crece con los kilómetros, siempre que el desplazamiento esté justificado por motivos de
          trabajo.
        </p>
      </section>

      <section aria-labelledby="km-normativa-heading">
        <h2 id="km-normativa-heading" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <Gavel className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Normativa y criterio AEAT: IRPF vs. IVA
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Es habitual confundir dos regímenes que la AEAT trata de forma completamente distinta para un mismo
          vehículo particular:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">En IRPF: afectación 100% exclusiva</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              Para deducir los gastos directos de un vehículo particular (amortización, seguro, reparaciones,
              combustible) como autónomo, el <strong className="text-slate-900">art. 22 RIRPF</strong> exige que esté
              afecto de forma exclusiva a la actividad económica. Un uso mixto, aunque sea minoritario, impide la
              deducción salvo en actividades muy concretas (taxi, autoescuela, comercial, transporte).
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">En IVA: presunción legal del 50%</p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              El <strong className="text-slate-900">art. 95 Ley IVA</strong> presume, salvo prueba en contrario, un
              grado de afectación del 50% para turismos usados en la actividad: puedes deducir la mitad del IVA
              soportado en el vehículo y sus gastos asociados sin necesidad de acreditar un uso exclusivo.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          <Link href="/metodologia" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Consulta la metodología y fuentes completas de las 6 herramientas de FiscalIT
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="km-justificacion-heading">
        <h2
          id="km-justificacion-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <FileCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Justificación documental ante requerimientos
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Ante una comprobación de la AEAT, no basta con aplicar la tarifa: hay que poder acreditar cada
          desplazamiento. La prueba admitida combina varios documentos:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
          <li>
            <strong className="text-slate-900">Registro de rutas</strong>: fecha, origen, destino, motivo del
            desplazamiento y kilómetros recorridos.
          </li>
          <li>
            <strong className="text-slate-900">Facturas nominativas completas</strong> de combustible, peajes y
            aparcamiento — un ticket simple no acredita el gasto ante Hacienda ni permite deducir el IVA.
          </li>
          <li>
            <strong className="text-slate-900">Agenda y albaranes de entrega</strong> u otro documento que relacione
            el desplazamiento con un cliente, proveedor o reunión concretos.
          </li>
        </ul>
      </section>

      <FAQAccordion items={KILOMETRAJE_LANDING_FAQ_ITEMS} title="Preguntas frecuentes" headingId="km-faq-heading" />

      <section
        aria-labelledby="km-siguiente-paso-heading"
        className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6"
      >
        <h2
          id="km-siguiente-paso-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <Receipt className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Próximo paso: no pierdas la deducción por un ticket
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          La causa número uno de pérdida de deducción no es calcular mal el kilometraje: es no conservar la factura
          canjeada de cada repostaje y peaje. Un ticket que se pierde o que nunca se canjeó por factura completa es
          una deducción que desaparece en el momento en que Hacienda la revisa. Digitalizar cada justificante en el
          momento en que se produce el gasto evita ese problema.
        </p>
        <a
          href={quipu.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Digitaliza tus tickets y facturas con {quipu.name}
        </a>
        <p className="mt-2 text-xs text-slate-500">Puede que recibamos una comisión sin coste adicional para ti.</p>
      </section>
    </div>
  );
}
