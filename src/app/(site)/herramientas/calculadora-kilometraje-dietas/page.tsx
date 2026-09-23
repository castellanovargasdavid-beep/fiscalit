import type { Metadata } from "next";
import { KilometrajeDietasTool } from "@/components/tools/KilometrajeDietasTool";
import {
  KilometrajeTechnicalGuide,
  KILOMETRAJE_LANDING_FAQ_ITEMS,
} from "@/components/tools/KilometrajeTechnicalGuide";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildBreadcrumbSchema, buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd, mergeFaqItems } from "@/lib/seo";

const PATH = "/herramientas/calculadora-kilometraje-dietas";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculadora de Gastos de Locomoción (0,26 €/km) y Dietas Exentas en IRPF",
  description:
    "Calcula el importe exento de IRPF de tus gastos de locomoción (0,26 €/km) y dietas de manutención, con y sin pernocta, para empleados y administradores.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Simulador de gastos de desplazamiento y dietas exentas",
  description:
    "Calcula el importe exento de IRPF por kilometraje y dietas de manutención para empleados y administradores en sus desplazamientos.",
  path: PATH,
});

const BREADCRUMB_JSON_LD = buildBreadcrumbSchema([
  { name: "Inicio", path: "/" },
  { name: "Herramientas", path: "/#herramientas" },
  { name: WEB_APPLICATION_JSON_LD.name, path: PATH },
]);

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cuáles son los importes exentos de dieta con y sin pernocta?",
    answer:
      "En desplazamientos dentro de España, la dieta de manutención exenta es de 53,34 €/día con pernocta y 26,67 €/día sin pernocta. En el extranjero sube a 91,35 €/día con pernocta y 48,08 €/día sin pernocta (Orden HFP/792/2023).",
  },
  {
    question: "¿El importe exento por kilometraje tiene algún límite en euros?",
    answer:
      "No hay un tope máximo en la asignación: se calcula multiplicando los kilómetros justificados por la tarifa vigente de 0,26 €/km, sin importar cuántos kilómetros acumules. Lo que sí exige la norma es que el desplazamiento esté justificado por motivos de trabajo, no que se trate del trayecto habitual entre tu domicilio y tu centro de trabajo.",
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(mergeFaqItems(FAQ_ITEMS, KILOMETRAJE_LANDING_FAQ_ITEMS))),
        }}
      />
      <KilometrajeDietasTool faqItems={FAQ_ITEMS} />
      <KilometrajeTechnicalGuide />
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
