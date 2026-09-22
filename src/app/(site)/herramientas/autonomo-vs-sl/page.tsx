import type { Metadata } from "next";
import { AutonomoVsSLTool } from "@/components/tools/AutonomoVsSLTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/autonomo-vs-sl";

export const metadata: Metadata = buildPageMetadata({
  title: "Simulador Autónomo vs SL: Comparativa de Disponible Neto, IS e IRPF",
  description:
    "Simula tu disponible neto como autónomo o como Sociedad Limitada, con el desglose de IRPF, cuota RETA e Impuesto sobre Sociedades de cada escenario, para decidir con cifras reales.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Autónomo vs Sociedad Limitada",
  description:
    "Compara cuánto te quedaría neto como autónomo o creando una SL, con IRPF, cuota RETA e Impuesto de Sociedades.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cómo tributa el Impuesto de Sociedades si mi base imponible supera los 50.000 €?",
    answer:
      "Si tu SL es una microempresa (cifra de negocio inferior a 1.000.000 €), el Impuesto sobre Sociedades de 2026 aplica una escala progresiva sobre la base imponible: el 19% a los primeros 50.000 € y el 21% al resto. No es un salto de tipo íntegro: solo el exceso sobre 50.000 € tributa al 21%, el resto sigue al 19% (Ley 7/2024).",
  },
  {
    question: "¿Qué pasa si destino todo el beneficio a la nómina del administrador?",
    answer:
      "Si el salario bruto del administrador absorbe todo el rendimiento (descontada la cuota RETA societaria), la base imponible del Impuesto de Sociedades queda en 0 € y no hay cuota que pagar ni dividendos que repartir: todo el disponible sale vía nómina, sujeta a su propio IRPF.",
  },
  {
    question: "¿Cuándo se aplica el tipo general del 25% en vez del reducido de microempresas?",
    answer:
      "El tipo reducido (19%/21%) solo está pensado para sociedades con una cifra de negocio anual inferior a 1.000.000 €. Si tus ingresos superan ese umbral, toda la base imponible del Impuesto sobre Sociedades tributa al tipo general del 25%, sin el tramo reducido.",
  },
  {
    question: "¿Cuándo interesa pasar de autónomo a Sociedad Limitada?",
    answer:
      "Depende de tu rendimiento neto y de cuánto necesites disponer cada año: al tributar la SL con un Impuesto sobre Sociedades del 19%/21% (microempresas) frente a los tipos marginales de IRPF que puedes alcanzar como autónomo, puede compensar a partir de ciertos niveles de ingresos, sobre todo si reinviertes beneficios en el negocio. Esta calculadora estima el neto disponible en ambos escenarios con tus propias cifras.",
  },
  {
    question: "¿Cuánto cuesta crear una Sociedad Limitada en España?",
    answer:
      "Entre notaría, Registro Mercantil y gestoría, constituir una SL suele costar entre 300 € y 600 €, además del capital social mínimo de 1 € (en la práctica se recomienda aportar al menos 3.000 €).",
  },
  {
    question: "¿Qué impuestos paga una Sociedad Limitada en España?",
    answer:
      "Principalmente el Impuesto sobre Sociedades (19%/21% escala progresiva para microempresas con cifra de negocio inferior a 1.000.000 €, 25% en general), el IVA de su actividad y las retenciones e IRPF de la nómina del administrador. Los dividendos que reparte tributan además en la base del ahorro del IRPF de cada socio.",
  },
  {
    question: "¿Puedo ser autónomo y tener una Sociedad Limitada a la vez?",
    answer:
      "Sí. Es habitual mantener el alta como autónomo para una actividad y ser socio o administrador de una SL para otra, aunque hay que vigilar la cotización en pluriactividad y el reparto real de rentas entre ambas figuras.",
  },
  {
    question: "¿Qué es mejor fiscalmente, autónomo o SL?",
    answer:
      "Depende de tu rendimiento neto, de si reinviertes beneficios en el negocio y de si necesitas todo el dinero cada año. Esta calculadora estima el neto disponible en ambos escenarios con tus propios números, pero conviene validar la decisión final con un gestor.",
  },
];

export default function AutonomoVsSLPage() {
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
      <AutonomoVsSLTool faqItems={FAQ_ITEMS} />
      <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
