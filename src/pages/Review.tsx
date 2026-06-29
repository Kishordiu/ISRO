import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Edit3,
  RefreshCw,
  Play,
  History,
  FileText,
  ShieldCheck,
  Activity,
  Cpu,
} from "lucide-react";
import Panel from "../components/Panel";
import Gauge from "../components/Gauge";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import SeverityBadge from "../components/SeverityBadge";
import { incident, auditEvents } from "../data/mock";
import { useState } from "react";

export default function Review() {
  const [notes, setNotes] = useState("");
  const [executed, setExecuted] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/incidents" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Engineer Review & Approval</h1>
          <p className="text-sm text-ink-muted mt-1">
            Human validation of AI recommendation · {incident.id} · AI assists, the engineer finalizes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: AI recommendation + evidence */}
        <div className="space-y-6">
          <Panel title="AI Recommendation Summary" subtitle="What the engine proposes" icon={<BrainCircuit className="h-5 w-5" />}>
            <div className="flex items-center gap-4">
              <Gauge value={incident.confidence} label="Confidence" size={110} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-navy-800">{incident.title}</div>
                <div className="text-xs text-ink-muted mt-1">{incident.rootCause}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {incident.affectedDevices.map((d) => (
                    <span key={d} className="chip bg-navy-500/10 text-navy-700 border border-navy-500/20">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Evidence" subtitle="Supporting telemetry signals" icon={<Activity className="h-5 w-5" />}>
            <div className="space-y-2.5">
              {[
                { k: "Optical input power", v: "-14.2 dBm (nominal -7.0)", w: 92 },
                { k: "Interface output drops", v: "14/s and rising", w: 78 },
                { k: "BGP keepalive jitter", v: "3.2ms variance", w: 64 },
                { k: "Micro-burst on VLAN 140", v: "920ms bursts detected", w: 71 },
              ].map((e, i) => (
                <div key={e.k} className="rounded-xl border border-surface-border bg-surface-section p-3 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-navy-800">{e.k}</span>
                    <span className="text-xs text-ink-muted">{e.v}</span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar value={e.w} color="#1E5AA8" height={4} delay={i * 50 + 200} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Historical Incidents" subtitle="Prior resolutions" icon={<History className="h-5 w-5" />}>
            <div className="space-y-2">
              {incident.historical.map((h, i) => (
                <div key={h.id} className="flex items-center gap-3 rounded-xl border border-surface-border bg-white p-3 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className="font-mono text-xs text-navy-700">{h.id}</span>
                  <span className="text-xs text-ink-muted">{h.date}</span>
                  <span className="text-sm text-navy-800 flex-1 truncate">{h.resolution}</span>
                  <span className="text-xs font-semibold text-navy-600">{h.similarity}%</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Root Cause Details" subtitle="Full explanation" icon={<Cpu className="h-5 w-5" />}>
            <p className="text-sm text-navy-800 leading-relaxed">{incident.rootCause}</p>
            <div className="mt-3 rounded-xl bg-surface-section border border-surface-border p-3">
              <div className="label-xs mb-1">Predicted Impact</div>
              <p className="text-sm text-navy-800 leading-snug">{incident.predictedImpact}</p>
            </div>
          </Panel>
        </div>

        {/* Right: editable action plan + approval */}
        <div className="space-y-6">
          <Panel title="Editable Action Plan" subtitle="Adjust before execution" icon={<Edit3 className="h-5 w-5" />}>
            <div className="space-y-2.5">
              {incident.actions.map((a, i) => (
                <div key={a.id} className="rounded-xl border border-surface-border bg-surface-section p-3.5 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-navy-700 h-4 w-4 rounded" />
                    <span className="grid place-items-center h-6 w-6 rounded-lg bg-navy-800 text-white text-[11px] font-bold">{i + 1}</span>
                    <SeverityBadge severity={a.risk} label={a.risk.toUpperCase() + " RISK"} />
                  </div>
                  <div className="text-sm font-semibold text-navy-800 mt-2">{a.title}</div>
                  <input
                    defaultValue={a.detail}
                    className="input mt-2 text-xs py-2"
                  />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Approval Notes" subtitle="Engineer justification" icon={<FileText className="h-5 w-5" />}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Document the rationale for this decision. This will be recorded in the audit trail."
              rows={4}
              className="input resize-none"
            />
            <div className="text-[11px] text-ink-subtle mt-1.5">
              {notes.length} characters · Required for execution
            </div>
          </Panel>

          <Panel title="Configuration Summary" subtitle="Pre-execution review" icon={<ShieldCheck className="h-5 w-5" />}>
            <div className="rounded-xl border border-surface-border bg-surface-section p-3.5 font-mono text-xs text-navy-800 leading-relaxed">
              <div className="text-ink-muted"># Proposed change</div>
              <div>interface Gi0/1</div>
              <div> shutdown</div>
              <div>!</div>
              <div>interface Gi0/2</div>
              <div> no shutdown</div>
              <div>!</div>
              <div>policy-map QOS-SHAPE-VLAN140</div>
              <div> shape average 900000000</div>
            </div>
          </Panel>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="success" onClick={() => setExecuted(true)}>
              <CheckCircle2 className="h-4 w-4" /> Approve Action
            </Button>
            <Button variant="secondary">
              <Edit3 className="h-4 w-4" /> Modify Recommendation
            </Button>
            <Button variant="secondary">
              <RefreshCw className="h-4 w-4" /> Request More Analysis
            </Button>
            <Button variant="primary" onClick={() => setExecuted(true)}>
              <Play className="h-4 w-4" /> Execute Configuration
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom: execution status + audit + feedback */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel title="Execution Status" subtitle="Live configuration rollout" icon={<Play className="h-5 w-5" />}>
          <div className="space-y-3">
            {[
              { step: "Validate configuration syntax", done: true },
              { step: "Push to Access Switch A-12", done: executed },
              { step: "Verify uplink failover convergence", done: executed },
              { step: "Confirm telemetry stream restored", done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {s.done ? (
                  <CheckCircle2 className="h-4 w-4 text-accent-green shrink-0" />
                ) : (
                  <span className="h-4 w-4 rounded-full border-2 border-surface-border shrink-0" />
                )}
                <span className={`text-sm ${s.done ? "text-navy-800" : "text-ink-muted"}`}>{s.step}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Audit Trail" subtitle="Recorded actions" icon={<History className="h-5 w-5" />}>
          <div className="space-y-2">
            {auditEvents.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-start gap-2.5 text-xs">
                <span className="font-mono text-ink-subtle shrink-0">{e.time}</span>
                <span className="text-navy-800">{e.event}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Updated System Health" subtitle="Post-action feedback" icon={<Activity className="h-5 w-5" />}>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-ink-muted">Packet loss (A-12)</span>
                <span className="font-mono text-accent-green">0.04%</span>
              </div>
              <ProgressBar value={4} color="#16A34A" height={5} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-ink-muted">Latency (A-12)</span>
                <span className="font-mono text-accent-green">3.4ms</span>
              </div>
              <ProgressBar value={12} color="#16A34A" height={5} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-ink-muted">Telemetry jitter</span>
                <span className="font-mono text-accent-green">0.8ms</span>
              </div>
              <ProgressBar value={20} color="#16A34A" height={5} />
            </div>
            <div className="rounded-xl bg-accent-green/10 border border-accent-green/20 p-3 mt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent-green">
                <CheckCircle2 className="h-4 w-4" /> SLA Restored
              </div>
              <div className="text-xs text-ink-muted mt-0.5">All telemetry feeds within threshold.</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
