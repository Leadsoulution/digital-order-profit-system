export default function AreaTrendChart({
  labels,
  series,
  width = 600,
  height = 200,
}: {
  labels: string[];
  series: { name: string; data: number[]; color: string }[];
  width?: number;
  height?: number;
}) {
  const allValues = series.flatMap((s) => s.data);
  const max = Math.max(...allValues, 1);
  const paddingLeft = 8;
  const paddingBottom = 20;
  const chartWidth = width - paddingLeft;
  const chartHeight = height - paddingBottom;

  function toPoints(data: number[]) {
    return data.map((v, i) => {
      const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
      const y = chartHeight - (v / max) * chartHeight;
      return `${x},${y}`;
    });
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full overflow-visible"
      preserveAspectRatio="none"
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={paddingLeft}
          x2={width}
          y1={chartHeight * (1 - f)}
          y2={chartHeight * (1 - f)}
          stroke="#f3f4f6"
          strokeWidth={1}
        />
      ))}

      {series.map((s) => {
        const points = toPoints(s.data);
        const linePath = `M${points.join(" L")}`;
        const areaPath = `${linePath} L${paddingLeft + chartWidth},${chartHeight} L${paddingLeft},${chartHeight} Z`;
        const gradientId = `trend-${s.name}`;
        return (
          <g key={s.name}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradientId})`} />
            <path d={linePath} fill="none" stroke={s.color} strokeWidth={2} />
          </g>
        );
      })}

      {labels.map((label, i) => {
        const x = paddingLeft + (i / (labels.length - 1)) * chartWidth;
        return (
          <text
            key={label}
            x={x}
            y={height - 2}
            fontSize={10}
            fill="#9ca3af"
            textAnchor="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
