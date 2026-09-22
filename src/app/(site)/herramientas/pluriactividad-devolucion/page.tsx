import type { Metadata } from "next";
import { PluriactividadTool } from "@/components/tools/PluriactividadTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/pluriactividad-devolucion";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculadora Devolución Pluriactividad Seguridad Social",
  description:
    "Comprueba gratis si tienes derecho a que la Seguridad Social te devuelva de oficio el exceso cotizado entre Régimen General y RETA, y estima el importe.",
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
