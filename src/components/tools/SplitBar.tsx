export interface SplitBarSegment {
  label: string;
  value: number;
  className: string;
}

interface SplitBarProps {
  segments: SplitBarSegment[];
}

/** Barra de progreso apilada para visualizar la proporción entre impuestos y neto disponible. */
export function SplitBar({ segments }: SplitBarProps) {
  const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);

  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
        {segments.map((segment) => {
          const porcentaje = total > 0 ? (Math.max(0, segment.value) / total) * 100 : 0;
          if (porcentaje <= 0) return null;
          return (
            <div
              key={segment.label}
              className={segment.className}
              style={{ width: `${porcentaje}%` }}
              title={`${segment.label}: ${porcentaje.toFixed(0)}%`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        {segments.map((segment) => (
          <span key={segment.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${segment.className}`} aria-hidden="true" />
            {segment.label}
          </span>
        ))}
      </div>
    </div>
  );
}
