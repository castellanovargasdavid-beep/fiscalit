"use client";

export interface ScenarioPreset<T> {
  label: string;
  values: Partial<T>;
}

interface ScenarioPresetsProps<T> {
  presets: ScenarioPreset<T>[];
  onSelect: (values: Partial<T>) => void;
}

/** Fila de escenarios rápidos (presets) que rellenan los controles con un clic. */
export function ScenarioPresets<T>({ presets, onSelect }: ScenarioPresetsProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <span className="text-xs font-medium text-slate-500">Escenarios rápidos:</span>
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => onSelect(preset.values)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
