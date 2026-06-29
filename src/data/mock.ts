export type Severity = "critical" | "high" | "medium" | "low";
export type DeviceType = "router" | "switch" | "firewall" | "server";
export type HealthState = "healthy" | "warning" | "critical";

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  health: HealthState;
  bandwidth: number; // Mbps used
  bandwidthCap: number;
  latency: number; // ms
  packetLoss: number; // %
  uptime: number; // %
  location: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  device: string;
  time: string;
  status: "open" | "acknowledged" | "resolved";
  category: string;
}

export interface AuditEvent {
  id: string;
  time: string;
  device: string;
  event: string;
  status: "info" | "warning" | "critical" | "success";
  engineer: string;
}

export interface Incident {
  id: string;
  device: string;
  deviceType: DeviceType;
  severity: Severity;
  timestamp: string;
  title: string;
  symptoms: string[];
  rootCause: string;
  predictedImpact: string;
  confidence: number;
  affectedDevices: string[];
  estimatedRecovery: string;
  missionImpact: string;
  historical: { id: string; date: string; resolution: string; similarity: number }[];
  actions: { id: string; title: string; detail: string; risk: Severity }[];
}

export interface Recommendation {
  id: string;
  rank: number;
  title: string;
  detail: string;
  impact: Severity;
  eta: string;
}

export const devices: Device[] = [
  { id: "RTR-01", name: "Core Router A-01", type: "router", ip: "10.20.0.1", health: "healthy", bandwidth: 642, bandwidthCap: 1000, latency: 4.2, packetLoss: 0.02, uptime: 99.998, location: "Bangalore NOC-1" },
  { id: "RTR-02", name: "Edge Router B-04", type: "router", ip: "10.20.0.2", health: "warning", bandwidth: 880, bandwidthCap: 1000, latency: 18.6, packetLoss: 0.41, uptime: 99.87, location: "Sriharikota" },
  { id: "SW-11", name: "Distribution Switch D-11", type: "switch", ip: "10.20.1.11", health: "healthy", bandwidth: 312, bandwidthCap: 1000, latency: 2.1, packetLoss: 0.0, uptime: 99.999, location: "Bangalore NOC-1" },
  { id: "SW-12", name: "Access Switch A-12", type: "switch", ip: "10.20.1.12", health: "critical", bandwidth: 968, bandwidthCap: 1000, latency: 64.3, packetLoss: 2.8, uptime: 98.42, location: "Mumbai DC-2" },
  { id: "FW-01", name: "Perimeter Firewall F-01", type: "firewall", ip: "10.20.2.1", health: "healthy", bandwidth: 410, bandwidthCap: 1000, latency: 6.4, packetLoss: 0.01, uptime: 99.995, location: "Delhi SOC" },
  { id: "FW-02", name: "Internal Firewall F-02", type: "firewall", ip: "10.20.2.2", health: "warning", bandwidth: 720, bandwidthCap: 1000, latency: 11.2, packetLoss: 0.18, uptime: 99.91, location: "Sriharikota" },
  { id: "SRV-21", name: "Telemetry Server S-21", type: "server", ip: "10.20.3.21", health: "healthy", bandwidth: 188, bandwidthCap: 1000, latency: 1.8, packetLoss: 0.0, uptime: 99.999, location: "Bangalore NOC-1" },
  { id: "SRV-22", name: "AI Inference Node S-22", type: "server", ip: "10.20.3.22", health: "warning", bandwidth: 540, bandwidthCap: 1000, latency: 8.9, packetLoss: 0.05, uptime: 99.94, location: "Bangalore NOC-1" },
];

