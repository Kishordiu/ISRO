import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  BrainCircuit,
  AlertTriangle,
  FileText,
  ScrollText,
  Settings,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/network", label: "Network Health", icon: Network },
  { to: "/app/ai", label: "AI Intelligence", icon: BrainCircuit },
  { to: "/app/incidents", label: "Incidents", icon: AlertTriangle },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/audit", label: "Audit Logs", icon: ScrollText },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation();
  return (
    <aside
      className={`relative flex flex-col bg-surface-section border-r border-surface-border transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[244px]"
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-surface-border">
        <div className="grid place-items-center h-9 w-9 rounded-xl bg-navy-800 shadow-soft shrink-0">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="leading-tight animate-fade-in">
            <div className="text-sm font-bold text-navy-800">Decision Intelligence</div>
            <div className="text-[11px] text-ink-muted">MPLS Operations</div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = loc.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`nav-item ${active ? "nav-item-active" : ""} ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {active && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-navy-500 animate-pulse-soft" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-surface-border">
        {!collapsed ? (
          <div className="panel-section px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-soft" />
              <span className="text-xs font-semibold text-navy-800">System Nominal</span>
            </div>
            <div className="text-[11px] text-ink-muted mt-1">Air-Gapped · Offline Inference</div>
          </div>
        ) : (
          <div className="grid place-items-center">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green animate-pulse-soft" />
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-ink-muted hover:text-navy-800 transition-colors"
        >
          <ChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}
