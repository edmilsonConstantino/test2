import React from 'react';

/**
 * Biblioteca de micro-gráficos SVG leves e realistas (sem dependências novas),
 * respeitando a paleta existente do sistema — as cores são passadas por prop.
 */

// ---------------------------------------------------------------- Sparkline
export const Sparkline: React.FC<{
  data: number[];
  color?: string;
  className?: string;
  height?: number;
}> = ({ data, color = '#1455AC', className = '', height = 28 }) => {
  if (!data.length) return null;
  const w = 100;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 3 - ((v - min) / range) * (h - 8);
    return [x, y] as const;
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  const gid = `spark-${color.replace('#', '')}-${data.length}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`w-full ${className}`} style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill={color} />
    </svg>
  );
};

// ------------------------------------------------- LineChart (multi-série, dots)
export interface LineSeries {
  name: string;
  color: string;
  values: number[];
}

export const LineChart: React.FC<{
  series: LineSeries[];
  labels: string[];
  height?: number;
  yTicks?: number;
  formatY?: (v: number) => string;
}> = ({ series, labels, height = 190, yTicks = 4, formatY = (v) => String(v) }) => {
  const w = 560;
  const h = height;
  const padL = 44;
  const padR = 10;
  const padT = 10;
  const padB = 24;
  const all = series.flatMap((s) => s.values);
  const rawMax = Math.max(...all, 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)));
  const max = Math.ceil(rawMax / (magnitude / 2)) * (magnitude / 2);
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const x = (i: number) => padL + (i / Math.max(labels.length - 1, 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / max) * innerH;

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (max / yTicks) * i);

  // Grid horizontal suave
  const gridLines = ticks.map((t) => (
    <line
      key={`g-${t}`}
      x1={padL}
      x2={w - padR}
      y1={y(t)}
      y2={y(t)}
      stroke="#E2E8F0"
      strokeWidth="1"
      strokeDasharray={t === 0 ? '0' : '3 4'}
      opacity="0.7"
    />
  ));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: h + 20 }}>
      {gridLines}
      {ticks.map((t) => (
        <text key={`t-${t}`} x={padL - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">
          {formatY(t)}
        </text>
      ))}

      {labels.map((l, i) =>
        i % Math.ceil(labels.length / 7) === 0 || i === labels.length - 1 ? (
          <text key={`x-${l}`} x={x(i)} y={h - 8} textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">
            {l}
          </text>
        ) : null
      )}

      {series.map((s) => {
        const pts = s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
        const areaPath = `M${pts.split(' ').join(' L')} L${x(s.values.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
        const gid = `lc-${s.name.replace(/\s/g, '')}`;
        return (
          <g key={s.name}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.14" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {series.length === 1 && <path d={areaPath} fill={`url(#${gid})`} />}
            <polyline
              points={pts}
              fill="none"
              stroke={s.color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {s.values.map((v, i) => (
              <circle
                key={i}
                cx={x(i)}
                cy={y(v)}
                r="2.6"
                fill="#FFFFFF"
                stroke={s.color}
                strokeWidth="1.8"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// ----------------------------------------------------------------- Donut
export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

export const DonutChart: React.FC<{
  slices: DonutSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
  /** Esconde a legenda embutida (usar quando o pai fornece a sua própria lista) */
  hideLegend?: boolean;
}> = ({ slices, size = 150, thickness = 26, centerLabel, centerSub, hideLegend = false }) => {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        <circle cx={c} cy={c} r={r} fill="none" stroke="#F1F5F9" strokeWidth={thickness} />
        {slices.map((s) => {
          const frac = s.value / total;
          const dash = frac * circ;
          const el = (
            <circle
              key={s.label}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${c} ${c})`}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return el;
        })}
        {centerLabel && (
          <text x={c} y={c - 2} textAnchor="middle" fontSize="15" fontWeight="800" fill="#0F172A">
            {centerLabel}
          </text>
        )}
        {centerSub && (
          <text x={c} y={c + 13} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#94A3B8">
            {centerSub}
          </text>
        )}
      </svg>

      {/* Legenda */}
      {!hideLegend && (
      <div className="flex-1 min-w-[140px] flex flex-col gap-1.5">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium min-w-0">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

// --------------------------------------------------- Barras horizontais
export interface HBar {
  label: string;
  value: number;
  color?: string;
  display?: string;
}

export const HorizontalBars: React.FC<{
  items: HBar[];
  max?: number;
  color?: string;
  height?: number;
}> = ({ items, max, color = '#1455AC', height = 8 }) => {
  const maxVal = max ?? Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-[11px] font-medium text-slate-600 dark:text-slate-400 truncate text-right" title={it.label}>
            {it.label}
          </span>
          <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden" style={{ height }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(it.value / maxVal) * 100}%`, background: it.color || color }}
            />
          </div>
          <span className="w-12 shrink-0 text-[11px] font-bold text-slate-800 dark:text-slate-100 text-right">
            {it.display ?? it.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------- Barras verticais
export const VerticalBars: React.FC<{
  items: { label: string; value: number; color?: string }[];
  height?: number;
  color?: string;
}> = ({ items, height = 130, color = '#1455AC' }) => {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="flex items-end justify-between gap-2" style={{ height: height + 26 }}>
      {items.map((it) => (
        <div key={it.label} className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{it.value}</span>
          <div
            className="w-full max-w-[38px] rounded-t-md transition-all duration-500"
            style={{
              height: Math.max((it.value / max) * height, 4),
              background: it.color || color,
              opacity: 0.85,
            }}
          />
          <span className="text-[8.5px] font-medium text-slate-500 dark:text-slate-400 truncate w-full text-center" title={it.label}>
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
};
