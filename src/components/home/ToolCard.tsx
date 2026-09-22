import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/config/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  categoryLabel: string;
}

export function ToolCard({ tool, categoryLabel }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group flex flex-col rounded-2xl border p-5 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
        tool.featured
          ? "border-blue-200 bg-gradient-to-br from-white to-blue-50/30 md:col-span-2"
          : "border-slate-200 bg-white",
      )}
    >
      {tool.featured && (
        <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
          ⭐ Simulación más demandada
        </span>
      )}

      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-slate-600">
          {categoryLabel}
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{tool.title}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{tool.description}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
        {tool.ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
