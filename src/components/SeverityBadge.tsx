import type { Severity } from "../data/mock";

const styles: Record<Severity, string> = {
  critical: "bg-accent-red/10 text-accent-red border border-accent-red/20",
  high: "bg-accent-orange/10 text-accent-orange border border-accent-orange/20",
  medium: "bg-accent-amber/10 text-[#B45309] border border-accent-amber/20",
  low: "bg-navy-500/10 text-navy-600 border border-navy-500/20",
};

const dot: Record<Severity, string> = {
  critical: "bg-accent-red",
  high: "bg-accent-orange",
  medium: "bg-accent-amber",
  low: "bg-navy-500",
};

export default function SeverityBadge({ severity, label }: { severity: Severity; label?: string }) {
  return (
    <span className={`chip ${styles[severity]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[severity]} ${severity === "critical" ? "animate-pulse-soft" : ""}`} />
      {label ?? severity.toUpperCase()}
    </span>
  );
}
