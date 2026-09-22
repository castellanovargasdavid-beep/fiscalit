"use client";

import { cn } from "@/lib/utils";

export interface OptionGroupChoice<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface OptionGroupProps<T extends string> {
  label: string;
  options: OptionGroupChoice<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: 2 | 3 | 4;
}

/** Grupo de tarjetas/botones seleccionables tipo radio, usado en formularios de tipo test. */
export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: OptionGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <div
        className={cn(
          "mt-2 grid gap-2 print:hidden",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4",
        )}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-xl border p-3 text-left text-sm transition-colors",
                selected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
              )}
            >
              <span className="block font-medium">{option.label}</span>
              {option.description && (
                <span
                  className={cn("mt-0.5 block text-xs", selected ? "text-blue-100" : "text-slate-500")}
                >
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
