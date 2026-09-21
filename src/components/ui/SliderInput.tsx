"use client";

import { useId } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue,
}: SliderInputProps) {
  const id = useId();
  const display = formatValue ? formatValue(value) : value.toLocaleString("es-ES");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <span className="text-sm font-semibold whitespace-nowrap text-zinc-900 dark:text-zinc-50">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-zinc-900 dark:accent-zinc-50"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        aria-label={`${label} (valor exacto)`}
        className="w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
      />
    </div>
  );
}
