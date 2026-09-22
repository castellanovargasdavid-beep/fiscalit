import type { Metadata } from "next";
import { CuotaAutonomosTool } from "@/components/tools/CuotaAutonomosTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/calculadora-cuota-autonomos";

export const metadata: Metadata = buildPageMetadata({
  title: "Simulador Cuota Autónomos 2026: Tramos RETA según Rendimientos Netos",
  description:
    "Simula tu cuota de autónomos en el tramo RETA exacto según tus rendimientos netos reales. Consulta la base mínima y máxima de cada uno de los 15 tramos de cotización 2026.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Calculadora de cuota de autónomos",
  description: "Descubre tu tramo de cotización RETA y la cuota mensual según tu rendimiento neto real.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cómo tributo si mis rendimientos netos son inferiores al Salario Mínimo?",
    answer:
      "No existe un tramo por debajo del tramo 1: cualquier rendimiento neto mensual de 0 € hasta 670 € (incluido un rendimiento muy bajo o incluso nulo) se ubica en el tramo 1, con una base de cotización mínima de 751,63 €/mes en 2026. La cuota no baja de ese suelo aunque factures menos que el Salario Mínimo Interprofesional.",
  },
  {
    question: "¿Cómo afecta la deducción por gastos genéricos del 7% (3% societarios)?",
    answer:
      "Antes de ubicar tu rendimiento neto en la tabla de tramos, se aplica una deducción adicional por gastos de difícil justificación: un 7% si eres autónomo individual o un 3% si eres autónomo societario. Esa deducción reduce el rendimiento neto computable y, por tanto, puede bajarte de tramo respecto a tu rendimiento neto real sin deducir.",
  },
  {
    question: "Soy autónomo societario: ¿puedo cotizar por el tramo 1?",
    answer:
      "No. Aunque tu rendimiento neto mensual, tras la deducción del 3%, caiga dentro del rango del tramo 1 (hasta 670 €), la normativa reserva ese tramo a autónomos por cuenta propia: el sistema te reubica automáticamente en el tramo 2, con una base de cotización algo superior.",
  },
  {
    question: "¿Hay un límite de cuota aunque mis ingresos sean muy altos?",
    answer:
      "Sí, de facto: el tramo 15 (rendimiento neto mensual desde 6.000 € en adelante, sin límite superior) tiene una base de cotización fija. Por mucho que tu rendimiento siga subiendo, la cuota no crece más allá de la que corresponde a la base máxima de ese tramo.",
  },
  {
    question: "¿Cómo se calcula la cuota de autónomos actualmente?",
    answer:
      "Desde 2023, la cuota se calcula según tu rendimiento neto real (ingresos menos gastos deducibles, y una deducción adicional por gastos de difícil justificación), que se ubica en uno de los 15 tramos oficiales de cotización para determinar la base mínima y máxima aplicable.",
  },
  {
    question: "¿Qué son los gastos de difícil justificación?",
    answer:
      "Es una deducción adicional que se resta del rendimiento neto antes de calcular la cuota: un 7% para autónomos individuales y un 3% para autónomos societarios, pensada para compensar pequeños gastos sin factura.",
  },
  {
    question: "¿Qué diferencia hay entre autónomo individual y societario a efectos de cotización?",
    answer:
      "El autónomo societario (quien administra o es socio mayoritario de una sociedad) aplica una deducción del 3% en lugar del 7% y nunca puede cotizar por el tramo 1, que queda reservado a autónomos por cuenta propia.",
  },
  {
    question: "¿Puedo cambiar de tramo de cotización durante el año?",
    answer:
      "Sí. La Seguridad Social permite cambiar la base de cotización hasta seis veces al año, y además regulariza la cuota definitiva al año siguiente según tu rendimiento neto real declarado en la renta.",
  },
  {
    question: "¿Qué pasa si mi rendimiento neto real cambia respecto a lo declarado?",
    answer:
      "La Seguridad Social hace una regularización anual: si cotizaste de menos, tendrás que pagar la diferencia; si cotizaste de más, te devolverán el exceso, dentro de los límites de tu tramo real.",
  },
];

export default function CalculadoraCuotaAutonomosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APPLICATION_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ_ITEMS)) }}
      />
      <CuotaAutonomosTool faqItems={FAQ_ITEMS} />
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
