"use client";

import { useIsClient } from "@/lib/hooks";

interface PrintHeaderProps {
  toolTitle: string;
}

// Fecha estable para el primer render (servidor/build); evita discrepancias de
// hidratación entre el HTML estático y la fecha real de impresión del cliente.
const FECHA_PLACEHOLDER = new Date(2020, 0, 1);

function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Encabezado sobrio, visible únicamente al imprimir (`print:block`): marca,
 * título de la herramienta, fecha real de impresión y descargo legal. Sustituye
 * a la cabecera/menú interactivos del sitio, ocultos en `@media print`.
 */
export function PrintHeader({ toolTitle }: PrintHeaderProps) {
  const mounted = useIsClient();
  const fecha = formatearFecha(mounted ? new Date() : FECHA_PLACEHOLDER);

  return (
    <div className="hidden print:block">
      <div className="flex items-baseline justify-between gap-4 border-b border-slate-300 pb-3">
        <p className="text-lg font-bold text-slate-900">
          FiscalIT.es <span className="font-normal text-slate-600">— Informe de Simulación Fiscal</span>
        </p>
        <p className="shrink-0 text-sm text-slate-500">{fecha}</p>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">
        {toolTitle} · Estimación fiscal orientativa para el ejercicio 2026. No sustituye el asesoramiento de un
        gestor o asesor colegiado.
      </p>
    </div>
  );
}
