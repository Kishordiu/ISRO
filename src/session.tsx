import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "Network Engineer" | "Security Analyst" | "Supervisor";

interface Session {
  employeeId: string;
  role: Role;
  name: string;
}

interface Ctx {
  session: Session | null;
  login: (s: Omit<Session, "name">) => void;
  logout: () => void;
}

const SessionContext = createContext<Ctx>(null!);

const names: Record<Role, string> = {
  "Network Engineer": "R. Iyer",
  "Security Analyst": "K. Das",
  Supervisor: "A. Menon",
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const login = (s: Omit<Session, "name">) => setSession({ ...s, name: names[s.role] });
  const logout = () => setSession(null);
  return (
    <SessionContext.Provider value={{ session, login, logout }}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
