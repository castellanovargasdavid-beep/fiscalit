import type { Metadata } from "next";
import { RetencionIAETool } from "@/components/tools/RetencionIAETool";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calculadora de retención IRPF en factura (0%, 7% o 15%)",
  description:
    "Descubre si tu factura lleva retención de IRPF según tu epígrafe del IAE y simula una factura proforma completa con IVA y retención.",
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cuál es la diferencia entre Sección 1 y Sección 2 del IAE?",
    answer:
      "La Sección 1 (actividades empresariales) agrupa comercio, industria, hostelería y servicios que no requieren una cualificación profesional específica, y sus facturas no llevan retención de IRPF. La Sección 2 (actividades profesionales) agrupa servicios que exigen una titulación o cualificación —consultoría, diseño, abogacía, arquitectura...— y sus facturas sí llevan retención.",
  },
  {
    question: "¿Cuándo puedo facturar con la retención reducida del 7%?",
    answer:
      "Puedes aplicar el 7% en lugar del 15% durante el año en que te das de alta como autónomo y los dos siguientes, siempre que no hayas ejercido esa misma actividad profesional en el año anterior a tu fecha de alta.",
  },
  {
    question: "¿Qué pasa si facturo sin aplicar retención por error?",
    answer:
      "Debes emitir una factura rectificativa aplicando el porcentaje correcto. Si ya presentaste el trimestre, tendrás que rectificar también el modelo 130 o 303 correspondiente; Hacienda puede exigir igualmente la retención al pagador si no consta bien aplicada.",
  },
  {
    question: "¿Tengo que aplicar retención a clientes particulares o extranjeros?",
    answer:
      "No. La retención de IRPF en factura solo se aplica entre profesionales o empresas españolas sujetas a IRPF; si facturas a un particular (B2C) o a un cliente extranjero, no debes aplicar retención.",
  },
  {
    question: "¿Cómo sé en qué epígrafe del IAE estoy dado de alta?",
    answer:
      "Puedes consultarlo en tu alta censal (modelo 036 o 037) presentada ante la AEAT, donde figura el epígrafe del IAE correspondiente a tu actividad.",
  },
];

export default function RetencionFacturaIAEPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ_ITEMS)) }}
      />
      <RetencionIAETool faqItems={FAQ_ITEMS} />
    </>
  );
}
