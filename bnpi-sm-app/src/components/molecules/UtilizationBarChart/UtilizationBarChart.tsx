import { useState } from 'react';

export interface BarPoint {
  label: string;
  value: number;
}

export interface UtilizationBarChartProps {
  points: BarPoint[];
  /** e.g. "%" — appended to the tooltip value. */
  unit?: string;
  /** Accessible chart description. */
  ariaLabel: string;
}

const WIDTH = 320;
const HEIGHT = 140;
const PAD_X = 8;
const PAD_Y = 18;
const BAR_GAP = 8;

export function UtilizationBarChart({ points, unit = '', ariaLabel }: UtilizationBarChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...points.map((p) => p.value), 1);
  const plotWidth = WIDTH - PAD_X * 2;
  const plotHeight = HEIGHT - PAD_Y * 2;
  const barWidth = points.length > 0 ? plotWidth / points.length - BAR_GAP : 0;

  const bars = points.map((point, index) => {
    const barHeight = Math.max((point.value / max) * plotHeight, 2);
    const x = PAD_X + index * (barWidth + BAR_GAP);
    const y = PAD_Y + (plotHeight - barHeight);
    return { ...point, x, y, barHeight };
  });

  const hovered = hoverIndex !== null ? bars[hoverIndex] : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
        <line
          x1={PAD_X}
          y1={PAD_Y + plotHeight}
          x2={WIDTH - PAD_X}
          y2={PAD_Y + plotHeight}
          stroke="var(--bnpi-border)"
          strokeWidth={1}
        />
        {bars.map((bar, i) => (
          <g
            key={bar.label}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <rect x={bar.x} y={0} width={Math.max(barWidth, 1)} height={HEIGHT} fill="transparent" />
            <rect
              x={bar.x}
              y={bar.y}
              width={Math.max(barWidth, 1)}
              height={bar.barHeight}
              rx={3}
              fill={hoverIndex === i ? 'var(--bnpi-brand-700)' : 'var(--bnpi-brand-600)'}
            />
          </g>
        ))}
      </svg>

      <div className="relative mt-1 h-4">
        {bars.map((bar, i) => (
          <span
            key={bar.label}
            className="absolute -translate-x-1/2 whitespace-nowrap text-xs leading-normal text-text-muted"
            style={{ left: `${((bar.x + barWidth / 2) / WIDTH) * 100}%` }}
          >
            {points[i]!.label}
          </span>
        ))}
      </div>

      {hovered ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md bg-text px-2 py-1 text-xs font-medium text-text-inverse shadow-md"
          style={{
            left: `${((hovered.x + (barWidth || 0) / 2) / WIDTH) * 100}%`,
            top: `${(hovered.y / HEIGHT) * 100}%`,
          }}
        >
          {hovered.value}
          {unit}
        </div>
      ) : null}
    </div>
  );
}
