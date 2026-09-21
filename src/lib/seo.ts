import type { FAQItem } from "@/components/FAQAccordion";

/** Genera el schema.org FAQPage a partir de las preguntas frecuentes de una herramienta. */
export function buildFaqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
