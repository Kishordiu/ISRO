import { useEffect, useState } from "react";

interface Props {
  value: number; // 0-100
  size?: number;
  label?: string;
  color?: string;
}

/** Circular confidence gauge with animated arc draw. */
export default function Gauge({ value, size = 132, label, color = "#1E5AA8" }: Props) {
  const [pct, setPct] = useState(0);
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPct(value);
      return;
    }
    const t = setTimeout(() => setPct(value), 120);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="gauge-ring">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2F7" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-navy-800">{Math.round(pct)}%</span>
        {label && <span className="label-xs mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
