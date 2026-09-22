import type { Metadata } from "next";
import { CuotaAutonomosTool } from "@/components/tools/CuotaAutonomosTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/calculadora-cuota-autonomos";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculadora Cuota Autónomos 2026: Tramos y Rendimiento Neto",
  description:
    "Calcula tu cuota de autónomos exacta por tramos de rendimiento neto real. Descubre tu tramo RETA (1 a 15) y la cuota mensual mínima y máxima al instante.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Calculadora de cuota de autónomos",
  description: "Descubre tu tramo de cotización RETA y la cuota mensual según tu rendimiento neto real.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
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
