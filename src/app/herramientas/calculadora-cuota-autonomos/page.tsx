import type { Metadata } from "next";
import { CuotaAutonomosTool } from "@/components/tools/CuotaAutonomosTool";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calculadora de cuota de autónomos por tramos",
  description:
    "Descubre en qué tramo de cotización RETA estás y cuánto pagarás de cuota mensual según tu rendimiento neto real, como autónomo individual o societario.",
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ_ITEMS)) }}
      />
      <CuotaAutonomosTool faqItems={FAQ_ITEMS} />
    </>
  );
}
