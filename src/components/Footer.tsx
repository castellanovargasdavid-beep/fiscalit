import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">Fiscalit</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">{siteConfig.description}</p>
        </div>

        <nav aria-label="Herramientas">
          <p className="text-sm font-semibold text-slate-900">Herramientas</p>
          <ul className="mt-3 space-y-2">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="text-sm text-slate-600 transition-colors hover:text-slate-900">
                  {tool.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200 px-4 py-6 text-center text-xs text-slate-500 sm:px-6">
        © {year} Fiscalit. Todos los derechos reservados.
      </div>
    </footer>
  );
}
