import type { Metadata } from "next";
import { KilometrajeDietasTool } from "@/components/tools/KilometrajeDietasTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/calculadora-kilometraje-dietas";

export const metadata: Metadata = buildPageMetadata({
  title: "Simulador de Kilometraje y Dietas Exentas (Empleados y Administradores)",
  description:
    "Calcula las asignaciones exentas de IRPF por kilometraje (0,26 €/km) y dietas de manutención que una empresa paga a trabajadores y administradores, con y sin pernocta.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Simulador de gastos de desplazamiento y dietas exentas",
  description:
    "Calcula el importe exento de IRPF por kilometraje y dietas de manutención para empleados y administradores en sus desplazamientos.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Soy autónomo persona física: ¿puedo deducir 0,26 €/km por usar mi coche?",
    answer:
      "No de forma automática. Los 0,26 €/km están pensados para las asignaciones que una empresa paga a sus trabajadores o administradores, exentas de tributar como salario. Si eres autónomo persona física, la AEAT exige que el vehículo esté afecto de forma exclusiva a tu actividad económica (art. 22.4 Reglamento IRPF) para poder deducir sus gastos, algo que en la práctica solo se admite sin más para actividades como taxistas, autoescuelas, agentes comerciales o transporte de viajeros. Si usas el mismo vehículo para fines particulares, consulta con tu gestor antes de aplicar esta deducción.",
  },
  {
    question: "¿Necesito guardar facturas para justificar el kilometraje?",
    answer:
      "Por conducir tu propio vehículo no existe una factura como tal, pero debes poder acreditar el desplazamiento (agenda, hoja de ruta, relación con un cliente o proveedor) y conservar los tickets de peaje y aparcamiento asociados.",
  },
  {
    question: "¿Puedo aplicar la exención de dietas de manutención si soy autónomo?",
    answer:
      "Sí, a diferencia del kilometraje: los autónomos pueden deducir sus propios gastos de manutención en desplazamientos con los mismos importes que los trabajadores por cuenta ajena (art. 30.2.5ª Ley IRPF), siempre que paguen por medios electrónicos y el gasto esté vinculado a la actividad. La restricción de afectación exclusiva del vehículo solo afecta al kilometraje, no a las dietas de manutención.",
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
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
