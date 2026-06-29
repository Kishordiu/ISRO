import { Routes, Route } from "react-router-dom";
import { SessionProvider } from "./session";
import CursorTrail from "./components/CursorTrail";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NetworkHealth from "./pages/NetworkHealth";
import AIIntelligence from "./pages/AIIntelligence";
import Incidents from "./pages/Incidents";
import IncidentAnalysis from "./pages/IncidentAnalysis";
import Review from "./pages/Review";
import Reports from "./pages/Reports";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <SessionProvider>
      <CursorTrail />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="network" element={<NetworkHealth />} />
          <Route path="ai" element={<AIIntelligence />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="incidents/:id" element={<IncidentAnalysis />} />
          <Route path="review" element={<Review />} />
          <Route path="reports" element={<Reports />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </SessionProvider>
  );
}
