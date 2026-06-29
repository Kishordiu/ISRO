import { Bell, LogOut, Search, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../session";
import { useState } from "react";

export default function Navbar() {
  const { session, logout } = useSession();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-surface-panel border-b border-surface-border flex items-center gap-4 px-5 sticky top-0 z-30">
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-ink-muted">Operations</span>
        <span className="text-ink-subtle">/</span>
        <span className="font-semibold text-navy-800">Mission Control</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 rounded-xl bg-surface-section border border-surface-border px-3 py-2 w-64">
          <Search className="h-4 w-4 text-ink-subtle" />
          <input
            placeholder="Search devices, incidents…"
            className="bg-transparent text-sm outline-none w-full placeholder:text-ink-subtle"
          />
          <kbd className="text-[10px] text-ink-subtle border border-surface-border rounded px-1.5 py-0.5">⌘K</kbd>
        </div>

        <div className="chip bg-accent-green/10 text-accent-green border border-accent-green/20">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-soft" />
          All Systems Nominal
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative grid place-items-center h-10 w-10 rounded-xl border border-surface-border bg-white hover:bg-surface-section transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px] text-navy-700" />
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent-orange text-white text-[10px] font-bold animate-pulse-soft">
              3
            </span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 card shadow-soft-lg p-2 animate-fade-in z-40">
              <div className="px-3 py-2 text-xs font-semibold text-ink-muted">Latest Notifications</div>
              {[
                { t: "Critical alert on A-12", s: "2m ago", c: "text-accent-red" },
                { t: "AI prediction: CPU saturation on S-22", s: "11m ago", c: "text-accent-orange" },
                { t: "Audit log export completed", s: "38m ago", c: "text-ink-muted" },
              ].map((n, i) => (
                <div key={i} className="px-3 py-2.5 rounded-lg hover:bg-surface-section transition-colors">
                  <div className={`text-sm font-medium ${n.c}`}>{n.t}</div>
                  <div className="text-[11px] text-ink-subtle">{n.s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 pl-2 border-l border-surface-border">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-navy-800 text-white text-sm font-bold shadow-soft">
            {session?.name?.split(" ").map((p) => p[0]).join("").slice(0, 2) ?? "RI"}
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-semibold text-navy-800">{session?.name ?? "R. Iyer"}</div>
            <div className="text-[11px] text-ink-muted flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              {session?.role ?? "Network Engineer"}
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              nav("/");
            }}
            className="grid place-items-center h-9 w-9 rounded-xl border border-surface-border bg-white hover:bg-accent-red/5 hover:border-accent-red/30 hover:text-accent-red transition-all"
            aria-label="Logout"
          >
            <LogOut className="h-[17px] w-[17px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
