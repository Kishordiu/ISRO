import { Link } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon, Shield, Bell, Database, Cpu, Lock } from "lucide-react";
import Panel from "../components/Panel";
import Button from "../components/Button";
import { useState } from "react";

function Toggle({ on, setOn }: { on: boolean; setOn: (v: boolean) => void }) {
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-navy-600" : "bg-surface-border"}`}
      role="switch"
      aria-checked={on}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const [predict, setPredict] = useState(true);
  const [autoAlert, setAutoAlert] = useState(true);
  const [auditExport, setAuditExport] = useState(false);
  const [telemetry, setTelemetry] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/dashboard" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Settings</h1>
          <p className="text-sm text-ink-muted mt-1">Platform configuration and operational preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Panel title="AI Intelligence" subtitle="Predictive engine controls" icon={<Cpu className="h-5 w-5" />}>
          <div className="space-y-4">
            {[
              { label: "Predictive Failure Detection", desc: "Run inference on live telemetry", on: predict, set: setPredict },
              { label: "Automatic Alert Generation", desc: "Raise alerts when confidence > 85%", on: autoAlert, set: setAutoAlert },
              { label: "Telemetry Streaming", desc: "Ingest device metrics in real time", on: telemetry, set: setTelemetry },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-section p-3.5">
                <div>
                  <div className="text-sm font-semibold text-navy-800">{s.label}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{s.desc}</div>
                </div>
                <Toggle on={s.on} setOn={s.set} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Security & Compliance" subtitle="Access and audit controls" icon={<Shield className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-section p-3.5">
              <div>
                <div className="text-sm font-semibold text-navy-800">Automatic Audit Export</div>
                <div className="text-xs text-ink-muted mt-0.5">Daily export to secure archive</div>
              </div>
              <Toggle on={auditExport} setOn={setAuditExport} />
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-section p-3.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <Lock className="h-4 w-4 text-navy-600" /> Encryption
              </div>
              <div className="text-xs text-ink-muted mt-1">AES-256 at rest · TLS 1.3 in transit (air-gapped)</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-section p-3.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <Shield className="h-4 w-4 text-navy-600" /> Role-Based Access
              </div>
              <div className="text-xs text-ink-muted mt-1">3 roles configured · 42 active operators</div>
            </div>
          </div>
        </Panel>

        <Panel title="Notifications" subtitle="Alert delivery preferences" icon={<Bell className="h-5 w-5" />}>
          <div className="space-y-3">
            {["Critical alerts", "High-severity predictions", "Audit log exports", "System maintenance"].map((n, i) => (
              <div key={n} className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-section p-3.5">
                <span className="text-sm text-navy-800">{n}</span>
                <Toggle on={i < 2} setOn={() => {}} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Data & Retention" subtitle="Telemetry storage policy" icon={<Database className="h-5 w-5" />}>
          <div className="space-y-3">
            <div className="rounded-xl border border-surface-border bg-surface-section p-3.5">
              <div className="label-xs">Telemetry Retention</div>
              <div className="text-sm font-semibold text-navy-800 mt-1">90 days</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-section p-3.5">
              <div className="label-xs">Audit Log Retention</div>
              <div className="text-sm font-semibold text-navy-800 mt-1">7 years (compliance)</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-section p-3.5">
              <div className="label-xs">Model Retrain Cadence</div>
              <div className="text-sm font-semibold text-navy-800 mt-1">Every 14 days</div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">
          <SettingsIcon className="h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
