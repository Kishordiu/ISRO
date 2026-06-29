import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User, ChevronDown, Fingerprint, Wifi, WifiOff } from "lucide-react";
import { useSession, type Role } from "../session";
import Button from "../components/Button";

const roles: Role[] = ["Network Engineer", "Security Analyst", "Supervisor"];

const footerNotes = [
  { icon: WifiOff, label: "Air-Gapped Environment" },
  { icon: Lock, label: "AES-256 Encryption" },
  { icon: Fingerprint, label: "Role-Based Access Control" },
  { icon: ShieldCheck, label: "Offline Deployment" },
];

export default function Login() {
  const { login } = useSession();
  const nav = useNavigate();
  const [employeeId, setEmployeeId] = useState("ISRO-NOC-1042");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Network Engineer");
  const [roleOpen, setRoleOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ employeeId, role });
      nav("/app/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen grid-bg bg-surface-main flex items-center justify-center p-6 relative overflow-hidden">
      {/* ambient soft accents */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-navy-500/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-navy-800/5 blur-3xl" />

      <div className="relative w-full max-w-[440px] animate-fade-in">
        {/* Logo + title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="grid place-items-center h-14 w-14 rounded-2xl bg-navy-800 shadow-soft-lg mb-4">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-[22px] font-bold text-navy-800 tracking-tight leading-tight">
            AI Decision Intelligence Platform
          </h1>
          <p className="text-sm text-ink-muted mt-1.5 max-w-[340px]">
            Air-Gapped Predictive Intelligence for Secure MPLS Operations
          </p>
        </div>

        {/* Card */}
        <div className="card shadow-soft-lg p-7">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label-xs block mb-1.5">Employee ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-subtle" />
                <input
                  className="input pl-9"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="ISRO-NOC-0000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-xs block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-subtle" />
                <input
                  type="password"
                  className="input pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-xs block mb-1.5">Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen((o) => !o)}
                  className="input flex items-center justify-between text-left"
                >
                  <span className="font-medium text-navy-800">{role}</span>
                  <ChevronDown className={`h-4 w-4 text-ink-subtle transition-transform ${roleOpen ? "rotate-180" : ""}`} />
                </button>
                {roleOpen && (
                  <div className="absolute z-20 mt-1.5 w-full card shadow-soft-lg p-1.5 animate-fade-in">
                    {roles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setRole(r);
                          setRoleOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          r === role ? "bg-navy-500/10 text-navy-800 font-semibold" : "hover:bg-surface-section text-ink-muted"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full py-3 mt-2" disabled={loading}>
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Sign In Securely
                </>
              )}
            </Button>

            <div className="flex items-center justify-between pt-1">
              <a className="text-xs text-navy-500 hover:text-navy-700 hover:underline" href="#">
                Forgot Password?
              </a>
              <span className="text-[11px] text-ink-subtle flex items-center gap-1">
                <WifiOff className="h-3 w-3" /> Offline Mode
              </span>
            </div>
          </form>
        </div>

        {/* Footer notes */}
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {footerNotes.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 rounded-xl bg-white border border-surface-border px-3 py-2.5 shadow-soft"
            >
              <f.icon className="h-3.5 w-3.5 text-navy-500 shrink-0" />
              <span className="text-[11px] font-medium text-ink-muted leading-tight">{f.label}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-ink-subtle mt-6">
          Restricted Access · Authorized Personnel Only · Session Audited
        </p>
      </div>
    </div>
  );
}
