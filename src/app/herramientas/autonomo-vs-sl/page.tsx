import type { Metadata } from "next";
import { AutonomoVsSLTool } from "@/components/tools/AutonomoVsSLTool";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/autonomo-vs-sl";

export const metadata: Metadata = buildPageMetadata({
  title: "Autónomo vs Sociedad Limitada 2026: ¿Qué te Conviene Más?",
  description:
    "Descubre en segundos si te compensa más ser autónomo o crear una SL. Compara tu neto real con IRPF, cuota RETA e Impuesto de Sociedades. Calculadora 100% gratis.",
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
    question: "¿Cuándo interesa pasar de autónomo a Sociedad Limitada?",
    answer:
      "Suele compensar cuando el rendimiento neto anual supera aproximadamente los 60.000-65.000 €, ya que el Impuesto sobre Sociedades (23-25%) queda por debajo de los tipos marginales de IRPF que soportarías como autónomo a partir de ese nivel de ingresos.",
  },
  {
    question: "¿Cuánto cuesta crear una Sociedad Limitada en España?",
    answer:
      "Entre notaría, Registro Mercantil y gestoría, constituir una SL suele costar entre 300 € y 600 €, además del capital social mínimo de 1 € (en la práctica se recomienda aportar al menos 3.000 €).",
  },
  {
    question: "¿Qué impuestos paga una Sociedad Limitada en España?",
    answer:
      "Principalmente el Impuesto sobre Sociedades (23% para microempresas con cifra de negocio inferior a 1.000.000 €, 25% en general), el IVA de su actividad y las retenciones e IRPF de la nómina del administrador. Los dividendos que reparte tributan además en la base del ahorro del IRPF de cada socio.",
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
    </>
  );
}
