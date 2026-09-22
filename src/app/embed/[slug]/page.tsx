import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { AutonomoVsSLTool } from "@/components/tools/AutonomoVsSLTool";
import { CuotaAutonomosTool } from "@/components/tools/CuotaAutonomosTool";
import { VerifactuTool } from "@/components/tools/VerifactuTool";
import { KilometrajeDietasTool } from "@/components/tools/KilometrajeDietasTool";
import { RetencionIAETool } from "@/components/tools/RetencionIAETool";
import { PluriactividadTool } from "@/components/tools/PluriactividadTool";
import type { FAQItem } from "@/components/FAQAccordion";
import { tools } from "@/config/tools";

/** No se generan páginas para slugs fuera de `tools`: exportación estática, sin fallback dinámico. */
export const dynamicParams = false;

const EMBEDDABLE_TOOLS: Record<string, ComponentType<{ faqItems: FAQItem[] }>> = {
  "autonomo-vs-sl": AutonomoVsSLTool,
  "calculadora-cuota-autonomos": CuotaAutonomosTool,
  "diagnostico-verifactu": VerifactuTool,
  "calculadora-kilometraje-dietas": KilometrajeDietasTool,
  "retencion-factura-iae": RetencionIAETool,
  "pluriactividad-devolucion": PluriactividadTool,
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps<"/embed/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);

  return {
    title: tool ? `${tool.title} (widget embebible)` : "Widget no encontrado",
    robots: { index: false, follow: false },
  };
}

export default async function EmbedToolPage({ params }: PageProps<"/embed/[slug]">) {
  const { slug } = await params;
  const ToolComponent = EMBEDDABLE_TOOLS[slug];

  if (!ToolComponent) notFound();

  return <ToolComponent faqItems={[]} />;
}
