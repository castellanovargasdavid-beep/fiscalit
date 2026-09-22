import type { Metadata } from "next";
import { AdminAccessGate } from "@/components/admin/AdminAccessGate";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

/**
 * Panel interno de operaciones. Deliberadamente:
 * - Fuera del sitemap (`src/app/sitemap.ts` no la lista).
 * - Fuera de robots.txt: un `Disallow` explícito anunciaría esta ruta a
 *   cualquiera que la consulte, justo lo contrario de lo que se busca.
 * - Sin ningún enlace interno desde el sitio público (Header/Footer no la
 *   referencian).
 * - `robots: { index: false, follow: false }` como última red de
 *   seguridad, por si un rastreador la descubre igualmente.
 */
export const metadata: Metadata = {
  title: "Acceso restringido",
  description: "Panel interno de operaciones de FiscalIT.",
  robots: { index: false, follow: false },
};

export default function ControlInternoOperacionesPage() {
  return (
    <AdminAccessGate>
      <AdminDashboard />
    </AdminAccessGate>
  );
}
