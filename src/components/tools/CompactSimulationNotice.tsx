import Link from "next/link";

/**
 * Aviso previo compacto y estandarizado para las 6 herramientas: sustituye,
 * antes del formulario/resultado, a los tres avisos extensos
 * (SimulationDisclaimer, PrivacyLocalBadge, TerritorialScopeNotice) por una
 * única línea. El descargo legal exhaustivo (esos mismos tres componentes)
 * se muestra íntegro más abajo, después del resultado.
 */
export function CompactSimulationNotice() {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500 print:hidden">
      <span aria-hidden="true">🔒</span>
      <span>Proceso 100% en local · Territorio Común · Simulación orientativa ·</span>
      <Link
        href="/metodologia"
        className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
      >
        Metodología
      </Link>
    </p>
  );
}