export const alerts: Alert[] = [
  { id: "ALR-4821", title: "Packet loss threshold exceeded on A-12", severity: "critical", device: "Access Switch A-12", time: "14:32:08", status: "open", category: "Network" },
  { id: "ALR-4820", title: "Latency degradation on B-04 uplink", severity: "high", device: "Edge Router B-04", time: "14:28:51", status: "open", category: "Network" },
  { id: "ALR-4819", title: "AI predicted CPU saturation on S-22 within 35m", severity: "high", device: "AI Inference Node S-22", time: "14:21:33", status: "acknowledged", category: "AI Prediction" },
  { id: "ALR-4818", title: "F-02 session table nearing capacity", severity: "medium", device: "Internal Firewall F-02", time: "14:14:02", status: "open", category: "Security" },
  { id: "ALR-4817", title: "BGP flapping detected on B-04 (3 events)", severity: "medium", device: "Edge Router B-04", time: "14:02:47", status: "acknowledged", category: "Routing" },
  { id: "ALR-4816", title: "Telemetry stream gap from D-11 (recovered)", severity: "low", device: "Distribution Switch D-11", time: "13:58:19", status: "resolved", category: "Telemetry" },
  { id: "ALR-4815", title: "Certificate rotation reminder for F-01", severity: "low", device: "Perimeter Firewall F-01", time: "13:41:00", status: "open", category: "Maintenance" },
];

export const auditEvents: AuditEvent[] = [
  { id: "EVT-9912", time: "14:33:12", device: "Access Switch A-12", event: "Engineer acknowledged critical alert ALR-4821", status: "warning", engineer: "R. Iyer" },
  { id: "EVT-9911", time: "14:29:55", device: "Edge Router B-04", event: "AI engine published root cause hypothesis RC-224", status: "info", engineer: "AI Engine" },
  { id: "EVT-9910", time: "14:24:40", device: "AI Inference Node S-22", event: "Predictive model retrained on 14d telemetry window", status: "success", engineer: "System" },
  { id: "EVT-9909", time: "14:18:22", device: "Internal Firewall F-02", event: "Session table threshold crossed 78%", status: "warning", engineer: "System" },
  { id: "EVT-9908", time: "14:11:07", device: "Core Router A-01", event: "Configuration baseline verified — no drift", status: "success", engineer: "A. Menon" },
  { id: "EVT-9907", time: "14:02:47", device: "Edge Router B-04", event: "BGP neighbor flap detected, auto-suppressed", status: "critical", engineer: "System" },
  { id: "EVT-9906", time: "13:55:31", device: "Telemetry Server S-21", event: "Audit log export generated (CSV, 4.2MB)", status: "info", engineer: "S. Nair" },
];

export const incident: Incident = {
  id: "INC-2026-0418",
  device: "Access Switch A-12",
  deviceType: "switch",
  severity: "critical",
  timestamp: "2026-06-29 14:32:08 IST",
  title: "Sustained packet loss and latency spike on access uplink",
  symptoms: [
    "Packet loss sustained at 2.8% over 6 minutes (threshold 0.5%)",
    "Round-trip latency rose from 3.1ms to 64.3ms on uplink Gi0/1",
    "Interface output drops incrementing at ~14/s",
    "Connected telemetry streams showing 3s jitter",
  ],
  rootCause:
    "AI correlation of interface counters, optical input power, and BGP keepalive intervals indicates a degraded SFP transceiver on uplink Gi0/1, compounded by a micro-burst traffic pattern from telemetry aggregation. Optical input power dropped to -14.2 dBm (nominal -7.0 dBm).",
  predictedImpact:
    "Without intervention, packet loss is projected to reach 6.4% within 22 minutes, impacting 38 downstream telemetry endpoints and the AI inference pipeline feeding from S-22.",
  confidence: 92,
  affectedDevices: ["Access Switch A-12", "AI Inference Node S-22", "Telemetry Server S-21"],
  estimatedRecovery: "18 minutes",
  missionImpact: "Moderate — telemetry latency for launch-pad feed degrades beyond SLA",
  historical: [
    { id: "INC-2026-0312", date: "2026-05-14", resolution: "SFP replaced, uplink restored in 14m", similarity: 88 },
    { id: "INC-2025-2210", date: "2026-02-02", resolution: "Micro-burst mitigated via QoS shaping", similarity: 71 },
    { id: "INC-2025-1980", date: "2025-11-19", resolution: "Fiber patch re-seated, optical power restored", similarity: 64 },
  ],
  actions: [
    { id: "ACT-1", title: "Failover uplink Gi0/1 to redundant Gi0/2", detail: "Switch traffic to the standby uplink; verify convergence under 800ms.", risk: "low" },
    { id: "ACT-2", title: "Apply QoS micro-burst shaping on telemetry VLAN", detail: "Cap burst to 90% of uplink CIR for VLAN 140 to absorb micro-bursts.", risk: "medium" },
    { id: "ACT-3", title: "Schedule SFP transceiver replacement (Gi0/1)", detail: "Open maintenance window for hot-swap of degraded SFP module.", risk: "low" },
  ],
};

