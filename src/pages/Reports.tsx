import { FileText, Download, Search, Filter, ArrowLeft, BarChart3, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Panel from "../components/Panel";
import Button from "../components/Button";
import SeverityBadge from "../components/SeverityBadge";
import { auditLog } from "../data/mock";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #D9E2EC",
  boxShadow: "0 4px 12px rgba(11,46,89,0.08)",
  fontSize: 12,
};

const monthly = [
  { m: "Jan", incidents: 18, resolved: 16 },
  { m: "Feb", incidents: 22, resolved: 21 },
  { m: "Mar", incidents: 15, resolved: 15 },
  { m: "Apr", incidents: 27, resolved: 24 },
  { m: "May", incidents: 19, resolved: 18 },
  { m: "Jun", incidents: 24, resolved: 20 },
];

const riskColor: Record<string, string> = {
  High: "text-accent-red",
  Medium: "text-accent-amber",
  Low: "text-accent-green",
};

export default function Reports() {
  const [q, setQ] = useState("");
  const filtered = auditLog.filter(
    (r) =>
      r.engineer.toLowerCase().includes(q.toLowerCase()) ||
      r.incident.toLowerCase().includes(q.toLowerCase()) ||
      r.action.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/dashboard" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Reports & Audit Logs</h1>
          <p className="text-sm text-ink-muted mt-1">Compliance reporting and engineer action history.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button variant="secondary">
            <FileText className="h-4 w-4" /> Download Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Summary side panel */}
        <div className="xl:col-span-1 space-y-4">
          <div className="card card-hover p-4 animate-fade-in">
            <div className="flex items-center gap-2 text-ink-muted">
              <BarChart3 className="h-4 w-4" />
              <span className="label-xs">Total Incidents</span>
            </div>
            <div className="text-3xl font-bold text-navy-800 mt-1">125</div>
            <div className="text-xs text-ink-muted mt-0.5">Last 6 months</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card card-hover p-3.5 animate-fade-in" style={{ animationDelay: "60ms" }}>
              <CheckCircle2 className="h-4 w-4 text-accent-green" />
              <div className="text-xl font-bold text-navy-800 mt-1.5">114</div>
              <div className="text-[11px] text-ink-muted">Resolved</div>
            </div>
            <div className="card card-hover p-3.5 animate-fade-in" style={{ animationDelay: "120ms" }}>
              <Clock className="h-4 w-4 text-accent-amber" />
              <div className="text-xl font-bold text-navy-800 mt-1.5">8</div>
              <div className="text-[11px] text-ink-muted">Pending Review</div>
            </div>
            <div className="card card-hover p-3.5 animate-fade-in" style={{ animationDelay: "180ms" }}>
              <AlertTriangle className="h-4 w-4 text-accent-red" />
              <div className="text-xl font-bold text-navy-800 mt-1.5">11</div>
              <div className="text-[11px] text-ink-muted">High-Risk Events</div>
            </div>
            <div className="card card-hover p-3.5 animate-fade-in" style={{ animationDelay: "240ms" }}>
              <BarChart3 className="h-4 w-4 text-navy-600" />
              <div className="text-xl font-bold text-navy-800 mt-1.5">22m</div>
              <div className="text-[11px] text-ink-muted">Mean Resolve</div>
            </div>
          </div>

          <Panel title="Monthly Trend" subtitle="Incidents vs resolved" icon={<BarChart3 className="h-5 w-5" />}>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="incidents" radius={[3, 3, 0, 0]} fill="#1E5AA8" animationDuration={900} />
                  <Bar dataKey="resolved" radius={[3, 3, 0, 0]} fill="#16A34A" animationDuration={1100} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-navy-500" /> Incidents</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-accent-green" /> Resolved</span>
            </div>
          </Panel>
        </div>

        {/* Audit table */}
        <div className="xl:col-span-3">
          <Panel
            title="Audit Log"
            subtitle="Every engineer action, recorded"
            icon={<FileText className="h-5 w-5" />}
            action={
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-xl bg-surface-section border border-surface-border px-2.5 py-1.5">
                  <Search className="h-3.5 w-3.5 text-ink-subtle" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search engineer, incident…"
                    className="bg-transparent text-xs outline-none w-44 placeholder:text-ink-subtle"
                  />
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-surface-section border border-surface-border px-2.5 py-1.5">
                  <Filter className="h-3.5 w-3.5 text-ink-subtle" />
                  <select className="bg-transparent text-xs outline-none text-navy-700">
                    <option>All Status</option>
                    <option>Resolved</option>
                    <option>Pending</option>
                    <option>In Review</option>
                  </select>
                </div>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-ink-subtle border-b border-surface-border">
                    <th className="font-semibold py-2.5 pr-3">Date</th>
                    <th className="font-semibold py-2.5 pr-3">Engineer</th>
                    <th className="font-semibold py-2.5 pr-3">Incident</th>
                    <th className="font-semibold py-2.5 pr-3">Action</th>
                    <th className="font-semibold py-2.5 pr-3">Risk</th>
                    <th className="font-semibold py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-surface-border/60 last:border-0 hover:bg-surface-section transition-colors animate-fade-in"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <td className="py-3 pr-3 font-mono text-[12px] text-ink-muted whitespace-nowrap">{r.date}</td>
                      <td className="py-3 pr-3 text-navy-800 font-medium whitespace-nowrap">{r.engineer}</td>
                      <td className="py-3 pr-3 font-mono text-[12px] text-navy-700 whitespace-nowrap">{r.incident}</td>
                      <td className="py-3 pr-3 text-ink-muted">{r.action}</td>
                      <td className={`py-3 pr-3 font-semibold ${riskColor[r.risk]}`}>{r.risk}</td>
                      <td className="py-3">
                        <span className={`chip ${
                          r.status === "Resolved" ? "bg-accent-green/10 text-accent-green" :
                          r.status === "Pending" ? "bg-accent-red/10 text-accent-red" :
                          "bg-accent-amber/10 text-[#B45309]"
                        }`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
