import type { Metadata } from "next";
import { VerifactuTool } from "@/components/tools/VerifactuTool";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import type { FAQItem } from "@/components/FAQAccordion";
import { buildFaqJsonLd, buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const PATH = "/herramientas/diagnostico-verifactu";

export const metadata: Metadata = buildPageMetadata({
  title: "Test VeriFactu 2027: Diagnóstico Preventivo de Sistemas de Facturación y AEAT",
  description:
    "Responde el test VeriFactu y haz un diagnóstico preventivo de tu sistema de facturación: comprueba si cumple los requisitos técnicos exigidos por la AEAT antes de la entrada en vigor de 2027.",
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
    question: "¿Cuál es mi fecha límite exacta si soy autónomo frente a si tengo una sociedad?",
    answer:
      "La fecha límite depende del tipo de contribuyente: 1 de enero de 2027 para los contribuyentes del Impuesto sobre Sociedades (sociedades) y 1 de julio de 2027 para autónomos y el resto de obligados tributarios. Son seis meses de diferencia, así que comprueba cuál te aplica antes de fijar tu plan de migración.",
  },
  {
    question: "¿Qué ocurre si ya tengo un software de facturación pero no genera QR tributario?",
    answer:
      "Un software que no genera el código QR ni la leyenda «Factura verificable en la sede electrónica de la AEAT» no cumple los requisitos técnicos de VeriFactu, aunque sea un programa informático moderno: te falta también el registro de facturación con huella encadenada y, salvo que sea un sistema VeriFactu, el envío inmediato de registros a la AEAT. Revisa con tu proveedor si tiene prevista la certificación.",
  },
  {
    question: "¿La factura electrónica B2B de la Ley Crea y Crece es lo mismo que VeriFactu?",
    answer:
      "No, son obligaciones distintas que conviven: VeriFactu exige que tu sistema informático registre y remita las facturas de forma íntegra y verificable ante la AEAT; la Ley Crea y Crece exige, además, emitir la factura en formato electrónico estructurado cuando factures a otras empresas o profesionales (B2B), con plazos de adaptación aparte (1 o 2 años según tu volumen de facturación).",
  },
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