export const recommendations: Recommendation[] = [
  { id: "REC-1", rank: 1, title: "Failover A-12 uplink to redundant path", detail: "Restores SLA in under 1 minute; lowest risk, highest confidence.", impact: "critical", eta: "< 1 min" },
  { id: "REC-2", rank: 2, title: "Apply micro-burst QoS shaping on VLAN 140", detail: "Reduces jitter on telemetry feed; reversible config change.", impact: "high", eta: "3 min" },
  { id: "REC-3", rank: 3, title: "Increase BGP keepalive tolerance on B-04", detail: "Suppress neighbor flap noise during recovery window.", impact: "medium", eta: "5 min" },
  { id: "REC-4", rank: 4, title: "Schedule SFP replacement for A-12 Gi0/1", detail: "Permanent fix; coordinate with field team in Sriharikota.", impact: "low", eta: "45 min" },
];

export const auditLog = [
  { date: "2026-06-29 14:33", engineer: "R. Iyer", incident: "INC-2026-0418", action: "Acknowledged alert, opened review", risk: "High", status: "In Review" },
  { date: "2026-06-29 13:55", engineer: "S. Nair", incident: "INC-2026-0417", action: "Approved AI recommendation, executed failover", risk: "Medium", status: "Resolved" },
  { date: "2026-06-29 12:18", engineer: "A. Menon", incident: "INC-2026-0416", action: "Modified QoS policy, applied to D-11", risk: "Low", status: "Resolved" },
  { date: "2026-06-29 11:02", engineer: "R. Iyer", incident: "INC-2026-0415", action: "Rejected recommendation, requested more analysis", risk: "High", status: "Pending" },
  { date: "2026-06-29 09:47", engineer: "K. Das", incident: "INC-2026-0414", action: "Approved baseline verification, no change", risk: "Low", status: "Resolved" },
  { date: "2026-06-28 22:14", engineer: "S. Nair", incident: "INC-2026-0413", action: "Executed firewall session table flush", risk: "Medium", status: "Resolved" },
  { date: "2026-06-28 19:31", engineer: "A. Menon", incident: "INC-2026-0412", action: "Approved SFP replacement, scheduled maintenance", risk: "Medium", status: "Resolved" },
  { date: "2026-06-28 16:08", engineer: "K. Das", incident: "INC-2026-0411", action: "Modified routing policy, applied to B-04", risk: "High", status: "Resolved" },
];

export const bandwidthSeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  uplink: Math.round(420 + Math.sin(i / 2.4) * 180 + (i > 18 ? 220 : 0) + Math.random() * 40),
  downlink: Math.round(310 + Math.cos(i / 3) * 120 + Math.random() * 30),
}));

export const latencySeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  latency: Math.round((i > 14 ? 40 + (i - 14) * 4 : 4 + Math.random() * 3) * 10) / 10,
  threshold: 15,
}));

export const healthTrend = Array.from({ length: 12 }, (_, i) => ({
  d: `D-${i + 1}`,
  health: Math.round(96 + Math.random() * 3.5),
  risk: Math.round(2 + Math.random() * 6),
}));

export const severityBreakdown = [
  { name: "Healthy", value: 142, color: "#16A34A" },
  { name: "Warning", value: 23, color: "#F59E0B" },
  { name: "Critical", value: 7, color: "#DC2626" },
];

export const sparkline = (base: number, vol: number, n = 20) =>
  Array.from({ length: n }, (_, i) => ({ i, v: Math.round(base + Math.sin(i / 2) * vol + Math.random() * vol) }));
