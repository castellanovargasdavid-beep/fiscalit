import type { Metadata } from "next";
import { PluriactividadTool } from "@/components/tools/PluriactividadTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/pluriactividad-devolucion";

export const metadata: Metadata = buildPageMetadata({
  title: "Simulador de Reintegro por Exceso de Cotización en Pluriactividad (Art. 313 TRLGSS)",
  description:
    "Simula tu derecho al reintegro por exceso de cotización en pluriactividad (art. 313 TRLGSS) entre Régimen General y RETA, y estima el importe a recuperar.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Devolución por pluriactividad",
  description:
    "Comprueba si tienes derecho a que la Seguridad Social te devuelva el exceso cotizado entre Régimen General y RETA.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cuál es el tope de cotización conjunta para 2026?",
    answer:
      "Para 2026, el tope máximo anual de cotización conjunta por contingencias comunes (Régimen General + RETA) es de 17.323,68 €. Si entre ambos regímenes superas esa cifra en el año, tienes derecho a la devolución del exceso.",
  },
  {
    question: "¿Qué pasa si el 50% del exceso supera el 50% de mis cuotas RETA?",
    answer:
      "La devolución nunca puede superar el 50% de lo que has cotizado en RETA por contingencias comunes en el ejercicio: si el 50% de tu exceso cotizado es mayor que ese límite, la Seguridad Social te devuelve solo hasta ese 50% de tu cuota RETA, no el importe íntegro calculado sobre el exceso.",
  },
  {
    question: "¿Qué cotizaciones cuentan para calcular el exceso de pluriactividad?",
    answer:
      "Solo las cuotas por contingencias comunes ingresadas en el Régimen General (cuenta ajena) y en el RETA (cuenta propia) durante el mismo ejercicio. Otros conceptos de tu cuota, como el cese de actividad, la formación profesional o las contingencias profesionales, no entran en este cálculo.",
  },
  {
    question: "¿Cuándo paga la Seguridad Social la devolución por pluriactividad?",
    answer:
      "La TGSS realiza esta devolución de oficio, sin que tengas que solicitarla, durante el primer semestre del año siguiente al que corresponde el exceso de cotización.",
  },
  {
    question: "¿Tengo que declarar en el IRPF la devolución por exceso de cotización?",
    answer:
      "Sí. El importe devuelto por exceso de cotización en pluriactividad tiene la consideración de rendimiento del trabajo y debe incluirse en la declaración de la renta del ejercicio en que se percibe.",
  },
  {
    question: "¿Cómo sé si mi empresa cotiza por mí al máximo en Régimen General?",
    answer:
      "Puedes consultar tu base de cotización y las cuotas ingresadas por contingencias comunes en tus nóminas, o en el Informe de Vida Laboral y el Informe de Bases de Cotización disponibles en la Sede Electrónica de la Seguridad Social (Import@ss).",
  },
  {
    question: "¿Tengo que solicitar la devolución por pluriactividad?",
    answer:
      "No. A diferencia de otras devoluciones, la de pluriactividad se abona de oficio: no necesitas presentar ninguna solicitud, aunque puedes reclamarla si no la recibes en plazo.",
  },
  {
    question: "¿Qué pasa si trabajo en pluriactividad solo parte del año?",
    answer:
      "Igualmente tienes derecho si tus cotizaciones conjuntas (Régimen General + RETA) del ejercicio superan el tope legal anual, aunque solo hayas estado en pluriactividad una parte del año; la comprobación se hace sobre el total cotizado en el ejercicio completo.",
  },
];

export default function PluriactividadDevolucionPage() {
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
      <PluriactividadTool faqItems={FAQ_ITEMS} />
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
