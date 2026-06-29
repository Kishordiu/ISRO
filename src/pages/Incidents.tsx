import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight, Filter, Search } from "lucide-react";
import Panel from "../components/Panel";
import SeverityBadge from "../components/SeverityBadge";
import { alerts } from "../data/mock";
import { useState } from "react";

const allIncidents = [
  ...alerts.map((a) => ({ ...a, incId: "INC-2026-04" + a.id.slice(-2) })),
  { id: "ALR-4814", incId: "INC-2026-0409", title: "Optical power drift on F-02 uplink", severity: "medium" as const, device: "Internal Firewall F-02", time: "13:02:11", status: "resolved" as const, category: "Network" },
  { id: "ALR-4813", incId: "INC-2026-0408", title: "Telemetry aggregation queue backlog", severity: "low" as const, device: "Telemetry Server S-21", time: "12:44:55", status: "resolved" as const, category: "Telemetry" },
];

export default function Incidents() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = allIncidents.filter((i) => filter === "all" || i.severity === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/dashboard" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Incidents</h1>
          <p className="text-sm text-ink-muted mt-1">Active and historical incidents across the MPLS fabric.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Incidents", value: 5, tone: "text-accent-red" },
          { label: "In Review", value: 3, tone: "text-accent-amber" },
          { label: "Resolved (24h)", value: 14, tone: "text-accent-green" },
          { label: "Mean Time to Resolve", value: "22m", tone: "text-navy-700" },
        ].map((s, i) => (
          <div key={s.label} className="card card-hover p-4 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className={`text-2xl font-bold ${s.tone}`}>{s.value}</div>
            <div className="text-xs text-ink-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <Panel
        title="Incident Queue"
        subtitle="Sorted by severity and recency"
        icon={<AlertTriangle className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl bg-surface-section border border-surface-border px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-ink-subtle" />
              <input placeholder="Search…" className="bg-transparent text-xs outline-none w-28 placeholder:text-ink-subtle" />
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-surface-section border border-surface-border px-2.5 py-1.5">
              <Filter className="h-3.5 w-3.5 text-ink-subtle" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-xs outline-none text-navy-700"
              >
                <option value="all">All</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="space-y-2.5">
          {filtered.map((a, i) => (
            <Link
              key={a.id}
              to={`/app/incidents/${a.incId}`}
              className="flex items-center gap-3 rounded-xl border border-surface-border bg-white px-3.5 py-3 card-hover animate-fade-in group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <SeverityBadge severity={a.severity} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-navy-800 truncate">{a.title}</div>
                <div className="text-[11px] text-ink-muted flex items-center gap-2 mt-0.5">
                  <span className="font-mono">{a.incId}</span>
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
              <ArrowRight className="h-4 w-4 text-ink-subtle group-hover:text-navy-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </Panel>
    </div>
  );
}
