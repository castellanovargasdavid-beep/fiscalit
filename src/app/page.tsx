import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AffiliateCard } from "@/components/AffiliateCard";
import { toolsNav } from "@/config/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Herramientas fiscales para autónomos y micropymes
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Calculadoras y generadores gratuitos, rápidos y sin registro para
          gestionar tus impuestos y tu facturación sin depender de una
          gestoría para cada duda.
        </p>
      </section>

      <section aria-labelledby="herramientas" className="mt-16">
        <h2
          id="herramientas"
          className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500"
        >
          Herramientas
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {toolsNav.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col justify-between rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {tool.label}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {tool.description}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Usar herramienta
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="recomendados" className="mt-16">
        <h2
          id="recomendados"
          className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500"
        >
          Recomendados para tu negocio
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <AffiliateCard partnerId="holded" />
          <AffiliateCard partnerId="qonto" />
        </div>
      </section>
    </div>
  );
}
