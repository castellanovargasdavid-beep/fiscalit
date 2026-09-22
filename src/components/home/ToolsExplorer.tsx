"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { TOOL_CATEGORIES, tools, type ToolCategory } from "@/config/tools";
import { ToolCard } from "@/components/home/ToolCard";
import { cn } from "@/lib/utils";

type FiltroCategoria = "todas" | ToolCategory;

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function ToolsExplorer() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<FiltroCategoria>("todas");

  const categoriaLabelPorId = useMemo(
    () => Object.fromEntries(TOOL_CATEGORIES.map((c) => [c.id, c.label])) as Record<ToolCategory, string>,
    [],
  );

  const herramientasFiltradas = useMemo(() => {
    const consulta = normalizar(busqueda.trim());
    return tools.filter((tool) => {
      if (categoria !== "todas" && tool.category !== categoria) return false;
      if (!consulta) return true;
      const haystack = normalizar(
        [tool.title, tool.description, ...tool.keywords].join(" "),
      );
      return haystack.includes(consulta);
    });
  }, [busqueda, categoria]);

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria("todas");
  };

  return (
    <section aria-labelledby="herramientas-heading">
      <h2 id="herramientas-heading" className="sr-only">
        Herramientas disponibles
      </h2>

      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          placeholder="Busca por tarea: cuota, factura, sl, dietas, iva, verifactu, pluriactividad..."
          aria-label="Buscar herramienta"
          className="w-full rounded-full border border-zinc-200 bg-white py-3 pr-4 pl-11 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        <FiltroPill
          activo={categoria === "todas"}
          onClick={() => setCategoria("todas")}
          label="Todas"
        />
        {TOOL_CATEGORIES.map((cat) => (
          <FiltroPill
            key={cat.id}
            activo={categoria === cat.id}
            onClick={() => setCategoria(cat.id)}
            label={cat.label}
          />
        ))}
      </div>

      {herramientasFiltradas.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {herramientasFiltradas.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} categoryLabel={categoriaLabelPorId[tool.category]} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 px-6 py-16 text-center dark:border-zinc-800">
          <SearchX className="h-8 w-8 text-zinc-400" aria-hidden="true" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No hay ninguna herramienta que coincida con tu búsqueda.
          </p>
          <button
            type="button"
            onClick={limpiarFiltros}
            className="mt-1 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </section>
  );
}

function FiltroPill({
  label,
  activo,
  onClick,
}: {
  label: string;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        activo
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
          : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
      )}
    >
      {label}
    </button>
  );
}
