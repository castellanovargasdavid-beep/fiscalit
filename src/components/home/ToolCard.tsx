import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/config/tools";

interface ToolCardProps {
  tool: Tool;
  categoryLabel: string;
}

export function ToolCard({ tool, categoryLabel }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className="group flex flex-col rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {categoryLabel}
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">{tool.title}</h3>
      <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{tool.description}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
        Usar herramienta
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
