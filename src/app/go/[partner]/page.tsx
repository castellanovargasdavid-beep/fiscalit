import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { affiliates } from "@/config/affiliates";
import { GoRedirectClient } from "./GoRedirectClient";

/** No se generan páginas para partners fuera de `affiliates`: exportación estática, sin fallback dinámico. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(affiliates).map((partner) => ({ partner }));
}

export async function generateMetadata({ params }: PageProps<"/go/[partner]">): Promise<Metadata> {
  const { partner } = await params;
  const info = affiliates[partner];

  return {
    title: info ? `Redirigiendo a ${info.name}…` : "Enlace no encontrado",
    robots: { index: false, follow: false },
  };
}

/**
 * Salida centralizada para todos los enlaces salientes a partners: redirige
 * (client-side, ver `GoRedirectClient`) a `affiliates[partner].url`.
 * Mantener esta indirección — en vez de enlazar directamente a cada URL
 * desde <AffiliateCard /> y desde los PDF generados — permite actualizar el
 * destino real de un partner, incluido el paso de "landing pública" a
 * "enlace de tracking real" en cuanto se firme el acuerdo de afiliación, en
 * un único sitio (`src/config/affiliates.ts`), sin tocar ningún componente
 * ni invalidar los PDF que los usuarios ya se han descargado.
 */
export default async function GoToPartnerPage({ params }: PageProps<"/go/[partner]">) {
  const { partner } = await params;
  const info = affiliates[partner];

  if (!info) notFound();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <GoRedirectClient url={info.url} partnerName={info.name} />
      <p className="text-sm text-slate-500">Redirigiendo a</p>
      <p className="mt-1 text-xl font-semibold text-slate-900">{info.name}</p>
      <p className="mt-4 text-sm text-slate-500">
        Si no se abre automáticamente en unos segundos,{" "}
        <a
          href={info.url}
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1 font-medium text-blue-700 underline underline-offset-2"
        >
          continúa aquí
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        .
      </p>
    </div>
  );
}
