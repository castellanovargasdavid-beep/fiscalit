"use client";

import { useEffect } from "react";

interface GoRedirectClientProps {
  url: string;
}

/** Ejecuta la redirección real en cuanto la página estática se hidrata en el cliente. */
export function GoRedirectClient({ url }: GoRedirectClientProps) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return null;
}
