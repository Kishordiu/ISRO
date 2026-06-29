import {
  Activity,
  Cpu,
  AlertTriangle,
  Gauge as GaugeIcon,
  BrainCircuit,
  Network,
  Router,
  Server,
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lightbulb,
  Radio,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import KpiCard from "../components/KpiCard";
import Panel from "../components/Panel";
import SeverityBadge from "../components/SeverityBadge";
import ProgressBar from "../components/ProgressBar";
import Gauge from "../components/Gauge";
import Button from "../components/Button";
import {
  alerts,
  auditEvents,
  bandwidthSeries,
  devices,
  healthTrend,
  latencySeries,
  recommendations,
  severityBreakdown,
  sparkline,
} from "../data/mock";

const deviceIcon = { router: Router, switch: Network, firewall: Shield, server: Server };
const healthColor = { healthy: "#16A34A", warning: "#F59E0B", critical: "#DC2626" };

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #D9E2EC",
  boxShadow: "0 4px 12px rgba(11,46,89,0.08)",
  fontSize: 12,
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Mission Control Dashboard</h1>
          <p className="text-sm text-ink-muted mt-1">
            Real-time health, predictive intelligence, and engineer validation for the secure MPLS fabric.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="chip bg-white border border-surface-border text-ink-muted shadow-soft">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-mono">2026-06-29 14:33 IST</span>
          </div>
          <Button variant="secondary">
            <Radio className="h-4 w-4" /> Live
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="Network Health" value={98.4} decimals={1} suffix="%" icon={<Activity className="h-5 w-5" />} tone="green" trend={0.3} spark={sparkline(96, 2)} sparkColor="#16A34A" delay={0} />
        <KpiCard label="Connected Devices" value={172} icon={<Cpu className="h-5 w-5" />} tone="navy" trend={1.2} spark={sparkline(168, 4)} delay={60} />
        <KpiCard label="Critical Alerts" value={3} icon={<AlertTriangle className="h-5 w-5" />} tone="red" trend={-12} spark={sparkline(5, 2)} sparkColor="#DC2626" delay={120} />
        <KpiCard label="Risk Score" value={24} suffix="/100" icon={<GaugeIcon className="h-5 w-5" />} tone="amber" trend={-4} spark={sparkline(28, 6)} sparkColor="#F59E0B" delay={180} />
        <KpiCard label="AI Confidence" value={92} suffix="%" icon={<BrainCircuit className="h-5 w-5" />} tone="navy" trend={2} spark={sparkline(88, 4)} delay={240} />
        <KpiCard label="Predicted Failures" value={2} icon={<AlertTriangle className="h-5 w-5" />} tone="orange" trend={-1} spark={sparkline(3, 2)} sparkColor="#F97316" delay={300} />
      </div>

      {/* Row: Network status + AI intelligence */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* A. Live MPLS Network Status */}
        <Panel
          className="xl:col-span-2"
          title="Live MPLS Network Status"
          subtitle="Real-time device health across the secure fabric"
          icon={<Network className="h-5 w-5" />}
          action={
            <Link to="/app/network" className="btn-ghost text-xs">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {/* Device cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {devices.slice(0, 8).map((d, i) => {
              const Icon = deviceIcon[d.type];
              return (
                <div
                  key={d.id}
                  className="rounded-xl border border-surface-border bg-surface-section p-3.5 card-hover animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="grid place-items-center h-8 w-8 rounded-lg bg-white shadow-soft">
                      <Icon className="h-4 w-4 text-navy-600" />
                    </div>
                    <span className={`h-2 w-2 rounded-full ${d.health === "healthy" ? "bg-accent-green" : d.health === "warning" ? "bg-accent-amber" : "bg-accent-red animate-pulse-soft"}`} />
                  </div>
                  <div className="mt-2.5">
                    <div className="text-sm font-semibold text-navy-800 truncate">{d.name}</div>
                    <div className="text-[11px] text-ink-subtle font-mono">{d.ip}</div>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-ink-muted">Bandwidth</span>
                      <span className="font-mono text-navy-700">{d.bandwidth}/{d.bandwidthCap} Mbps</span>
                    </div>
                    <ProgressBar value={(d.bandwidth / d.bandwidthCap) * 100} color={healthColor[d.health]} height={5} delay={i * 50 + 200} />
                    <div className="flex justify-between text-[11px] pt-0.5">
                      <span className="text-ink-muted">Latency <span className="font-mono text-navy-700">{d.latency}ms</span></span>
                      <span className="text-ink-muted">Loss <span className="font-mono text-navy-700">{d.packetLoss}%</span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bandwidth chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-surface-border bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-navy-800">Bandwidth Utilization (24h)</span>
                <span className="label-xs">Mbps</span>
              </div>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bandwidthSeries} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                    <defs>
                      <linearGradient id="gUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1E5AA8" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#1E5AA8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={4} />
                    <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="uplink" stroke="#1E5AA8" strokeWidth={2} fill="url(#gUp)" animationDuration={1200} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-surface-border bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-navy-800">Latency vs Threshold (24h)</span>
                <span className="label-xs">ms</span>
              </div>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={latencySeries} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={4} />
                    <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="threshold" stroke="#DC2626" strokeWidth={1.5} strokeDasharray="5 4" dot={false} animationDuration={900} />
                    <Line type="monotone" dataKey="latency" stroke="#0B2E59" strokeWidth={2} dot={false} animationDuration={1200} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Panel>

        {/* B. AI Intelligence Panel */}
        <Panel
          title="AI Intelligence Engine"
          subtitle="Current prediction & root cause"
          icon={<BrainCircuit className="h-5 w-5" />}
          action={<Link to="/app/ai" className="btn-ghost text-xs">Details <ArrowRight className="h-3.5 w-3.5" /></Link>}
        >
          <div className="flex flex-col items-center mb-4">
            <Gauge value={92} label="Confidence" />
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-surface-section border border-surface-border p-3">
              <div className="label-xs mb-1">Current Prediction</div>
              <p className="text-sm text-navy-800 font-medium leading-snug">
                SFP transceiver degradation on A-12 uplink Gi0/1 will cause packet loss to exceed 6% within 22 minutes.
              </p>
            </div>
            <div className="rounded-xl bg-surface-section border border-surface-border p-3">
              <div className="label-xs mb-1">Root Cause Summary</div>
              <p className="text-sm text-navy-800 leading-snug">
                Optical input power dropped to -14.2 dBm, compounded by micro-burst traffic from telemetry aggregation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-surface-border p-3">
                <div className="label-xs">Mission Impact</div>
                <div className="text-sm font-semibold text-accent-amber mt-0.5">Moderate</div>
              </div>
              <div className="rounded-xl border border-surface-border p-3">
                <div className="label-xs">Est. Recovery</div>
                <div className="text-sm font-semibold text-navy-800 mt-0.5">18 min</div>
              </div>
            </div>
            <div className="rounded-xl border border-surface-border p-3">
              <div className="label-xs mb-1.5">Affected Devices</div>
              <div className="flex flex-wrap gap-1.5">
                {["Access Switch A-12", "AI Inference Node S-22", "Telemetry Server S-21"].map((d) => (
                  <span key={d} className="chip bg-navy-500/10 text-navy-700 border border-navy-500/20">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Row: Alerts + Events */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* C. Priority Alerts */}
        <Panel
          className="xl:col-span-2"
          title="Priority Alerts"
          subtitle="Ranked by severity and mission impact"
          icon={<AlertTriangle className="h-5 w-5" />}
          action={<Link to="/app/incidents" className="btn-ghost text-xs">All incidents <ArrowRight className="h-3.5 w-3.5" /></Link>}
        >
          <div className="space-y-2.5">
            {alerts.map((a, i) => (
              <div
                key={a.id}
                className="flex items-center gap-3 rounded-xl border border-surface-border bg-white px-3.5 py-3 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <SeverityBadge severity={a.severity} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-navy-800 truncate">{a.title}</div>
                  <div className="text-[11px] text-ink-muted flex items-center gap-2 mt-0.5">
                    <span className="font-mono">{a.id}</span>
                    <span>·</span>
                    <span>{a.device}</span>
                    <span>·</span>
                    <span>{a.category}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[11px] font-mono text-ink-muted">{a.time}</div>
                  <span className={`text-[11px] font-semibold ${a.status === "open" ? "text-accent-red" : a.status === "acknowledged" ? "text-accent-amber" : "text-accent-green"}`}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Severity breakdown + health trend */}
        <Panel title="Severity Distribution" subtitle="Across 172 devices" icon={<Activity className="h-5 w-5" />}>
          <div className="flex items-center gap-4">
            <div style={{ height: 160, width: 160 }} className="shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityBreakdown} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={2} animationDuration={1000}>
                    {severityBreakdown.map((s) => (
                      <Cell key={s.name} fill={s.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 flex-1">
              {severityBreakdown.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm text-navy-800 flex-1">{s.name}</span>
                  <span className="text-sm font-semibold text-navy-800">{s.value}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-surface-border">
                <div className="label-xs mb-1.5">12-Day Health Trend</div>
                <div style={{ height: 56 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={healthTrend} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
                      <Bar dataKey="health" radius={[3, 3, 0, 0]} fill="#16A34A" animationDuration={900} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Row: Events + Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* D. Recent Events / Audit */}
        <Panel
          className="xl:col-span-2"
          title="Recent Events & Audit Trail"
          subtitle="Engineer activity and system telemetry"
          icon={<CheckCircle2 className="h-5 w-5" />}
          action={<Link to="/app/audit" className="btn-ghost text-xs">Full audit <ArrowRight className="h-3.5 w-3.5" /></Link>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-ink-subtle border-b border-surface-border">
                  <th className="font-semibold py-2 pr-3">Time</th>
                  <th className="font-semibold py-2 pr-3">Device</th>
                  <th className="font-semibold py-2 pr-3">Event</th>
                  <th className="font-semibold py-2 pr-3">Engineer</th>
                  <th className="font-semibold py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditEvents.map((e, i) => (
                  <tr
                    key={e.id}
                    className="border-b border-surface-border/60 last:border-0 hover:bg-surface-section transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="py-2.5 pr-3 font-mono text-[12px] text-ink-muted whitespace-nowrap">{e.time}</td>
                    <td className="py-2.5 pr-3 text-navy-800 font-medium whitespace-nowrap">{e.device}</td>
                    <td className="py-2.5 pr-3 text-ink-muted">{e.event}</td>
                    <td className="py-2.5 pr-3 text-navy-700 whitespace-nowrap">{e.engineer}</td>
                    <td className="py-2.5">
                      <span className={`chip ${
                        e.status === "success" ? "bg-accent-green/10 text-accent-green" :
                        e.status === "warning" ? "bg-accent-amber/10 text-[#B45309]" :
                        e.status === "critical" ? "bg-accent-red/10 text-accent-red" :
                        "bg-navy-500/10 text-navy-600"
                      }`}>{e.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* E. Recommended Actions */}
        <Panel
          title="Recommended Actions"
          subtitle="Ranked by AI decision intelligence"
          icon={<Lightbulb className="h-5 w-5" />}
          action={<Link to="/app/review" className="btn-ghost text-xs">Review <ArrowRight className="h-3.5 w-3.5" /></Link>}
        >
          <div className="space-y-2.5">
            {recommendations.map((r, i) => (
              <div
                key={r.id}
                className="rounded-xl border border-surface-border bg-white p-3.5 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center h-7 w-7 rounded-lg bg-navy-800 text-white text-xs font-bold shrink-0">
                    {r.rank}
                  </span>
                  <SeverityBadge severity={r.impact} />
                  <span className="ml-auto text-[11px] text-ink-muted font-mono">ETA {r.eta}</span>
                </div>
                <div className="text-sm font-semibold text-navy-800 mt-2">{r.title}</div>
                <div className="text-xs text-ink-muted mt-0.5 leading-snug">{r.detail}</div>
              </div>
            ))}
          </div>
          <Link to="/app/review" className="mt-4 block">
            <Button variant="primary" className="w-full">
              <CheckCircle2 className="h-4 w-4" /> Open Engineer Review
            </Button>
          </Link>
        </Panel>
      </div>
    </div>
  );
}
