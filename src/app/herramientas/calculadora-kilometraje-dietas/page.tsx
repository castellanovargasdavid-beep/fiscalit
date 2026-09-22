import type { Metadata } from "next";
import { KilometrajeDietasTool } from "@/components/tools/KilometrajeDietasTool";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/calculadora-kilometraje-dietas";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculadora de Kilometraje y Dietas Exentas de IRPF",
  description:
    "Calcula al instante el importe exento de IRPF por kilometraje (0,26 €/km) y dietas de manutención, con y sin pernocta, en España y en el extranjero.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Kilometraje y dietas exentas",
  description: "Calcula el importe exento de IRPF por kilometraje y dietas de manutención en tus desplazamientos.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Necesito guardar facturas para justificar el kilometraje?",
    answer:
      "Por conducir tu propio vehículo no existe una factura como tal, pero debes poder acreditar el desplazamiento (agenda, hoja de ruta, relación con un cliente o proveedor) y conservar los tickets de peaje y aparcamiento asociados.",
  },
  {
    question: "¿Puedo aplicar la exención de dietas si soy autónomo?",
    answer:
      "Los autónomos no aplican la exención de dietas de los trabajadores por cuenta ajena, pero pueden deducir sus propios gastos de manutención en desplazamientos con los mismos importes (art. 30.2.5ª Ley IRPF), siempre que paguen por medios electrónicos y el gasto esté vinculado a la actividad.",
  },
  {
    question: "¿Qué pasa si supero los importes exentos o deducibles?",
    answer:
      "El exceso sobre los importes de 0,26 €/km o sobre las cuantías de dietas deja de estar exento: para un trabajador tributaría como mayor renta del trabajo, y para un autónomo dejaría de ser gasto deducible en esa parte.",
  },
  {
    question: "¿Cómo se demuestra el kilometraje ante Hacienda?",
    answer:
      "Con un registro propio (hoja de ruta) que recoja fecha, origen y destino, motivo del desplazamiento y kilómetros recorridos, junto con los tickets de peaje y aparcamiento y cualquier documento que acredite la visita (factura al cliente, justificante de reunión).",
  },
  {
    question: "¿Los 0,26 €/km incluyen el peaje y el aparcamiento?",
    answer:
      "No. El importe por kilómetro cubre el uso del vehículo; los gastos de peaje y aparcamiento son conceptos aparte que se suman si están debidamente justificados con su ticket o factura.",
  },
];

export default function CalculadoraKilometrajeDietasPage() {
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
      <KilometrajeDietasTool faqItems={FAQ_ITEMS} />
    </>
  );
}
