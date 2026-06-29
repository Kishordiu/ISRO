import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Cpu,
  History,
  Activity,
  CheckCircle2,
  XCircle,
  Edit3,
  RefreshCw,
  ShieldCheck,
  Router,
} from "lucide-react";
import Panel from "../components/Panel";
import SeverityBadge from "../components/SeverityBadge";
import Gauge from "../components/Gauge";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import { incident } from "../data/mock";

export default function IncidentAnalysis() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/incidents" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-navy-800 tracking-tight">{incident.id}</h1>
            <SeverityBadge severity={incident.severity} />
          </div>
          <p className="text-sm text-ink-muted mt-1">{incident.title}</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Device", value: incident.device, icon: Router, sub: incident.deviceType },
          { label: "Detected", value: "14:32:08", icon: Clock, sub: "2026-06-29 IST" },
          { label: "Est. Recovery", value: incident.estimatedRecovery, icon: RefreshCw, sub: "AI projection" },
          { label: "Mission Impact", value: "Moderate", icon: AlertTriangle, sub: "Telemetry SLA" },
        ].map((s, i) => (
          <div key={s.label} className="card card-hover p-4 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-2 text-ink-muted">
              <s.icon className="h-4 w-4" />
              <span className="label-xs">{s.label}</span>
            </div>
            <div className="text-lg font-bold text-navy-800 mt-1.5 truncate">{s.value}</div>
            <div className="text-[11px] text-ink-subtle capitalize">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: symptoms + root cause */}
        <div className="xl:col-span-2 space-y-6">
          <Panel title="Observed Symptoms" subtitle="Telemetry signals at time of detection" icon={<Activity className="h-5 w-5" />}>
            <ul className="space-y-2.5">
              {incident.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy-800 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-orange shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="AI Root Cause Analysis" subtitle="Correlated explanation" icon={<Cpu className="h-5 w-5" />}>
            <div className="rounded-xl bg-surface-section border border-surface-border p-4">
              <p className="text-sm text-navy-800 leading-relaxed">{incident.rootCause}</p>
            </div>
            <div className="mt-4">
              <div className="label-xs mb-2">Predicted Impact</div>
              <p className="text-sm text-navy-800 leading-relaxed">{incident.predictedImpact}</p>
            </div>
            <div className="mt-4">
              <div className="label-xs mb-2">Affected Devices</div>
              <div className="flex flex-wrap gap-1.5">
                {incident.affectedDevices.map((d) => (
                  <span key={d} className="chip bg-navy-500/10 text-navy-700 border border-navy-500/20">{d}</span>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Historical Similar Incidents" subtitle="Pattern matches from the archive" icon={<History className="h-5 w-5" />}>
            <div className="space-y-2.5">
              {incident.historical.map((h, i) => (
                <div key={h.id} className="flex items-center gap-3 rounded-xl border border-surface-border bg-white p-3 card-hover animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className="font-mono text-xs text-navy-700 shrink-0">{h.id}</span>
                  <span className="text-xs text-ink-muted shrink-0">{h.date}</span>
                  <span className="text-sm text-navy-800 flex-1 truncate">{h.resolution}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-ink-muted">{h.similarity}%</span>
                    <div className="w-16">
                      <ProgressBar value={h.similarity} color="#1E5AA8" height={5} delay={i * 50 + 200} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right: confidence + actions */}
        <div className="space-y-6">
          <Panel title="Confidence Score" subtitle="AI inference certainty" icon={<ShieldCheck className="h-5 w-5" />}>
            <div className="flex flex-col items-center">
              <Gauge value={incident.confidence} label="Confidence" size={140} />
              <div className="mt-3 text-center text-xs text-ink-muted">
                High agreement across optical, traffic, and routing signals.
              </div>
            </div>
          </Panel>

          <Panel title="Recommended Corrective Actions" subtitle="Ranked by impact and risk" icon={<CheckCircle2 className="h-5 w-5" />}>
            <div className="space-y-2.5">
              {incident.actions.map((a, i) => (
                <div key={a.id} className="rounded-xl border border-surface-border bg-surface-section p-3.5 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center gap-2">
                    <span className="grid place-items-center h-6 w-6 rounded-lg bg-navy-800 text-white text-[11px] font-bold">{i + 1}</span>
                    <SeverityBadge severity={a.risk} label={a.risk.toUpperCase() + " RISK"} />
                  </div>
                  <div className="text-sm font-semibold text-navy-800 mt-2">{a.title}</div>
                  <div className="text-xs text-ink-muted mt-0.5 leading-snug">{a.detail}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Engineer Decision" subtitle="Human-in-the-loop validation" icon={<Edit3 className="h-5 w-5" />}>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="success" onClick={() => nav("/app/review")}>
                <CheckCircle2 className="h-4 w-4" /> Approve
              </Button>
              <Button variant="secondary">
                <Edit3 className="h-4 w-4" /> Modify
              </Button>
              <Button variant="danger">
                <XCircle className="h-4 w-4" /> Reject
              </Button>
              <Button variant="secondary">
                <RefreshCw className="h-4 w-4" /> More Analysis
              </Button>
            </div>
            <Link to="/app/review" className="mt-3 block">
              <Button variant="primary" className="w-full">
                Open Full Review <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}
