import Link from "next/link";
import { toolsNav, siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Fiscalit
          </p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Herramientas">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Herramientas
          </p>
          <ul className="mt-3 space-y-2">
            {toolsNav.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Empresa">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Fiscalit
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/sobre-fiscalit"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Sobre Fiscalit
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/aviso-legal"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Aviso legal
              </Link>
            </li>
            <li>
              <Link
                href="/privacidad"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-zinc-200 px-4 py-6 text-center text-xs text-zinc-500 sm:px-6 dark:border-zinc-800 dark:text-zinc-500">
        © {year} Fiscalit. Todos los derechos reservados.
      </div>
    </footer>
  );
}
