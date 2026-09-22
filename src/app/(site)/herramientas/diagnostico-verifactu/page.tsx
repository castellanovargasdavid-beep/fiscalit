import type { Metadata } from "next";
import { VerifactuTool } from "@/components/tools/VerifactuTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/diagnostico-verifactu";

export const metadata: Metadata = buildPageMetadata({
  title: "Diagnóstico VeriFactu 2027: ¿Cumple tu Sistema de Facturación?",
  description:
    "Responde 4 preguntas y descubre si tu sistema de facturación cumple ya los requisitos técnicos de VeriFactu, tu fecha límite legal (2027) y el checklist que te falta.",
  path: PATH,
});

const WEB_APPLICATION_JSON_LD = buildWebApplicationJsonLd({
  name: "Diagnóstico VeriFactu",
  description:
    "Comprueba si tu sistema de facturación cumple los requisitos técnicos de VeriFactu y de la Ley Crea y Crece, con checklist y fechas límite de 2027.",
  path: PATH,
});

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cuándo es obligatorio VeriFactu y qué pasa si no cumplo a partir de esa fecha?",
    answer:
      "VeriFactu será obligatorio desde el 1 de enero de 2027 para los contribuyentes del Impuesto sobre Sociedades y desde el 1 de julio de 2027 para autónomos y el resto de obligados tributarios. A partir de tu fecha límite, la Ley 11/2021 antifraude prevé sanciones de hasta 50.000 € por ejercicio para quien use sistemas de facturación no conformes, y de hasta 150.000 € para fabricantes o comercializadores de software que no cumpla los requisitos.",
  },
  {
    question: "¿Puedo seguir facturando con Excel o Word?",
    answer:
      "Si usas Excel o Word solo como plantilla y emites la factura con un programa informático, VeriFactu te afecta igualmente: la normativa se dirige a cualquier sistema informático de facturación. Lo más seguro es migrar a un software certificado antes de tu fecha límite.",
  },
  {
    question: "¿Cuál es la diferencia entre VeriFactu y la Ley Crea y Crece?",
    answer:
      "Son dos normas distintas que suelen confundirse: VeriFactu (RD 1007/2023) regula la integridad y verificación de los registros de facturación frente a la AEAT; la Ley Crea y Crece obliga, además, a emitir factura electrónica estructurada entre empresas y profesionales (B2B), con un reglamento de desarrollo aún pendiente.",
  },
  {
    question: "¿Qué pasa si mi facturación es inferior a 8 millones de euros?",
    answer:
      "Para la factura electrónica B2B de la Ley Crea y Crece, tendrás un plazo de adaptación más largo (2 años desde la entrada en vigor del reglamento) frente al plazo corto (1 año) que aplica a quienes facturan más de 8 millones de euros.",
  },
  {
    question: "¿Necesito un software específico o puedo adaptar el que ya tengo?",
    answer:
      "Depende de tu proveedor: muchos programas de facturación ya han anunciado o publicado su adaptación a VeriFactu. Consulta con tu proveedor actual si tiene previsto certificarse, o valora migrar a uno ya homologado por la AEAT.",
  },
];

export default function DiagnosticoVerifactuPage() {
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
      <VerifactuTool faqItems={FAQ_ITEMS} />
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
        <BoeAlertSignup />
      </div>
    </>
  );
}
