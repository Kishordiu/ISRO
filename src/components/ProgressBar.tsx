import { useEffect, useState } from "react";

interface Props {
  value: number; // 0-100
  color?: string;
  height?: number;
  delay?: number;
}

/** Animated horizontal health/progress bar. */
export default function ProgressBar({ value, color = "#16A34A", height = 8, delay = 200 }: Props) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div
      className="w-full rounded-full bg-surface-section overflow-hidden"
      style={{ height }}
      role="progressbar"
      aria-valuenow={value}
    >
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${w}%`, background: color }}
      />
    </div>
  );
}
