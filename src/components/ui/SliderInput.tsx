"use client";

import { useId, useRef, useState } from "react";

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
  const errorId = useId();
  const display = formatValue ? formatValue(value) : value.toLocaleString("es-ES");
  const [aviso, setAviso] = useState<string | null>(null);
  const avisoTimeoutRef = useRef<number | null>(null);

  const mostrarAvisoTemporal = (mensaje: string) => {
    setAviso(mensaje);
    if (avisoTimeoutRef.current) window.clearTimeout(avisoTimeoutRef.current);
    avisoTimeoutRef.current = window.setTimeout(() => setAviso(null), 3000);
  };

  const handleNumberChange = (raw: string) => {
    if (raw.trim() === "") {
      mostrarAvisoTemporal(`Escribe un valor entre ${min.toLocaleString("es-ES")} y ${max.toLocaleString("es-ES")}.`);
      onChange(min);
      return;
    }
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
      mostrarAvisoTemporal("Introduce solo números.");
      return;
    }
    if (parsed < min) {
      mostrarAvisoTemporal(`El mínimo es ${min.toLocaleString("es-ES")}. Se ha ajustado automáticamente.`);
      onChange(min);
      return;
    }
    if (parsed > max) {
      mostrarAvisoTemporal(`El máximo es ${max.toLocaleString("es-ES")}. Se ha ajustado automáticamente.`);
      onChange(max);
      return;
    }
    onChange(parsed);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <span className="text-sm font-semibold whitespace-nowrap text-slate-900">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-blue-600 print:hidden"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => handleNumberChange(event.target.value)}
        aria-label={`${label} (valor exacto)`}
        aria-describedby={aviso ? errorId : undefined}
        aria-invalid={aviso ? true : undefined}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none print:hidden"
      />
      {aviso && (
        <p id={errorId} role="status" className="text-xs text-amber-700">
          {aviso}
        </p>
      )}
    </div>
  );
}
