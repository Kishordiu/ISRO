import type { ReactNode } from "react";
import AnimatedCounter from "./AnimatedCounter";
import Sparkline from "./Sparkline";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  icon: ReactNode;
  tone?: "navy" | "green" | "red" | "orange" | "amber";
  trend?: number; // % change
  spark?: { i: number; v: number }[];
  sparkColor?: string;
  delay?: number;
}

const tones: Record<string, string> = {
  navy: "bg-navy-500/10 text-navy-600",
  green: "bg-accent-green/10 text-accent-green",
  red: "bg-accent-red/10 text-accent-red",
  orange: "bg-accent-orange/10 text-accent-orange",
  amber: "bg-accent-amber/10 text-[#B45309]",
};

export default function KpiCard({
  label,
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  icon,
  tone = "navy",
  trend,
  spark,
  sparkColor = "#1E5AA8",
  delay = 0,
}: Props) {
  return (
    <div
      className="card card-hover p-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`grid place-items-center h-10 w-10 rounded-xl ${tones[tone]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={`chip text-[11px] ${
              trend >= 0 ? "bg-accent-green/10 text-accent-green" : "bg-accent-red/10 text-accent-red"
            }`}
          >
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-navy-800 tracking-tight">
          <AnimatedCounter value={value} decimals={decimals} suffix={suffix} prefix={prefix} />
        </div>
        <div className="text-xs text-ink-muted mt-0.5">{label}</div>
      </div>
      {spark && (
        <div className="mt-3 -mb-1">
          <Sparkline data={spark} color={sparkColor} height={32} />
        </div>
      )}
    </div>
  );
}
