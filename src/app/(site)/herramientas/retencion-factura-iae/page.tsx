import type { Metadata } from "next";
import { RetencionIAETool } from "@/components/tools/RetencionIAETool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/retencion-factura-iae";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculadora Retención IRPF en Factura 2026: 0%, 7% o 15%",
  description:
    "Descubre en segundos qué porcentaje de retención IRPF debes aplicar según tu epígrafe del IAE y simula tu factura proforma completa con IVA incluido.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Retención IRPF en factura",
  description:
    "Averigua si tu factura lleva retención (0%, 7% o 15%) según tu epígrafe del IAE y simula el líquido a cobrar.",
  path: PATH,
});

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
  {
    question: "¿Tengo yo que presentar el Modelo 111 por la retención de mis facturas?",
    answer:
      "No. El Modelo 111 es la autoliquidación trimestral que presenta tu cliente (el pagador/retenedor) para ingresar en Hacienda las retenciones que te ha practicado; tú no lo presentas ni lo declaras como gasto o deducción propia. Lo que tú declaras es el Modelo 130, tu propio pago fraccionado de IRPF.",
  },
  {
    question: "¿Qué relación tiene la retención con el Modelo 130?",
    answer:
      "El Modelo 130 es el pago fraccionado trimestral del IRPF que adelanta todo autónomo en estimación directa. Las retenciones que ya te han practicado tus clientes en factura se restan de ese pago fraccionado, porque son un anticipo del mismo impuesto. Además, si al menos el 70% de tus ingresos del ejercicio anterior llevaron retención o ingreso a cuenta, quedas exento de ingresar cuota en el Modelo 130 (art. 110.3 del Reglamento del IRPF).",
  },
  {
    question: "¿Tengo que pagar el IAE si soy autónomo?",
    answer:
      "En la práctica, no. Las personas físicas y las entidades con un importe neto de cifra de negocios inferior a 1.000.000 € están exentas del pago del Impuesto sobre Actividades Económicas (art. 82 Texto Refundido de la Ley de Haciendas Locales). Solo debes darte de alta censal en el epígrafe correspondiente a tu actividad, sin cuota a ingresar mientras no superes ese umbral de facturación.",
  },
];

export default function RetencionFacturaIAEPage() {
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
      <RetencionIAETool faqItems={FAQ_ITEMS} />
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
