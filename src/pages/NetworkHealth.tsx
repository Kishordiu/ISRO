import { Network, Router, Server, Shield, Activity, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Panel from "../components/Panel";
import ProgressBar from "../components/ProgressBar";
import { devices } from "../data/mock";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { bandwidthSeries, sparkline } from "../data/mock";
import Sparkline from "../components/Sparkline";

const deviceIcon = { router: Router, switch: Network, firewall: Shield, server: Server };
const healthColor = { healthy: "#16A34A", warning: "#F59E0B", critical: "#DC2626" };
const healthLabel = { healthy: "Healthy", warning: "Warning", critical: "Critical" };

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #D9E2EC",
  boxShadow: "0 4px 12px rgba(11,46,89,0.08)",
  fontSize: 12,
};

export default function NetworkHealth() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/dashboard" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Network Health</h1>
          <p className="text-sm text-ink-muted mt-1">Per-device telemetry across the MPLS fabric.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Devices", value: 172, tone: "navy" },
          { label: "Healthy", value: 142, tone: "green" },
          { label: "Warning", value: 23, tone: "amber" },
          { label: "Critical", value: 7, tone: "red" },
        ].map((s, i) => (
          <div key={s.label} className="card card-hover p-4 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="text-2xl font-bold text-navy-800">{s.value}</div>
            <div className="text-xs text-ink-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <Panel title="Aggregate Bandwidth (24h)" subtitle="Uplink utilization across core links" icon={<Activity className="h-5 w-5" />}>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bandwidthSeries} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gUp2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E5AA8" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1E5AA8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDn2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="uplink" stroke="#1E5AA8" strokeWidth={2} fill="url(#gUp2)" animationDuration={1200} />
              <Area type="monotone" dataKey="downlink" stroke="#16A34A" strokeWidth={2} fill="url(#gDn2)" animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Device Telemetry" subtitle="Detailed health per node" icon={<Network className="h-5 w-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {devices.map((d, i) => {
            const Icon = deviceIcon[d.type];
            return (
              <div
                key={d.id}
                className="rounded-xl border border-surface-border bg-surface-section p-4 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="grid place-items-center h-9 w-9 rounded-lg bg-white shadow-soft">
                      <Icon className="h-4.5 w-4.5 text-navy-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-800">{d.name}</div>
                      <div className="text-[11px] text-ink-subtle font-mono">{d.ip} · {d.location}</div>
                    </div>
                  </div>
                  <span
                    className="chip"
                    style={{ background: `${healthColor[d.health]}1a`, color: healthColor[d.health], border: `1px solid ${healthColor[d.health]}33` }}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${d.health === "critical" ? "animate-pulse-soft" : ""}`} style={{ background: healthColor[d.health] }} />
                    {healthLabel[d.health]}
                  </span>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-ink-muted">Bandwidth</span>
                      <span className="font-mono text-navy-700">{d.bandwidth}/{d.bandwidthCap} Mbps</span>
                    </div>
                    <ProgressBar value={(d.bandwidth / d.bandwidthCap) * 100} color={healthColor[d.health]} height={6} delay={i * 50 + 200} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-white border border-surface-border py-1.5">
                      <div className="text-[10px] text-ink-subtle">Latency</div>
                      <div className="text-sm font-semibold text-navy-800">{d.latency}ms</div>
                    </div>
                    <div className="rounded-lg bg-white border border-surface-border py-1.5">
                      <div className="text-[10px] text-ink-subtle">Loss</div>
                      <div className="text-sm font-semibold text-navy-800">{d.packetLoss}%</div>
                    </div>
                    <div className="rounded-lg bg-white border border-surface-border py-1.5">
                      <div className="text-[10px] text-ink-subtle">Uptime</div>
                      <div className="text-sm font-semibold text-navy-800">{d.uptime}%</div>
                    </div>
                  </div>
                  <Sparkline data={sparkline(d.bandwidth, 80)} color={healthColor[d.health]} height={28} />
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
