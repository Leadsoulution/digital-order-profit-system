import type { SourceSlice } from "./dashboard-data";

type Segment = {
  slice: SourceSlice;
  dash: number;
  gap: number;
  dashOffset: number;
};

export default function SourceDonut({
  data,
  size = 140,
  strokeWidth = 18,
}: {
  data: SourceSlice[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const top = [...data].sort((a, b) => b.percent - a.percent)[0];
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const { segments } = data.reduce<{ segments: Segment[]; cumulative: number }>(
    (acc, slice) => {
      const fraction = total > 0 ? slice.value / total : 0;
      const dash = fraction * circumference;
      const gap = circumference - dash;
      const dashOffset = -acc.cumulative * circumference;
      return {
        segments: [...acc.segments, { slice, dash, gap, dashOffset }],
        cumulative: acc.cumulative + fraction,
      };
    },
    { segments: [], cumulative: 0 }
  );

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {segments.map(({ slice, dash, gap, dashOffset }) => (
          <circle
            key={slice.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={slice.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={dashOffset}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9.5px] font-medium tracking-wide text-gray-400">
          VOLUME
        </span>
        <span className="text-[17px] font-semibold text-gray-900">
          {total.toLocaleString("fr-FR")}
        </span>
        {top && (
          <span className="text-[10.5px] text-gray-500">
            {top.label} {top.percent}%
          </span>
        )}
      </div>
    </div>
  );
}
