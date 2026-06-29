import { BrainCircuit, ArrowLeft, Cpu, GitBranch, Target, Activity, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Panel from "../components/Panel";
import Gauge from "../components/Gauge";
import ProgressBar from "../components/ProgressBar";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { latencySeries } from "../data/mock";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #D9E2EC",
  boxShadow: "0 4px 12px rgba(11,46,89,0.08)",
  fontSize: 12,
};

const modelMetrics = [
  { label: "Prediction Accuracy", value: 94.2, color: "#16A34A" },
  { label: "False Positive Rate", value: 3.1, color: "#F59E0B" },
  { label: "Mean Time to Detect", value: 88, suffix: "%", color: "#1E5AA8" },
  { label: "Inference Latency", value: 42, suffix: "ms", color: "#1E5AA8" },
];

const inferencePipeline = [
  { stage: "Telemetry Ingest", status: "Healthy", pct: 100 },
  { stage: "Feature Extraction", status: "Healthy", pct: 100 },
  { stage: "Anomaly Detection", status: "Healthy", pct: 98 },
  { stage: "Root Cause Correlation", status: "Warning", pct: 87 },
  { stage: "Impact Prediction", status: "Healthy", pct: 96 },
  { stage: "Recommendation Gen", status: "Healthy", pct: 99 },
];

export default function AIIntelligence() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/dashboard" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">AI Intelligence Engine</h1>
          <p className="text-sm text-ink-muted mt-1">Explainable AI decisions, root cause analysis, and mission impact assessment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel title="Model Confidence" subtitle="Current inference run" icon={<BrainCircuit className="h-5 w-5" />}>
          <div className="flex flex-col items-center">
            <Gauge value={92} label="Confidence" size={150} />
            <div className="mt-3 text-center">
              <div className="text-sm font-semibold text-navy-800">Offline Inference</div>
              <div className="text-xs text-ink-muted">Model v4.2.1 · Last retrain 14:24 IST</div>
            </div>
          </div>
        </Panel>

        <Panel className="xl:col-span-2" title="Model Performance" subtitle="Evaluation on 14-day validation window" icon={<Cpu className="h-5 w-5" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modelMetrics.map((m, i) => (
              <div key={m.label} className="rounded-xl border border-surface-border bg-surface-section p-3.5 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="label-xs">{m.label}</div>
                <div className="text-xl font-bold text-navy-800 mt-1">
                  {m.value}{m.suffix ?? "%"}
                </div>
                <div className="mt-2">
                  <ProgressBar value={m.suffix === "ms" ? 84 : m.value} color={m.color} height={5} delay={i * 60 + 200} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Panel title="Inference Pipeline" subtitle="Stage-by-stage health" icon={<GitBranch className="h-5 w-5" />}>
          <div className="space-y-3">
            {inferencePipeline.map((p, i) => (
              <div key={p.stage} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="grid place-items-center h-7 w-7 rounded-lg bg-navy-800 text-white text-xs font-bold shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-navy-800">{p.stage}</span>
                    <span className={`text-xs font-semibold ${p.status === "Healthy" ? "text-accent-green" : "text-accent-amber"}`}>{p.status}</span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar value={p.pct} color={p.status === "Healthy" ? "#16A34A" : "#F59E0B"} height={5} delay={i * 50 + 200} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Prediction vs Observed" subtitle="Latency forecast accuracy (24h)" icon={<Target className="h-5 w-5" />}>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencySeries} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="threshold" stroke="#DC2626" strokeWidth={1.5} strokeDasharray="5 4" dot={false} animationDuration={900} />
                <Line type="monotone" dataKey="latency" stroke="#1E5AA8" strokeWidth={2.5} dot={false} animationDuration={1200} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Explainable AI Decision" subtitle="How the engine reached the current prediction" icon={<Zap className="h-5 w-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { k: "Primary Signal", v: "Optical input power -14.2 dBm", w: 38 },
            { k: "Correlated Signal", v: "Micro-burst on telemetry VLAN 140", w: 27 },
            { k: "Contextual Signal", v: "BGP keepalive jitter on B-04", w: 18 },
            { k: "Historical Match", v: "INC-2026-0312 (88% similarity)", w: 12 },
            { k: "Environmental", v: "Ambient temp +2°C over baseline", w: 3 },
            { k: "Confidence", v: "92% — high agreement across signals", w: 2 },
          ].map((s, i) => (
            <div key={s.k} className="rounded-xl border border-surface-border bg-surface-section p-3.5 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center justify-between">
                <div className="label-xs">{s.k}</div>
                <span className="text-[11px] font-semibold text-navy-600">{s.w}%</span>
              </div>
              <div className="text-sm text-navy-800 mt-1 leading-snug">{s.v}</div>
              <div className="mt-2">
                <ProgressBar value={s.w} color="#1E5AA8" height={4} delay={i * 50 + 200} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
