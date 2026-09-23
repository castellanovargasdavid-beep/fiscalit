"use client";

import { useEffect } from "react";
import { trackAffiliateClick } from "@/lib/analytics";

interface GoRedirectClientProps {
  url: string;
  partnerName: string;
}

/**
 * Ejecuta la redirección real en cuanto la página estática se hidrata en el
 * cliente, y registra aquí el clic de afiliado (con el slug de la
 * herramienta de origen, leído de `?from=`): es el único punto de todo el
 * flujo de afiliados que necesita JavaScript, así que centralizar aquí el
 * tracking evita convertir `AffiliateCard` ni las guías técnicas en
 * Client Components solo para añadir un `onClick`.
 */
export function GoRedirectClient({ url, partnerName }: GoRedirectClientProps) {
  useEffect(() => {
    const toolSlug = new URLSearchParams(window.location.search).get("from") ?? "desconocido";
    trackAffiliateClick(partnerName, toolSlug);
    window.location.replace(url);
  }, [url, partnerName]);

  return null;
}
