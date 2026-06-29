import { Link } from "react-router-dom";
import { ScrollText, ArrowLeft, Download, Search, Filter } from "lucide-react";
import Panel from "../components/Panel";
import Button from "../components/Button";
import { auditEvents } from "../data/mock";
import { useState } from "react";

const statusChip: Record<string, string> = {
  success: "bg-accent-green/10 text-accent-green",
  warning: "bg-accent-amber/10 text-[#B45309]",
  critical: "bg-accent-red/10 text-accent-red",
  info: "bg-navy-500/10 text-navy-600",
};

export default function AuditLogs() {
  const [q, setQ] = useState("");
  const filtered = auditEvents.filter(
    (e) =>
      e.device.toLowerCase().includes(q.toLowerCase()) ||
      e.event.toLowerCase().includes(q.toLowerCase()) ||
      e.engineer.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 animate-fade-in">
        <Link to="/app/dashboard" className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">Audit Logs</h1>
          <p className="text-sm text-ink-muted mt-1">Immutable record of system and engineer activity.</p>
        </div>
        <Button variant="secondary">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <Panel
        title="Event Stream"
        subtitle="Chronological activity log"
        icon={<ScrollText className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl bg-surface-section border border-surface-border px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-ink-subtle" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search events…"
                className="bg-transparent text-xs outline-none w-40 placeholder:text-ink-subtle"
              />
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-surface-section border border-surface-border px-2.5 py-1.5">
              <Filter className="h-3.5 w-3.5 text-ink-subtle" />
              <select className="bg-transparent text-xs outline-none text-navy-700">
                <option>All Events</option>
                <option>Critical</option>
                <option>Warning</option>
                <option>Info</option>
                <option>Success</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="relative pl-6">
          {/* timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-surface-border" />
          <div className="space-y-4">
            {filtered.map((e, i) => (
              <div key={e.id} className="relative animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                <span
                  className={`absolute -left-[18px] top-1.5 h-3 w-3 rounded-full border-2 border-white ${
                    e.status === "critical" ? "bg-accent-red" :
                    e.status === "warning" ? "bg-accent-amber" :
                    e.status === "success" ? "bg-accent-green" : "bg-navy-500"
                  } ${e.status === "critical" ? "animate-pulse-soft" : ""}`}
                />
                <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-surface-border bg-white px-3.5 py-3 card-hover">
                  <span className="font-mono text-[12px] text-ink-muted shrink-0">{e.time}</span>
                  <span className={`chip ${statusChip[e.status]}`}>{e.status}</span>
                  <span className="text-sm text-navy-800 flex-1 min-w-[200px]">{e.event}</span>
                  <span className="text-xs text-ink-muted shrink-0">{e.device}</span>
                  <span className="text-xs font-medium text-navy-700 shrink-0">{e.engineer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
